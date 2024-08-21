const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
/**
 * tips edit
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function edit(interaction, client) {
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  
}

module.exports = edit;