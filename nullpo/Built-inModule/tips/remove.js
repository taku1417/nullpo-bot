const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
/**
 * tips remove
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function remove(interaction, client) {
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  
}

module.exports = remove;