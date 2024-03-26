const { SlashCommandMentionableOption, SlashCommandBuilder } = require('discord.js');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');


class MentionableCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'mentionable');
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandMentionableOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		cmd.addMentionableOption(option);
	}


}


module.exports = MentionableCommandOption;
