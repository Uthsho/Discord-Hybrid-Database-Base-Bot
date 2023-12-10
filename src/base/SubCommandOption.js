const CommandOption = require('./CommandOption');

class SubCommandOption extends CommandOption {

	constructor(main) {
		super(main);

		this.setType('subCommand');
	}

}

module.exports = SubCommandOption;
