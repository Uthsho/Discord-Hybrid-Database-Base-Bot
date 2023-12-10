// eslint-disable-next-line no-unused-vars
const Command = require('./Command');

class CommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		/**
		 * The name of this command option.
		 * @type {string}
		 */
		this.name = null;
		/**
		 * The description of this command option.
		 * @type {string}
		 */
		this.description = null;

		/**
		 * The type of this command option.
		 * @type {CommandOptionType}
		 */
		this.type = 'unknown';

		/**
		 * Whether this option is required or not.
		 * @type {boolean}
		 */
		this.required = null;

		this.main = main;

		this.validate();
	}

	get client() {
		return this.main.client;
	}

	/**
	 *
	 * @param {string} description Description of this command option.
	 * @returns {this}
	 */
	setDescription(description) {
		this.description = description;
		return this;
	}

	/**
	 *
	 * @param {string} name Name of this command option.
	 * @returns {this}
	 */
	setName(name) {
		this.name = name;
		return this;
	}
	/**
	 *
	 * @param {boolean} required Whether this command option is required or not.
	 * @returns {this}
	 */
	setRequired(required) {
		this.required = required;
		return this;
	}

	/**
	 *
	 * @param {CommandOptionType} type What the type of command option it is.
	 * @returns {this}
	 */
	setType(type) {
		this.type = type;
		return this;
	}


	validate(isInvalid = false) {
		let invalid = isInvalid;

		if (!this.name || !this.name.length) {
			invalid = true;
			this.client.logger.error('CommandOption', `Name for command ${this.main.name} is not provided.`);
		}

		if (!this.description || !this.description.length) {
			invalid = true;
			this.client.logger.error('CommandOption', `Description for ${this.name} in command ${this.main.name} is not provided.`);
		}

		if (this.required === null) {
			invalid = true;
			this.client.logger.error('CommandOption', `Required for ${this.name} in command ${this.main.name} is not provided.`);
		}

		const types = ['channel', 'integer', 'mentionable', 'number', 'role', 'string', 'subCommand', 'subCommandGroup', 'user'];

		if (this.type === 'unknown' || !types.includes(this.type)) {
			invalid = true;
			this.client.logger.error('CommandOption', `Type for ${this.name} in command ${this.main.name} is invalid.`);
		}


		if (invalid) {
			this.client.logger.crash('CommandOption', `Invalid command option in ${this.main.path}`);
		}

		return invalid;
	}

}

/**
 * @typedef {('unknown'|'channel'|'integer'|'mentionable'|'number'|'role'|'string'|'subCommand'|'subCommandGroup'|'user')} CommandOptionType
 */


module.exports = CommandOption;
