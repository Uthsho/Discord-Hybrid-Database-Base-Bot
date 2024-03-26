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

	isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
	}

}

module.exports = Util;
