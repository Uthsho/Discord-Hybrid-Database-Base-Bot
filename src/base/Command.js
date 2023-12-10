// eslint-disable-next-line no-unused-vars
const Bot = require('../structures/Bot');

// type jsdoc for Option

/**
 * @typedef {Object} Option
 * @property {string} name The name of the command
 * @property {string} [description] The description of the command
 * @property {string} [category] The category of the command
 * @property {'hybrid'|'slash'|'prefix'} [type] The type of the command
 * @property {string[]} [aliases] The aliases of the command for prefix command
 * @property {Array<string>[]} [examples] The examples of the command
 * @property {boolean} [developer] Whether the command is developer only or not
 * @property {boolean} [admin] Whether the command is admin only or not
 * @property {import('discord.js').PermissionResolvable} [userPermissions] The permissions the user needs to run the command
 * @property {import('discord.js').PermissionResolvable} [clientPermissions] The permissions the client needs to run the command
 * @property {boolean} [guild] Whether the command can only be used in guilds or not
 * @property {number} [cooldown] The cooldown of the command
 * @property {boolean} [global] Whether the command has a global cooldown or not
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

		this.description = options.description || 'No description provided';

		this.category = options.category || 'No category provided';

		this.type = options.type || 'slash';

		this.aliases = options.aliases || [];

		this.examples = options.examples || [];

		this.developer = options.developer || false;

		this.admin = options.admin || false;

		this.userPermissions = options.userPermissions || [];

		this.clientPermissions = options.clientPermissions || [];

		this.guild = !!options.guild;

		this.cooldown = options.cooldown || 3;

		this.global = !!options.global;

		this.validate();
	}

	validate() {
		let invalid = false;

		if (!this.name || !this.name.length) {
			this.client.logger.error(`Command Builder`, `Name for command in ${this.path} is not provided`);

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


		if (invalid) {
			this.client.logger.crash(`Command Builder`, `Invalid command ${this.name} in ${this.path}`);
		}
	}

}

module.exports = Command;
