const { SlashCommandSubcommandBuilder, SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('discord.js');
const Command = require('./Command');
const CommandOption = require('./CommandOption');
const UserCommandOption = require('./UserCommandOption');
const StringCommandOption = require('./StringCommandOption');
const RoleCommandOption = require('./RoleCommandOption');
const NumberCommandOption = require('./NumberCommandOption');
const MentionableCommandOption = require('./MentionableCommandOption');
const IntegerCommandOption = require('./IntegerCommandOption');
const ChannelCommandOption = require('./ChannelCommandOption');
const BooleanCommandOption = require('./BooleanCommandOption');
const AttachmentCommandOption = require('./AttachmentCommandOption');

class SubCommandOption extends CommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'subCommand');

		/**
		 * The options of this subcommand.
		 * @type {CommandOption[]}
		 */

		/**
		 * @type {CommandOptions[]}
		 */
		this.options = [];
	}

	/**
	 * @param {AttachmentCommandOption|AttachmentOptionCallback} callback The attachment option callback
	 * @returns {this}
	**/
	addAttachmentOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new AttachmentCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {BooleanCommandOption|BooleanOptionCallback} callback The boolean option callback
	 * @returns {this}
	 */
	addBooleanOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new BooleanCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {ChannelCommandOption|ChannelOptionCallback} callback The channel option callback
	 * @returns {this}
	 */
	addChannelOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new ChannelCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {IntegerCommandOption|IntegerOptionCallback} callback The integer option callback
	 * @returns {this}
	 */
	addIntegerOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new IntegerCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {MentionableCommandOption|MentionableOptionCallback} callback The mentionable option callback
	 * @returns {this}
	 */
	addMentionableOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new MentionableCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {NumberCommandOption|NumberOptionCallback} callback The number option callback
	 * @returns {this}
	 */
	addNumberOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new NumberCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {RoleCommandOption|RoleOptionCallback} callback The role option callback
	 * @returns {this}
	 */
	addRoleOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new RoleCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {StringCommandOption|StringOptionCallback} callback The string option callback
	 * @returns {this}
	 */
	addStringOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new StringCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {UserCommandOption|UserOptionCallback} callback The user option callback
	 * @returns {this}
	 */
	addUserOption(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new UserCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder|SlashCommandSubcommandGroupBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandSubcommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		for (const command of this.options) {
			command.generateSlashCommandOption(option);
		}

		cmd.addSubcommand(option);
	}

}

module.exports = SubCommandOption;

/**
 * @typedef {CommandOption|AttachmentCommandOption|BooleanCommandOption|ChannelCommandOption|IntegerCommandOption|MentionableCommandOption|NumberCommandOption|RoleCommandOption|StringCommandOption|UserCommandOption} CommandOptions
 */

/**
 * @callback AttachmentOptionCallback
 * @param {AttachmentCommandOption} attachmentOption
 */

/**
 * @callback BooleanOptionCallback
 * @param {BooleanCommandOption} booleanOption
 */

/**
 * @callback ChannelOptionCallback
 * @param {ChannelCommandOption} channelOption
 */

/**
 * @callback IntegerOptionCallback
 * @param {IntegerCommandOption} integerOption
 */

/**
 * @callback MentionableOptionCallback
 * @param {MentionableCommandOption} mentionableOption
 */

/**
 * @callback NumberOptionCallback
 * @param {NumberCommandOption} numberOption
 */

/**
 * @callback RoleOptionCallback
 * @param {RoleCommandOption} roleOption
 */

/**
 * @callback StringOptionCallback
 * @param {StringCommandOption} stringOption
 */

/**
 * @callback UserOptionCallback
 * @param {UserCommandOption} userOption
 */

