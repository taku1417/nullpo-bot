const { ChatInputCommandInteraction, Client, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const dbclient = require('../database/index.js');
const throw_webhook = require('../../../function/throw_webhook.js');
const visual_timer = require('../../SlashCommand/visual_timer.js');

/**
 * VisualTimerのタイマーの一覧を表示する
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
async function list(interaction, client) {
  await interaction.deferReply({ephemeral: true});
  if(visual_timer_parent.length == 0) {
    await interaction.followUp({
      content: '現在、作成されているタイマーはありません。'
    });
    return;
  }
  let timer_list = '';
  let message = [];
  const res = await Promise.all(visual_timer_parent.map(async timer => {
    const channel = await client.channels.fetch(timer.channel_id);
    const message = await channel.messages.fetch(timer.message_id);
    return timer_list += `\n- **[${timer.name}](${message.url})** (Message ID: ${timer.message_id})`;
  }));
  const embed = new EmbedBuilder()
  .setTitle('タイマー一覧')
  .setColor(0xFFFFFF)
  .addFields(
    { name: 'タイマー名', value: timer_list}
  )
  .setTimestamp(new Date())
  .setFooter({text: 'Visual Timer  Powered by ぬるぽbot'});
  await interaction.followUp({
    embeds: [embed]
  });
}

module.exports = list;