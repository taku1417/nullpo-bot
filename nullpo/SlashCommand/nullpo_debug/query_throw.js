const logger = require('../../log/logger.js');
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const config = require('config');
const dbClient = require('pg/lib/client');
const dbclient = ((process.env.NODE_ENV === 'heroku') 
? new dbClient({connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}}) 
: new dbClient({connectionString: config.get('DATABASE_URL'), port: 5432, ssl: true}));


module.exports = {
    data: new SlashCommandBuilder()
        .setName('query_throw')
        .setDescription('クエリ操作をテストします。管理者のみ使用可能です。')
        .setDefaultMemberPermissions(0)
        .addStringOption(option => option.setName('query').setDescription('クエリを入力してください。').setRequired(true)),
    async execute(interaction) {
        logger("command");
        await interaction.reply({
            content: (query(interaction.options.getString('query')) !== undefined) ? query(interaction.options.getString('query')) : 'クエリが正常に実行されませんでした。',
            ephemeral: true
        });
    },
};

async function query (query) {
    reply_message = '';
    await dbclient.connect().catch(err => {reply_message = err; console.error("\n\n[query] dbclient connect error", err);});
    await dbclient.query(query, (err, result) => {
        if (err) {
            console.error("\n\n[query] query error", err);
            reply_message = err;
        } else {
            console.log(result);
			reply_message = result;
        }
    }).then(() => { dbclient.end(); });
    await setTimeout(() => {}, 3000);
    return reply_message;
}
