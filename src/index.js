const Bot = require('./structures/Bot');

const client = new Bot();

client.boot()
	.then(() => {
		console.log(`Successfully started process!`);
	}).catch(err => {
		console.error(`Failed to start process!`);
		console.error(err);
	});
