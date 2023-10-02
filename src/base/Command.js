const Bot = require('../structures/Bot');


// type jsdoc for Option

/**
 * @typedef {Object} Option
 * @property {string} name The name of the command
 * @property {string} [description] The description of the command
 * @property {string} [category] The category of the command
 * @property {string[]} [aliases] The aliases of the command for prefix command
 * @property {string[]} [examples] The examples of the command
 * @property {string[]} [usages] The usage of the command
 * @property {boolean} [developer] Whether the command is developer only or not
 * @property {import('discord.js').PermissionResolvable} [userPermissions] The permissions the user needs to run the command
 * @property {import('discord.js').PermissionResolvable} [clientPermissions] The permissions the client needs to run the command
 */


class Command {

	/**
     *
     * @param {Bot} client Client that instantiated this command
     * @param {Option} options The options for this command
     */
	constructor(client, options) {

		this.client = client;

		this.name = options.name;
	}

}

module.exports = Command;
