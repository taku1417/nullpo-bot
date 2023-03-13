const config = require('config');
const dbClient = require('pg/lib/client');
let dbclient;
if(process.env.NODE_ENV === 'heroku') {
	dbclient = new dbClient({
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASS,
		host: process.env.DATABASE_HOST,
		port: 5432,
		database: process.env.DATABASE,
		ssl: true
	});
} else {
	dbclient = new dbClient({
		user: config.get('DATABASE_USER'),
		password: config.get('DATABASE_PASS'),
		host: config.get('DATABASE_HOST'),
		port: 5432,
		database: config.get('DATABASE'),
		ssl: true
	});
}

function dailyReset() {
    let query = 'SELECT * FROM coins;';
}

module.exports = dailyReset;