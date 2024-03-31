const { CommandInteraction, Message } = require('discord.js');
const Bot = require('../structures/Bot');

class CommandResponse {

	/**
     *
     * @param {Bot} client Client that instantiated the CommandManager
     * @param {CommandInteraction} interaction Interaction that triggered the command
     * @param {Message} message Message that triggered the command
     */
	constructor(client, interaction, message) {
		this.client = client;
		this.interaction = interaction;
		this.message = message;

		this.type = interaction ? 'interaction' : 'message';
	}

	get name() {
		return this.interaction?.commandName || this.message?.commandName;
	}

	get id() {
		return this.interaction?.id || this.message?.id;
	}

	get user() {
		return this.interaction?.user || this.message?.author;
	}

	get member() {
		return this.interaction?.member || this.message?.member;
	}

	get channel() {
		return this.interaction?.channel || this.message?.channel;
	}

	get guild() {
		return this.interaction?.guild || this.message?.guild;
	}

	

    get reply() {
		return this.interaction?.reply || this.message?.reply;
	}


}

module.exports = CommandResponse;
