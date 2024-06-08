const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require("discord.js");
const dbclient = require('../../../Built-inModule/database/index.js');

/**
 * group rename
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function rename(interaction, client){
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  const name = interaction.options.getString('name');
  const newName = interaction.options.getString('new_name');

  try {
    let groupID;
    await dbclient.connection('BEGIN;');
    await dbclient.connection(`SELECT * FROM tips_group WHERE name = '${name}';`)
    .then(res => {
      console.log(res);
      if(res.length === 0) {
        interaction.reply({content: `${name}という名前のtipsグループは存在しません。`, ephemeral: true});
        return;
      } else {
        groupID = res[0].id;
        dbclient.connection(`UPDATE tips_group SET name = '${newName}' WHERE id = ${groupID};`);
        interaction.reply({content: `tipsグループ名**${name}**を**${newName}**に変更しました。`, ephemeral: true});
      }
    });
    await dbclient.connection('COMMIT;');
    tips_group = tips_group.map(group => {
      if(group.id === groupID) {
        group.name = newName;
      }
      return group;
    });
  } catch (e) {
    await dbclient.connection('ROLLBACK;');
    if(e.code === 'ER_DUP_ENTRY' || e.errno === 1062) {
      interaction.reply({content: `同じ名前${name}のtipsグループが既に存在します。別の名前を入力してください。`, ephemeral: true});
    } else {
      interaction.reply({content: 'tipsグループの変更に失敗しました。\nデータべース上では変更が完了している場合もあります。\n何度も失敗する場合、taku1417へお問い合わせください。', ephemeral: true});
    }
  }
  return;
}

async function findGroup(name) {
  const group = tips_group.find(g => {
    return g.name === name;
  });
  return group;
}

module.exports = rename;