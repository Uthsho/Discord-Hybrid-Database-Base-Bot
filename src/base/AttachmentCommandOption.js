// eslint-disable-next-line no-unused-vars
const { SlashCommandBuilder, SlashCommandAttachmentOption } = require('discord.js');
const Command = require('./Command');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');


class AttachmentCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'attachment');
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandAttachmentOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		cmd.addAttachmentOption(option);
	}


}


module.exports = AttachmentCommandOption;
