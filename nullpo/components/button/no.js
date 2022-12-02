//const { Client, Intents } = require('discord.js');
//const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

function no_button(interaction) {
        if (lendSystemCurrent != '') {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                lendSystemCurrent = '';
                lendSystemMode = '';
        }
}

module.exports = no_button;