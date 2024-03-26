const { SlashCommandStringOption, SlashCommandBuilder } = require('discord.js');
const RequiredBaseCommandOption = require('./RequiredBaseCommandOption');

class StringCommandOption extends RequiredBaseCommandOption {

	/**
	 *
	 * @param {Command} main The main command structure
	 */
	constructor(main) {
		super(main, 'string');

		this.min = null;

		this.max = null;

		this.autocomplete = false;

		this.choices = [];
	}

	/**
	 * Sets the minimum length of this string.
	 * @param {number} min Minimum length of this string.
	 * @returns {this}
	 */
	setMinLength(min) {
		this.min = min;
		return this;
	}

	/**
	 * Sets the maximum length of this string.
	 * @param {number} max Maximum length of this string.
	 * @returns {this}
	 */
	setMaxLength(max) {
		this.max = max;
		return this;
	}

	/**
	 * Sets whether this string should be autocompleted.
	 * @param {boolean} autocomplete Whether this string should be autocompleted.
	 * @returns {this}
	 */

	setAutocomplete(autocomplete) {
		this.autocomplete = autocomplete;
		return this;
	}

	/**
	 * Adds choices to this string.
	 * @param {...CommandOptionChoice} choices Choices to add.
	 * @returns {this}
	 */
	addChoices(...choices) {
		this.choices.push(...choices);
		return this;
	}
	/**
	 * Sets choices to this string.
	 * @param {...CommandOptionChoice} choices Choices to add.
	 * @returns {this}
	 */
	setChoices(...choices) {
		this.choices = choices;
		return this;
	}

	/**
	 * This command generates slash command option data
	 * @param {SlashCommandBuilder} cmd the command to generate the slash command option data for
	 */
	generateSlashCommandOption(cmd) {
		const option = new SlashCommandStringOption()
			.setName(this.name)
			.setDescription(this.description)
			.setRequired(this.required);

		if (this.min) option.setMinLength(this.min);
		if (this.max) option.setMaxLength(this.max);
		if (this.autocomplete) option.setAutocomplete(this.autocomplete);
		if (this.choices.length) option.addChoices(this.choices);

		cmd.addStringOption(option);
	}
	validate() {
		let invalid = super.validate();

		if ((this.min && !this.max) || (!this.min && this.max)) {
			invalid = true;
			this.client.logger.error('CommandOption', `Minimum or maximum is not provided for ${this.name} in command ${this.main.name}.`);
		}

		if (this.choices.length && this.choices.length > 25) {
			invalid = true;
			this.client.logger.error('CommandOption', `Choices for ${this.name} in command ${this.main.name} exceeds 25.`);
		}

		if (this.choices.length && this.choices.some(choice => !choice.name || !choice.value)) {
			invalid = true;
			this.client.logger.error('CommandOption', `Choices for ${this.name} in command ${this.main.name} is invalid.`);
		}

		if (this.choices.length && this.choices.some(choice => typeof choice.name !== 'string' || typeof choice.value !== 'string')) {
			invalid = true;
			this.client.logger.error('CommandOption', `Choices for ${this.name} in command ${this.main.name} is invalid.`);
		}


		if (this.autocomplete && this.choices.length) {
			invalid = true;
			this.client.logger.error('CommandOption', `Choices for ${this.name} in command ${this.main.name} is enabled when autocomplete is on.`);
		}

		return invalid;
	}


}

module.exports = StringCommandOption;


/**
 * @typedef {Object} CommandOptionChoice
 * @property {string} name The name of this choice.
 * @property {string} value The value of this choice.
 */
