const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('discord.js');
const Command = require('./Command');
const CommandOption = require('./CommandOption');
const SubCommandOption = require('./SubCommandOption');

class SubCommandGroupOption extends CommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'subCommand');

		/**
		 * The options of this subcommand.
		 * @type {SubCommandOption[]}
		 */
		this.options = [];
	}
	/**
     *
     * @param {SubCommandOption|SubCommandGroupOptionCallback} callback The sub command option callback
	 * @returns {this}
     */
	addSubCommand(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new SubCommandOption(this.main)) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandSubcommandGroupBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);


		for (const subCommandOption of this.options) {
			subCommandOption.generateSlashCommandOption(option);
		}

		cmd.addSubcommandGroup(option);
	}


}

/**
 * @callback SubCommandGroupOptionCallback
 * @param {SubCommandOption} subCommandOption
 */

module.exports = SubCommandGroupOption;
