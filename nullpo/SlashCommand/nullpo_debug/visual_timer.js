const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const visualTimer = require('../../Built-inModule/VisualTimer/index.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('visual_timer')
        .setDescription('Performs operations related to the visual timer.')
        .setDescriptionLocalizations({
            ja: 'ビジュアルタイマー関連の操作を行います。'
        })
        .addSubcommand(subcommand =>
            subcommand.setName('create')
            .setDescription('Creates a visual timer.')
            .setDescriptionLocalizations({
                ja: 'ビジュアルタイマーを作成します。'
            })
            .addStringOption(option =>
                option.setName('name')
                .setNameLocalizations({
                    ja: '名前'
                })
                .setDescription('Enter the name of the visual timer.')
                .setDescriptionLocalizations({
                    ja: 'ビジュアルタイマーの名前を入力してください。'
                })
                .setMinLength(2)
                .setMaxLength(20)
                .setRequired(true)
            )
            .addNumberOption(option =>
                option.setName('time')
                .setNameLocalizations({
                    ja: '時間'
                })
                .setDescription('Enter the time of the visual timer in seconds. The maximum is 31536000 seconds (365 days).')
                .setDescriptionLocalizations({
                    ja: 'ビジュアルタイマーの時間を秒数で入力してください。最大31536000秒(365日)です。' 
                })
                .setMinValue(1)
                .setMaxValue(31536000)
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('description')
                .setNameLocalizations({
                    ja: '説明'
                })
                .setDescription('Enter the description of the visual timer.')
                .setDescriptionLocalizations({
                    ja: 'どのようなビジュアルタイマーであるかの説明を入力してください。'
                })
                .setMaxLength(100)
            )
            .addChannelOption(option =>
                option.setName('channel')
                .setNameLocalizations({
                    ja: 'チャンネル'
                })
                .setDescription('Select the channel to send the visual timer to.')
                .setDescriptionLocalizations({
                    ja: 'ビジュアルタイマーを送信するチャンネルを入力・選択してください。'
                })
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('delete')
            .setDescription('Deletes a visual timer.')
            .setDescriptionLocalizations({
                ja: 'ビジュアルタイマーを削除します。'
            })
            .addStringOption(option =>
                option.setName('message_id')
                .setDescription('Enter the MessageID of the visual timer.')
                .setDescriptionLocalizations({
                    ja: '削除するビジュアルタイマーのメッセージIDを入力してください。メッセージIDは、ビジュアルタイマーに書いてある"MessageID: "の後ろの数字です。'
                })
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('list')
            .setDescription('Lists all visual timers.')
            .setDescriptionLocalizations({
                ja: '全てのビジュアルタイマーを一覧表示します。'
            })
        ),
    /**
     * execute
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     * @returns {void}
     */
    async execute(interaction, client) {
        switch(interaction.options.getSubcommand()) {
            case 'create':
                visualTimer.create(interaction, client);
                break;
            case 'delete':
                visualTimer.delete(interaction, client);
                break;
            case 'list':
                visualTimer.list(interaction, client);
                break;
        }
    }
}
