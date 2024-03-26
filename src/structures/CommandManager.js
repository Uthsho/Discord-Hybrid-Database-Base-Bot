const { Collection } = require('discord.js');
const Command = require('../base/Command');
const path = require('path');
const Bot = require('./Bot');

class CommandManager {

	/**
     * Creates a new CommandManager
     * @param {Bot} client Discord client
     */
	constructor(client) {
		/**
         * The client that instantiated this CommandManager
         * @type {Bot}
         */
		this.client = client;

		/**
         * The cache of commands
         * @type {Collection<string, Command>}
         */
		this.cache = new Collection();
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}/Commands/**/*.js`;
	}

	/**
     * Registers a command
     * @param {Command} command The command to register
     * @returns {this}
     */
	register(command) {
		if (!(command instanceof Command)) throw new TypeError('Command is not an instance of Command');
		if (this.cache.has(command.name)) throw new Error('Command already exists');
		this.cache.set(command.name, command);
		return this;
	}

	/**
     * Unregisters a command
     * @param {number} name The ID of the command to unregister
     * @returns {this}
     */
	unregister(name) {
		if (!this.cache.has(name)) throw new Error('Command does not exist');
		this.cache.delete(name);
		return this;
	}

	/**
     * Fetches a command by name
     * @param {string} name The name of the command to fetch
     * @returns {Command}
     */
	fetch(name) {
		return this.cache.get(name);
	}

	/**
     * Loads all commands
     * @returns {this}
     */
	async load() {
		const commandFiles = await this.client.utils.loadFiles(this.directory);
		for (const file of commandFiles) {
			await this.generateCommand(file);
		}
		return this;
	}

	/**
     * Generates a command
     * @param {string} commandPath The path of the command to generate
     */
	async generateCommand(commandPath) {
		delete require.cache[commandPath];
		const { name } = path.parse(commandPath);

		const File = require(commandPath);

		if (!this.client.utils.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);


		const command = new File(this.client, commandPath);

		if (this.cache.has(command.name)) throw new Error(`Command ${command.name} already exists.`);

		if (!(command instanceof Command)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);

		this.register(command);
	}

	async check() {
		const fetched = await this.client.application.commands.fetch()
			.then(cache => [...cache.values()]);

		const cache = this.cache.filter(cmd => ['hybrid', 'slash'].includes(cmd.type));

		const commands = cache.map(cmd => cmd.generateSlashCommand().toJSON());

		let updateRequired = false;

		for (const command of fetched) {
			const exists = commands.find(cmd => cmd.name === command.name);

			if (!exists) {
				updateRequired = true;
				break;
			}

			const equal = command.equals(exists, true);

			if (!equal) {
				updateRequired = true;
				break;
			}
		}

		const uploadRequired = commands.some(cmd => !fetched.find(data => data.name === cmd.name));

		if (!uploadRequired && !updateRequired) {
			this.client.logger.log('Slash Commands', 'Detected no changes to slash commands.');
			return;
		}

		this.client.logger.log('Slash Commands', 'Detected Changes to slash commands. Preparing to upload.');

		this.client.logger.log('Slash Commands', `Uploading slash commands to Discord API.`);

		try {
			await this.client.application.commands.set(commands);
		} catch (err) {
			this.client.logger.error('Slash Commands', 'Failed to upload slash commands.');
			console.error(err);
			return;
		}

		this.client.logger.log('Slash Commands', 'Successfully uploaded slash commands to Discord API.');
	}

}

module.exports = CommandManager;
