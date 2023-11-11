const { ButtonInteraction, Message, Client } = require("discord.js");
const dbclient = require('../../database/index.js');
const throw_webhook = require('../../../../function/throw_webhook.js');
const VisualTimer = require('../index.js');
const mysql = require('mysql2');

/**
 * interactionを発行したユーザーのtimerを停止する
 * @param {Message} target_timer_message 
 * @param {mysql.RowDataPacket} target_timer
 * @param {ButtonInteraction} interaction 
 * @param {Client} client 
 */
async function stop(target_timer_message, target_timer, interaction, client){
  const target_user_id = interaction.user.id;
  const target_timer_id = target_timer_message.id;
  const target_user_timer = visual_timer_current.find(object => object.discord_id == target_user_id && object.message_id == target_timer_id);
  if(target_user_timer == undefined) {//本来はstartに分岐するはず
    interaction.followUp({content: 'タイマーの停止に失敗しました。', ephemeral: true});
    throw_webhook('error', 'visual_timer/stop', 'タイマーの停止に失敗しました。target => ' + target_timer_id + ' | ' + target_user_id + ' | ' + interaction.user + 'さんが実行');
    return;
  }
  await dbclient.connection('BEGIN;');
  const try_delete = await dbclient.connection(`DELETE FROM visual_timer_current WHERE discord_id = ${target_user_timer.discord_id} AND timer_message_id = ${target_timer_id};`);
  if(try_delete.affectedRows == 0) {
    interaction.followUp({content: 'タイマーの停止に失敗しました。', ephemeral: true});
    throw_webhook('error', 'visual_timer/stop', 'visual_timer_currentからの削除に失敗しました。target => ' + target_timer_id + ' | ' + target_user_id + ' | ' + interaction.user + 'さんが実行');
    await dbclient.connection('ROLLBACK;');
    return;
  } else {
    visual_timer_current.filter(object => object.discord_id != target_user_timer.id && object.message_id != target_timer_id);
    interaction.followUp({content: 'タイマーを停止しました。'});
    await dbclient.connection('COMMIT;');
  }
}

module.exports = stop;