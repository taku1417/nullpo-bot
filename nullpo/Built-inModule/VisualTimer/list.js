const { ChatInputCommandInteraction, Client, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const dbclient = require('../database/index.js');
const throw_webhook = require('../../../function/throw_webhook.js');

/**
 * VisualTimerのタイマーの一覧を表示する
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
async function list(interaction, client) {
  interaction.deferReply();
  const dbres = await dbclient.connection(`SELECT * FROM visual_timer`);
  if(dbres.length == 0) {
    interaction.followUp({
      content: '現在、作成されているタイマーはありません。',
      ephemeral: true
    });
  }
  dbres[0].forEach(async timer => {
    
  });
}

module.exports = list;