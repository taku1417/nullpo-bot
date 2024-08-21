const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const dbclient = require('../../Built-inModule/database/index');
const convertDate = require('./convertDate');
/**
 * tips list
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function list(interaction, client) {
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  interaction.reply({content: convertDate('2024-12-31 21:39:59', 'Asia/Tokyo')[0]});
  return;
}

module.exports = list;