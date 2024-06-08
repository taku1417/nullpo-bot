const { ChatInputCommandInteraction, Client, PermissionFlagsBits } = require("discord.js");
const dbclient = require('../../../Built-inModule/database/index.js');

/**
 * group create
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns {void}
 */
async function create(interaction, client){
  if(!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    interaction.reply({content: 'このコマンドを実行する権限がありません。', ephemeral: true});
    return;
  }
  const name = interaction.options.getString('name');
  const interval = interaction.options.getInteger('interval') ?? 10;
  const format = interaction.options.getString('format') ?? "&b&l[tips]";
  const channel = interaction.options.getChannel('channel') ?? interaction.channel;

  try {
    let groupID;
    await dbclient.connection('BEGIN;');
    await dbclient.connection(`INSERT INTO tips_group (name) VALUES ('${name}');`)
    .then(res => {
      console.log(res);
      groupID = res.insertId;
      interaction.reply({
        content: `tipsグループ **${name}**(ID:${groupID}) を作成しました。`, 
        ephemeral: true
      });
    });
    await dbclient.connection('COMMIT;');
    tips_group.push({
      name: name,
      id: groupID
    });
  } catch (e) {
    await dbclient.connection('ROLLBACK;');
    if(e.code === 'ER_DUP_ENTRY' || e.errno === 1062) {
      interaction.reply({content: `同じ名前${name}のtipsグループが既に存在します。別の名前を入力してください。`, ephemeral: true});
    } else {
      interaction.reply({content: 'tipsグループの作成に失敗しました。再度入力をお願いします。\n何度も失敗する場合、taku1417へお問い合わせください。', ephemeral: true});
    }
    return;
  }
  return;
}

module.exports = create;