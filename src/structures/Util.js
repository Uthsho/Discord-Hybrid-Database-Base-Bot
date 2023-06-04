// eslint-disable-next-line no-unused-vars
const Bot = require('./Bot');
const { glob } = require('glob');

class Util {

	/**
     *
     * @param {Bot} client Client
     */
	constructor(client) {
		this.client = client;
	}

	loadFiles(directory) {
		return glob(directory);
	}

}

module.exports = Util;
