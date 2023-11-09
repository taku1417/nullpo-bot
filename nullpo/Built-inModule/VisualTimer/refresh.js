const { ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const dbclient = require('../database/index.js');

/**
 * VisualTimer管轄の各embedを更新する
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client 
 */
async function refresh(client) {
  visual_timer_edit_count++;
  if(visual_timer_edit_count == global_settings[0].VTimer_refresh_access_db_count) {//10回に1回、embedを更新する
    old_visual_timer_current = visual_timer_current;
    const dbres = await dbclient.connection(`SELECT * FROM visual_timer_current;`);
    const timer_parent_res = await dbclient.connection(`SELECT * FROM visual_timer;`);
    visual_timer_current = [];
    if(timer_parent_res.length == 0) return;
    timer_parent_res.forEach(async (element) => {
      visual_timer_parent.push({
        channel_id: element.channel_id,
        message_id: element.message_id,
        name: element.name,
        description: element.description,
        time: element.time
      });
      const target_timer_message = await client.channels.fetch(element.channel_id).then(channel => channel.messages.fetch(element.message_id));
      if(target_timer_message == null) return;
      if(dbres.length == 0) {
        try {
          let embed = target_timer_message.embeds[0];
          embed.fields[1].value = '誰も開始していません！';
          await target_timer_message.edit({embeds: [embed]});
        } catch (error) {
          logger.warn('visual_timer/refresh: タイマーメッセージのembed更新に失敗しました。作成してすぐ発生する可能性のあるエラーです。頻繁に発生する場合は要チェック！' + error);
        }
        await dbclient.connection('COMMIT;');
        return;
      }
    });
    dbres.forEach(async (element) => {//dbからvisual_timer_currentへの反映
      visual_timer_current.push({
        id: element.id,
        message_id: element.timer_message_id,
        discord_id: element.discord_id,
        end_date_unix: element.end_date_unix
      });
    });
    const unique_message_id = Array.from(new Set(visual_timer_current.map(object => object.message_id)).values());//重複を削除
    unique_message_id.forEach(async (element) => {
      const target_timer = visual_timer_parent.find(object => object.message_id == element);
      if(target_timer == undefined) return;
      const target_timer_message = await client.channels.fetch(target_timer.channel_id).then(channel => channel.messages.fetch(element));
      if(target_timer_message == null) return;
      let embed = target_timer_message.embeds[0];
      let user_list = visual_timer_current.filter(object => object.message_id == element);
      let embed_field_value = '';
      user_list.forEach(async (element) => {
        const current_time = Math.floor((element.end_date_unix - Date.now()) / 1000);
        embed_field_value += `\n<@${element.discord_id}>: ${current_time}秒`;
      });
      embed.fields[1].value = embed_field_value;
      await target_timer_message.edit({embeds: [embed]});
    });
    visual_timer_edit_count = 0;
  } 
  visual_timer_current.forEach(async (element) => {
    if(element.end_date_unix <= Date.now()) {
      const timer = visual_timer_parent.find(object => object.message_id == element.message_id);
      const embed = new EmbedBuilder()
        .setTitle('タイマー終了: ' + timer.name)
        .setColor(0x00FF00)
        .setDescription('タイマーが終了しました。')
        .setTimestamp(new Date())
        .setFooter({ text: "Visual Timer  Powered by ぬるぽbot"});
      client.users.fetch(element.discord_id).then(user => user.send({embeds: [embed]}));
      try {
        await dbclient.connection('BEGIN;');
        await dbclient.connection(`DELETE FROM visual_timer_current WHERE id = ${element.id};`);
        await dbclient.connection('COMMIT;');
        visual_timer_current = visual_timer_current.filter(object => object.id != element.id);//visual_timer_current(配列)から削除
        logger.debug(visual_timer_current);
      } catch (error) {
        await dbclient.connection('ROLLBACK;');
        throw_webhook('error', 'visual_timer/refresh', 'visual_timer_currentからの削除に失敗しました。target => ' + element.id + ' | ' + element.message_id + ' | ' + element.discord_id + ' | ' + element.end_date_unix);
        return;
      }
    }
  });
  return;
}

module.exports = refresh;