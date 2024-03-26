// eslint-disable-next-line no-unused-vars
const Command = require('./Command');
const CommandOption = require('./CommandOption');


class RequiredBaseCommandOption extends CommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 * @param {CommandOptionType} type The type of this command option
	 */
	constructor(main, type) {
		super(main, type);


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

	validate() {
		let invalid = super.validate();

		if (this.required === null) {
			invalid = true;
			this.client.logger.error('CommandOption', `Required is not provided for ${this.name} in command ${this.main.name}.`);
		}
	}


}

module.exports = RequiredBaseCommandOption;

/**
 * @typedef {('unknown'|'channel'|'integer'|'mentionable'|'number'|'role'|'string'|'subCommand'|'subCommandGroup'|'user'|'attachment'|'boolean')} CommandOptionType
 */
