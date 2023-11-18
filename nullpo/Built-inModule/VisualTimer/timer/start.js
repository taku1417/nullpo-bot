const { ButtonInteraction, Message, Client } = require("discord.js");
const dbclient = require('../../database/index.js');
const throw_webhook = require('../../../../function/throw_webhook.js');
const VisualTimer = require('../index.js');
const mysql = require('mysql2');
const start_stop = require("../../../components/button/visual_timer/start_stop.js");

/**
 * interactionを発行したユーザーのtimerを開始する
 * @param {Message} timer_message 
 * @param {mysql.RowDataPacket} target_timer
 * @param {ButtonInteraction} interaction 
 * @param {Client} client 
 */
async function start(target_timer_message, target_timer, interaction, client){
  const target_user = interaction.user;
  const target_timer_id = target_timer_message.id;
  const target_user_timer = visual_timer_current.find(object => object.discord_id == target_user.id && object.message_id == target_timer_id);
  if(target_user_timer != undefined) {//本来はstopに分岐するはず
    interaction.followUp({content: 'タイマーの開始に失敗しました。', ephemeral: true});
    logger.error('visual_timer/start: タイマーの開始に失敗しました。target => ' + target_timer_id + ' | ' + target_user.id + ' | ' + interaction.user + 'さんが実行');
    throw_webhook('error', 'visual_timer/start', 'タイマーの開始に失敗しました。target => ' + target_timer_id + ' | ' + target_user.id + ' | ' + interaction.user + 'さんが実行');
    visual_timer_executing_user = visual_timer_executing_user.filter(object => object != interaction.user.id);
    return;
  }
  let enddate = Date.now() + target_timer[0].time * 1000;
  let embed = target_timer_message.embeds[0];
  await dbclient.connection('BEGIN;');
  await dbclient.connection(`INSERT visual_timer_current (timer_message_id, discord_id, end_date_unix) VALUES ('${target_timer_id}', '${interaction.user.id}', '${enddate}');`);
  const current_id = await dbclient.connection(`SELECT id FROM visual_timer_current WHERE timer_message_id = '${target_timer_id}' AND discord_id = '${interaction.user.id}';`);
  try {
    visual_timer_current.push({
      id: current_id[0].id,
      message_id: target_timer_id,
      discord_id: interaction.user.id,
      end_date_unix: enddate
    });
    await target_timer_message.edit({embeds: [embed]});
    interaction.followUp({content: 'タイマーを開始しました。'});
    await dbclient.connection('COMMIT;');
  } catch (error) {
    interaction.followUp({content: 'タイマーの開始に失敗しました。', ephemeral: true});
    logger.error('visual_timer/start: visual_timer_currentへのpushに失敗しました。target => ' + target_timer_id + ' | ' + target_user.id + ' | ' + interaction.user + 'さんが実行');
    throw_webhook('error', 'visual_timer/start', 'visual_timer_currentへのpushに失敗しました。target => ' + target_timer_id + ' | ' + target_user.id + ' | ' + interaction.user + 'さんが実行');
    await dbclient.connection('ROLLBACK;');
    return;
  } finally {
    visual_timer_executing_user = visual_timer_executing_user.filter(object => object != interaction.user.id);
  }
}

module.exports = start;