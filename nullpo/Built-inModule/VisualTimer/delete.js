const { ChatInputCommandInteraction, Client, PermissionsBitField, EmbedBuilder } = require('discord.js');
const throw_webhook = require('../../../function/throw_webhook');
const dbclient = require('../../Built-inModule/database/index.js');

/**
 * VisualTimerの削除をする 
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
async function delete_(interaction, client) {
  await interaction.deferReply({ephemeral: true});
  if(interaction.options.getString('name') == 'none') {
    await interaction.followUp({content: 'その項目を指定しても意味はありません！'});
    return;
  }//先にnoneを弾きたい(エラーになるため)ので変数定義前に書いた
  const target_timer_id = interaction.options.getString('name');
  const target_timer = visual_timer_parent.find(object => object.message_id == target_timer_id);
  const target_timer_message = await client.channels.fetch(target_timer.channel_id).then(channel => channel.messages.fetch(target_timer_id));
  if(target_timer_message == undefined) {
    interaction.followUp({content: '指定されたタイマーは存在しません。', ephemeral: true});
    throw_webhook('visual_timer/delete: 指定されたタイマーは存在しません。target => ' + target_timer_id + ' | ' + interaction.user.username + 'さんが実行', interaction.user.username, client);
    return;
  }//タイマーが存在しない場合 => エラー  管理者によってメッセージが削除されたなど
  if(!(interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) || interaction.member.permissionsIn(target_timer_message.channel).has(PermissionsBitField.Flags.ManageMessages) || target_timer.author_id == interaction.user.id)) {//メッセージの管理権限を持っていない、かつタイマーの作成者でもない場合
    interaction.followUp({content: 'タイマーの削除に必要な権限がなく、タイマーの作成者でないため削除出来ませんでした。権限を持つユーザーにお問い合わせください。'});
    return;
  }
  const old_visual_timer_current = visual_timer_current;
  const embed = new EmbedBuilder()
    .setTitle('タイマー削除成功')
    .setColor(0x00FF00)
    .setDescription(`以下のタイマーを削除しました。\n\`\`\`${target_timer.name}\`\`\`\n`)
    .setTimestamp(new Date())
    .setFooter({ text: "Visual Timer  Powered by ぬるぽbot"});
  try {//データベースからの削除 ロールバックしやすいようにトランザクションで編集
    await dbclient.connection('BEGIN;');
    await dbclient.connection(`DELETE FROM visual_timer_current WHERE timer_message_id = '${target_timer_id}';`);
    await dbclient.connection(`DELETE FROM visual_timer WHERE message_id = '${target_timer_id}';`);
    visual_timer_parent = visual_timer_parent.filter(object => object.message_id != target_timer_id);
    visual_timer_current = visual_timer_current.filter(object => object.message_id != target_timer_id);
    target_timer_message.delete();
    await dbclient.connection('COMMIT;');
    interaction.followUp({embeds: [embed], ephemeral: true});
  } catch (error) {
    await dbclient.connection('ROLLBACK;');
    interaction.followUp({content: 'タイマーの削除に失敗しました。', ephemeral: true});
    throw_webhook('visual_timer/delete: タイマーの削除に失敗しました。target => ' + target_timer_id + ' | ' + interaction.user.username + 'さんが実行', interaction.user.username, client);
    visual_timer_current = old_visual_timer_current;
    return;
  }
}

module.exports = delete_;