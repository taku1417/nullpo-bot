const { ChatInputCommandInteraction, Client, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const dbclient = require('../database/index.js');
const throw_webhook = require('../../../function/throw_webhook.js');

/**
 * VisualTimerのタイマーの一覧を表示する
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 */
async function list(interaction, client) {
  const dbres = await dbclient.connection(`SELECT * FROM visual_timer`);
  if(dbres[0]) //todo: dbの中身が空の時の戻り値分からん...あとにする...
  dbres[0].forEach(async timer => {

  });
}

module.exports = list;