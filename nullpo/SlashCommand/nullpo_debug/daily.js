const logger = require('../../log/logger.js');
const daily_db = require('../../events/daily_db.js');
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('デイリーコインを受け取ります。'),
    async execute(interaction) {
        logger("command");
        daily_db(interaction);
        /*await interaction.reply({
            content: 'デイリーコインを受け取りました。',
            ephemeral: true
        });*/
    },
};
