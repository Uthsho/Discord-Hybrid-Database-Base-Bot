const { SlashCommandBuilder, SlashCommandBooleanOption } = require('discord.js');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');


class BooleanCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'boolean');
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandBooleanOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		cmd.addBooleanOption(option);
	}


}


module.exports = BooleanCommandOption;
