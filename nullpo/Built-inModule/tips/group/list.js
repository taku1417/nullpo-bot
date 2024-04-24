const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const dbclient = require('../../../Built-inModule/database/index');
/**
 * tips group list
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function list(interaction, client) {
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  const tips_group = await dbclient.connection(`SELECT * FROM tips_group;`);
  let msg = '';
  tips_group.map(group => {
    return msg += `- **${group.name}** (Group ID: ${group.id})\n`;
  });
  if(msg.length === 0) msg = '現在、作成されているグループはありません。';
  if(msg.length > 1900) {
    msg = msg.slice(0, 1900);
    msg += '\n...表示できる文字数を超えたため、以降省略しています。';
  }
  interaction.reply({content: `${msg}`, ephemeral: true});
  return;
}

module.exports = list;