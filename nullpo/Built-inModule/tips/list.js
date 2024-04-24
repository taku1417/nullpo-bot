const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const dbclient = require('../../Built-inModule/database/index');
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

  
}

module.exports = list;