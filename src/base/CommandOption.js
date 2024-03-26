// eslint-disable-next-line no-unused-vars
const Discordjs = require('discord.js');
const Command = require('./Command');

class CommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 * @param {CommandOptionType} type The type of this command option
	 */
	constructor(main, type) {
		/**
		 * The name of this command option.
		 * @type {string}
		 */
		this.name = null;
		/**
		 * The description of this command option.
		 * @type {string}
		 */
		this.description = null;

		/**
		 * The type of this command option.
		 * @type {CommandOptionType}
		 */
		this.type = type;

		this.main = main;
	}

	get client() {
		return this.main.client;
	}

	/**
	 *
	 * @param {string} description Description of this command option.
	 * @returns {this}
	 */
	setDescription(description) {
		this.description = description;
		return this;
	}

	/**
	 *
	 * @param {string} name Name of this command option.
	 * @returns {this}
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	/**
	 * This command generates slash command option data
	 * @param {Discordjs.SlashCommandBuilder} cmd The command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		this.client.logger.crash('CommandOption', `Slash command option generator for ${this.type} is not implemented.`);
	}


	validate() {
		let invalid = false;

		if (!this.name || !this.name.length) {
			invalid = true;
			this.client.logger.error('CommandOption', `Name for command ${this.main.name} is not provided.`);
		}

		if (!this.description || !this.description.length) {
			invalid = true;
			this.client.logger.error('CommandOption', `Description for ${this.name} in command ${this.main.name} is not provided.`);
		}

		const types = ['channel', 'integer', 'mentionable', 'number', 'role', 'string', 'subCommand', 'subCommandGroup', 'user', 'attachment'];

		if (this.type === 'unknown' || !types.includes(this.type)) {
			invalid = true;
			this.client.logger.error('CommandOption', `Type for ${this.name} in command ${this.main.name} is invalid.`);
		}

		if (this.type === 'attachment' && this.main.type !== 'slash') {
			invalid = true;
			this.client.logger.error('CommandOption', `Attachment type is only supported for slash commands.`);
		}

		if (this.type === 'boolean' && this.main.type !== 'slash') {
			invalid = true;
			this.client.logger.error('CommandOption', `Boolean type is only supported for slash commands.`);
		}

		return invalid;
	}
	/**
	 * @param {...Object<string, boolean|string>} [props] Specific properties to include/exclude.
	 * @returns {unknown}
	 */
	toJSON(...props) {
		return Discordjs.flatten(this, ...props);
	}

}

/**
 * @typedef {('unknown'|'channel'|'integer'|'mentionable'|'number'|'role'|'string'|'subCommand'|'subCommandGroup'|'user'|'attachment'|'boolean')} CommandOptionType
 */


module.exports = CommandOption;
