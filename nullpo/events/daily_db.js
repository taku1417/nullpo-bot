const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});
const config = require('config');
const dbClient = require('pg/lib/client');
const dbclient = ((process.env.NODE_ENV === 'heroku') 
? new dbClient({connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}}) 
: new dbClient({connectionString: config.get('DATABASE_URL'), ssl:{rejectUnauthorized: false}}));


function daily_db(interaction){
    let query = 'SELECT to_json(coins) FROM coins;';
	dbclient.connect().catch(err => console.error("[daily] dbclient connect error", err));
    dbclient.query(query, function(err, result) {
        if (err) {
            console.error("[daily] query error", err);
        } else {
            console.log(result);
			interaction.reply({
				content: result,
				ephemeral: true
			});
        }
    });
	dbclient.end();
}

module.exports = daily_db;