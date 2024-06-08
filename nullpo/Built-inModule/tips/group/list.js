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
  const is_check_db = interaction.options.getBoolean('check_db');
  let msg = '';

  if(!is_check_db) {//内部データ(=var tips_group)
    msg += `内部データに存在するグループ一覧\n\n`;
    tips_group.map(group => {
      return msg += `- **${group.name}** (Group ID: ${group.id})\n`;
    });
  } else {//データベース(=select * from tips_group)
    msg += `データベースに存在するグループ一覧\n\n`;
    await dbclient.connection('SELECT * FROM tips_group;')
    .then(res => {
      res.map(group => {
        return msg += `- **${group.name}** (Group ID: ${group.id})\n`;
      });
    });
  }
  if(msg.length === 0) msg = '現在、作成されているグループはありません。';
  if(msg.length > 1900) {
    msg = msg.slice(0, 1900);
    msg += '\n...表示できる文字数を超えたため、以降省略しています。';
  }
  interaction.reply({content: `${msg}`, ephemeral: true});
  return;
}

module.exports = list;