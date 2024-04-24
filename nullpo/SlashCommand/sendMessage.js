const nplogger = require('../log/logger.js');
const { SlashCommandBuilder, PermissionsBitField, ChatInputCommandInteraction, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send_message')
        .setDescription('send a message in the channel you typed.')
        .setDescriptionLocalizations({
          ja: '打ち込んだチャンネルでメッセージを送信します。'
        })
        .addStringOption(option => option
            .setName('message')
            .setDescription('Enter the message you want to send.'))
            .setDescriptionLocalizations({
              ja: '送信したいメッセージを入力してください。'
            }),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        logger.trace("[SlashCommand] sendMessage.js");
        nplogger('command');
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) {// メッセージ送信の権限なし => 使用不可
            await interaction.reply({
                content: 'あなたにメッセージ送信の権限がないため送信できません。',
                ephemeral: true
            });
            return;
        }
        const channel = interaction.channel;
        const message = interaction.options.getString('message');
        await channel.send(message);
        await interaction.reply({
          content: 'メッセージを送信しました。',
          ephemeral: true
        });
        return;
    }
}    
