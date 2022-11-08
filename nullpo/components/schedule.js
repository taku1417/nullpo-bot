const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('node-cron');
const channeljihou = client.channels.cache.get(tex_jihou);
const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);

        
function cron_schedule() {

}

module.exports = cron_schedule;