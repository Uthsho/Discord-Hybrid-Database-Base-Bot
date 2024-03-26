const { SlashCommandBuilder, SlashCommandRoleOption } = require('discord.js');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');


class RoleCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'role');
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandRoleOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		cmd.addRoleOption(option);
	}


}


module.exports = RoleCommandOption;
