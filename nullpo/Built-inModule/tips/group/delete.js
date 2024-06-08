const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require("discord.js");
const dbclient = require('../../../Built-inModule/database/index.js');

/**
 * group delete
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function delete_(interaction, client){
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  if(!interaction.options.getString('name')) {
    interaction.reply({content: '存在しないグループが指定されています。\n削除するtipsグループ名を正しく選択してください。', ephemeral: true});
    return;
  }
  if(interaction.options.getString('name')) {
  }
  const name = interaction.options.getString('name');

  try {
    let groupID;
    await dbclient.connection('BEGIN;');
    await dbclient.connection(`DELETE FROM tips_group WHERE name = '${name}';`)
    .then(async res => {
      console.log(res);
      groupID = res.insertId;
      await interaction.reply({
        content: `tipsグループ **${name}**(ID:${groupID}) を削除しました。`, 
        ephemeral: true
      });
    });
    tips_group = tips_group.filter(group => group.name != name);
    await dbclient.connection('COMMIT;');
  } catch (e) {
    await dbclient.connection('ROLLBACK;');
    if(e.code === 'ER_DUP_ENTRY' || e.errno === 1062) {
      const content = `同じ名前${name}のtipsグループが既に存在します。別の名前を入力してください。`;
      if(interaction.replied) {
        await interaction.editReply({content: content, ephemeral: true});
      } else {
        await interaction.reply({content: content, ephemeral: true});
      }
    } else {
      console.log("汎用エラー\n"+e);
      const content = 'tipsグループの削除に失敗しました。再度入力をお願いします。\n何度も失敗する場合、taku1417へお問い合わせください。';
      if(interaction.replied) {
        await interaction.editReply({content: content, ephemeral: true});
      } else {
        await interaction.reply({content: content, ephemeral: true});
      }
    }
    return;
  }
  return;
}

module.exports = delete_;