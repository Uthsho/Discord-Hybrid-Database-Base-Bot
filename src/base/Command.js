// eslint-disable-next-line no-unused-vars
const Bot = require('../structures/Bot');
const AttachmentCommandOption = require('./AttachmentCommandOption');
const BooleanCommandOption = require('./BooleanCommandOption');
const ChannelCommandOption = require('./ChannelCommandOption');
// eslint-disable-next-line no-unused-vars
const CommandOption = require('./CommandOption');
const IntegerCommandOption = require('./IntegerCommandOption');
const MentionableCommandOption = require('./MentionableCommandOption');
const NumberCommandOption = require('./NumberCommandOption');
const RoleCommandOption = require('./RoleCommandOption');
const StringCommandOption = require('./StringCommandOption');
const UserCommandOption = require('./UserCommandOption');
const SubCommandGroupOption = require('./SubCommandGroupOption');
// eslint-disable-next-line no-unused-vars
const SubCommandOption = require('./SubCommandOption');
const { SlashCommandBuilder } = require('discord.js');

// type jsdoc for Option

/**
 * @typedef {Object} Option
 * @property {string} name The name of the command
 * @property {string} [description] The description of the command
 * @property {string} [category] The category of the command
 * @property {'hybrid'|'slash'|'prefix'} [type] The type of the command
 * @property {?string[]} [aliases] The aliases of the command for prefix command
 * @property {?Array<string>[]} [examples] The examples of the command
 * @property {?boolean} [developer] Whether the command is developer only or not
 * @property {?boolean} [admin] Whether the command is admin only or not
 * @property {?import('discord.js').PermissionResolvable} [userPermissions] The permissions the user needs to run the command
 * @property {?import('discord.js').PermissionResolvable} [clientPermissions] The permissions the client needs to run the command
 * @property {?boolean} [guild] Whether the command can only be used in guilds or not
 * @property {?number} [cooldown] The cooldown of the command
 * @property {?boolean} [global] Whether the command has a global cooldown or not
 * @property {?boolean} [dm] Whether the command can be used in DMs or not
*/


class Command {

	/**
     *
     * @param {Bot} client Client that instantiated this command
	 * @param {string} path The path of this command
     * @param {Option} options The options for this command
     */
	constructor(client, path, options) {
		this.client = client;

		this.path = path;

		this.name = options.name;

		this.description = options.description;

		this.category = options.category;

		this.type = options.type;

		this.aliases = options.aliases || [];

		this.examples = options.examples || [];

		this.developer = options.developer || false;

		this.admin = options.admin || false;

		this.userPermissions = options.userPermissions || [];

		this.clientPermissions = options.clientPermissions || [];

		this.guild = options.guild !== false;

		this.cooldown = options.cooldown || 3;

		this.global = !!options.global;

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
	 * @param {SubCommandOption|SubCommandOptionCallback} callback The sub command option callback
	 * @returns {this}
	 */
	addSubCommand(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new SubCommandOption()) : callback;

		this.options.push(result);

		return this;
	}

	/**
	 * @param {SubCommandGroupOption|SubCommandGroupOptionCallback} callback The sub command group option callback
	 * @returns {this}
	 */
	addSubCommandGroup(callback) {
		// eslint-disable-next-line callback-return
		const result = typeof callback === 'function' ? callback(new SubCommandGroupOption()) : callback;

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

	generateSlashCommand() {
		const cmd = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description);

		if (this.userPermissions.length) {
			// always use the first value as there cannot be more than one.
			cmd.setDefaultMemberPermissions(this.userPermissions[0]);
		}

		if (this.guild) {
			cmd.setDMPermission(false);
		}

		for (const option of this.options) {
			option.generateSlashCommandOption(cmd);
		}

		return cmd;
	}


	validate() {
		let invalid = false;

		if (!this.name || !this.name.length) {
			this.client.logger.error(`Command Builder`, `Name for command in ${this.path} is not provided`);

			invalid = true;
		}

		if (!this.description || !this.description.length) {
			this.client.logger.error(`Command Builder`, `Description for command ${this.name} in ${this.path} is not provided`);

			invalid = true;
		}

		if (!this.category || !this.category.length) {
			this.client.logger.error(`Command Builder`, `Category for command ${this.name} in ${this.path} is not provided`);

			invalid = true;
		}

		if (!['hybrid', 'slash', 'prefix'].includes(this.type)) {
			this.client.logger.error(`Command Builder`, `Type for command ${this.name} in ${this.path} is invalid`);

			invalid = true;
		}

		if (this.aliases.length || !['hybrid', 'prefix'].includes(this.type)) {
			this.client.logger.error(`Command Builder`, 'Aliases are only available for prefix commands');

			invalid = true;
		}

		if ((this.developer === true || this.admin === true) && this.type !== 'prefix') {
			this.client.logger.error(`Command Builder`, 'Developer and Admin commands are only available for prefix commands');

			invalid = true;
		}


		if (this.examples.length) {
			for (const example of this.examples) {
				if (!Array.isArray(example)) {
					this.client.logger.error(`Command Builder`, 'Examples must be an array of strings');

					invalid = true;

					break;
				}
			}
		}

		if (this.options.length > 25) {
			this.client.logger.error(`Command Builder`, `Command ${this.name} in ${this.path} exceeds 25 options`);

			invalid = true;
		}

		let hasOption = false,
			hasSubCommand = false,
			hasSubCommandGroup = false;

		for (const option of this.options) {
			const isInvalid = option.validate();

			if (isInvalid) {
				invalid = true;
			} else if (option.type === 'subCommand') {
				hasSubCommand = true;
			} else if (option.type !== 'subCommandGroup') {
				hasSubCommandGroup = true;
			} else if (!['subCommand', 'subCommandGroup'].includes(option.type)) {
				hasOption = true;
			}
		}

		if (hasOption && hasSubCommand) {
			this.client.logger.error(`Command Builder`, `Command ${this.name} in ${this.path} cannot have both options and sub commands`);

			invalid = true;
		}

		if (hasOption && hasSubCommandGroup) {
			this.client.logger.error(`Command Builder`, `Command ${this.name} in ${this.path} cannot have both options and sub command groups`);

			invalid = true;
		}

		if (hasSubCommand && hasSubCommandGroup) {
			this.client.logger.error(`Command Builder`, `Command ${this.name} in ${this.path} cannot have both sub commands and sub command groups`);

			invalid = true;
		}

		if (invalid) {
			this.client.logger.crash(`Command Builder`, `Invalid command data ${this.name} in ${this.path}`);
		}
	}

}

module.exports = Command;


/**
 * @typedef {CommandOption|AttachmentCommandOption|BooleanCommandOption|ChannelCommandOption|IntegerCommandOption|MentionableCommandOption|NumberCommandOption|RoleCommandOption|StringCommandOption|SubCommandGroupOption|SubCommandOption|UserCommandOption} CommandOptions
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
 * @callback SubCommandOptionCallback
 * @param {SubCommandOption} subCommandOption
 */

/**
 * @callback SubCommandGroupOptionCallback
 * @param {SubCommandGroupOption} subCommandGroupOption
 */

/**
 * @callback UserOptionCallback
 * @param {UserCommandOption} userOption
 */
