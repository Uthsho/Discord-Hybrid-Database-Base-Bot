class CommandOption {

	constructor(main, name, description, optional) {
		this.name = name;
		this.description = description;

		this.main = main;

		this.optional = optional || false;
	}



}

module.exports = CommandOption;
