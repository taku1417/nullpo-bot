const e = require('express');
const nplogger = require('../log/logger.js');
const { Client, SlashCommandBuilder, ApplicationCommandType, Interaction, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping値を返します。'),
    /**
     * ping値をinteraction.reply()で返します
     * @param {Interaction<ChatInputCommandInteraction>} interaction
     * @param {Client} client
     * @returns {void}
     */
    async execute(interaction, client) {
        logger.trace("[SlashCommand] ping.js");
        nplogger('command');
        await interaction.reply({
            content: `pong!\nWebSocket Ping:    ${client.ws.ping}ms\n
            API Endpoint Ping: 計測中...\n\n
            WebSocket PingはDiscord APIとぬるぽbot間の応答速度。ぬるぽbotはアメリカのサーバー上で実行しているため良い傾向にあります。\n
            API Endpoint Pingはコマンドを実行しbotの処理が開始されてから、このメッセージが作成されるまでの時間。読み上げbotの計測方法と同じです。\n
            負荷のかかる処理を行っていたり、Discord APIに障害が起きていたりすると値が大きくなります。`,
            ephemeral: true
        });
        let msg = await interaction.fetchReply();
        await interaction.editReply({
            content: `pong!\nWebSocket Ping:    ${client.ws.ping}ms\n
            API Endpoint Ping: ${msg.createdTimestamp - interaction.createdTimestamp}ms\n\n
            WebSocket PingはDiscord APIとぬるぽbot間の応答速度。ぬるぽbotはアメリカのサーバー上で実行しているため良い傾向にあります。\n
            API Endpoint Pingはコマンドを実行しbotの処理が開始されてから、このメッセージが作成されるまでの時間。読み上げbotの計測方法と同じです。\n
            負荷のかかる処理を行っていたり、Discord APIに障害が起きていたりすると値が大きくなります。`
        });
    }
};
