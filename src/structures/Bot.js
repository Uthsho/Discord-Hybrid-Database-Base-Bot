const { Client, Collection } = require('discord.js');
const intents = require('../../data/intents');
const Logger = require('./Logger');
const Util = require('./Util');
const Embeds = require('../base/Embeds');
// eslint-disable-next-line no-unused-vars
const Command = require('../base/Command');
const CommandManager = require('./CommandManager');

class Bot extends Client {

	constructor() {
		super({
			intents: intents,
			allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
		});

		this.config = require('../../data/config.json');

		this.colors = require('../../data/colors.json');

		this.emotes = require('../../data/emotes.json');

		this.logger = new Logger(this);

		this.utils = new Util(this);

		this.embeds = new Embeds(this);

		this.commands = new CommandManager(this);

		if (this.config.debug) {
			this.on('debug', (message) => this.logger.log('DJS Debug', message));
		}
	}

	async boot() {
		await this.login(this.config.token);
	}

}

module.exports = Bot;
