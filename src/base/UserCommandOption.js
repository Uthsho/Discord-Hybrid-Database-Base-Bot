const { SlashCommandUserOption, SlashCommandBuilder } = require('discord.js');
const Command = require('./Command');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');

class UserCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'user');


		/**
         * @type {boolean}
         */
		this.required = null;
	}

	/**
             * @param {boolean} required Whether this option is required
             * @returns {this}
             */
	setRequired(required) {
		this.required = required;
		return this;
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandUserOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		cmd.addUserOption(option);
	}


}

module.exports = UserCommandOption;
