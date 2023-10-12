const { ButtonBuilder, ButtonStyle } = require("discord.js");

function no_button(interaction) {
        logger.trace("[button] no.js");
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

module.exports = {
        data: new ButtonBuilder()
                .setCustomId('no')
                .setLabel('いいえ')
                .setStyle(ButtonStyle.Danger),
        async execute(interaction, client) {
                no_button(interaction);
        }
}const { ButtonBuilder, ButtonStyle } = require("discord.js");

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

module.exports = {
        data: new ButtonBuilder()
                .setCustomId('no')
                .setLabel('いいえ')
                .setStyle(ButtonStyle.Danger),
        async execute(interaction, client) {
                no_button(interaction);
        }
}