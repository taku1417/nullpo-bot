const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const dbclient = require('../../Built-inModule/database/index');

/**
 * tips add
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function add(interaction, client) {
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  
  const group = interaction.options.getString('group');
  const content = interaction.options.getString('content');
  const author_id = interaction.user.id;
  const expiration_date = interaction.options.getString('expiration_date');
  const timezone = interaction.options.getString('timezone');


  if(expiration_date) {
    
  }
  
}

module.exports = add;