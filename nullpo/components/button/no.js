const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

function no_button(interaction) {
        if (rental_current['mjc_pic'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mjc_pic'] = 0;
        }
        if (rental_current['mjc_sho'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mjc_sho'] = 0;
        }
        if (rental_current['mjc_swo'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mjc_swo'] = 0;
        }
        if (rental_current['star_guide'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['star_guide'] = 0;
        }
        if (rental_current['mrz_iron'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mrz_iron'] = 0;
        }
        if (rental_current['mrz_eme'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mrz_eme'] = 0;
        }
        if (rental_current['mrz_dia'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mrz_dia'] = 0;
        }
        if (rental_current['mrz_gold'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['mrz_gold'] = 0;
        }
        if (rental_current['soul_protection'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['soul_protection'] = 0;
        }
        if (rental_current['vortex'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['vortex'] = 0;
        }
        if (rental_current['haruspe'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['haruspe'] = 0;
        }
        if (rental_current['re_haruspe'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['re_haruspe'] = 0;
        }
        if (rental_current['luck'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['luck'] = 0;
        }
        if (rental_current['all_pic'] === 1) {
                interaction.reply({
                        content: "キャンセルしました。",
                        ephemeral: true,
                        fetchReply: true
                });
                rental_current['all_pic'] = 0;
        }
}

module.exports = no_button;