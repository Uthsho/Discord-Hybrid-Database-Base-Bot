// eslint-disable-next-line no-unused-vars
const Bot = require('./Bot');
const chalk = require('chalk').default;


class Logger {

	/**
     *
     * @param {Bot} client Client
     */
	constructor(client) {
		this.client = client;
	}

	get id() {
		return 0;
	}

	debug(title, message) {
		console.log(chalk.yellow.dim(`[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`));
	}

	log(title, message) {
		console.log(chalk.green.dim(`[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`));
	}

	error(title, message) {
		console.log(chalk.red.dim(`[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`));
	}

	crash(title, message) {
		console.log(chalk.red.dim(`[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`));
		process.exit(1);
	}

}

module.exports = Logger;
