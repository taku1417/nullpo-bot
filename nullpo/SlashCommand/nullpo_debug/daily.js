const nplogger = require('../../log/logger.js');
const daily_db = require('../../events/daily_db.js');
const { GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('デイリーコインを受け取ります。'),
    async execute(interaction) {
        logger.trace("[SlashCommand] daily.js");
        nplogger("command");
        daily_db(interaction);
        /*await interaction.reply({
            content: 'デイリーコインを受け取りました。',
            ephemeral: true
        });*/
    },
};
