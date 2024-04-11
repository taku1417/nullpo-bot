const nplogger = require('../log/logger.js');
const { SlashCommandBuilder, PermissionsBitField, ChatInputCommandInteraction, Client } = require('discord.js');
const dbclient = require('../Built-inModule/database/index.js');
const throw_webhook = require('../../function/throw_webhook.js');
const tipsModule = require('../Built-inModule/tips/index.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tips')
        .setDescription('Manage tips.')
        .setDescriptionLocalizations({
            ja: 'Tipsを管理します。'
        })
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
                .setName('settings')
                .setDescription('Configure the settings.')
                .setDescriptionLocalizations({
                    ja: '各種設定を行います。'
                })
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('list')
                        .setDescription('List settings.')
                        .setDescriptionLocalizations({
                            ja: '設定を一覧表示します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Select the group to list the settings for.')
                                .setDescriptionLocalizations({
                                    ja: '設定を一覧表示するTipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('sending_interval')
                        .setDescription('Set the interval for sending tips.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsを送信する間隔を設定します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Select the group to set the interval for sending tips in.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addNumberOption(option =>
                            option
                                .setName('interval')
                                .setDescription('Enter the interval for sending tips in minutes.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信する間隔を分単位で入力してください。'
                                })
                                .setMinValue(1)
                                .setMaxValue(1440)
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>  
                    subcommand
                        .setName('sending_format')
                        .setDescription('Set the format for sending tips.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsを送信する形式を設定します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Select the group to set the format for sending tips in.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('format')
                                .setDescription('Enter the format for sending tips.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信する形式を入力してください。'
                                })
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('sending_channel')
                        .setDescription('Set the channel for sending tips.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsを送信するチャンネルを設定します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Select the group to set the channel for sending tips in.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addChannelOption(option =>
                            option
                                .setName('channel')
                                .setDescription('Enter the channel for sending tips.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信するチャンネルを入力してください。'
                                })
                                .setRequired(true)
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a tip.')
                .setDescriptionLocalizations({
                    ja: 'Tipsを追加します。'
                })
                .addStringOption(option =>
                    option
                        .setName('group')
                        .setDescription('Select the group to add the tip to.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('content')
                        .setDescription('Enter the content of the tip.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsの内容を入力してください。'
                        })
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a tip.')
                .setDescriptionLocalizations({
                    ja: 'Tipsを削除します。'
                })
                .addStringOption(option =>
                    option
                        .setName('group')
                        .setDescription('Select the group to remove the tip from.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('content')
                        .setDescription('Select the tip to remove.')
                        .setDescriptionLocalizations({
                            ja: '削除するTipsを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Edit a tip.')
                .setDescriptionLocalizations({
                    ja: 'Tipsを編集します。'
                })
                .addStringOption(option =>
                    option
                        .setName('group')
                        .setDescription('Select the group to edit the tip in.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('content')
                        .setDescription('Select the tip to edit.')
                        .setDescriptionLocalizations({
                            ja: '編集するTipsを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List tips.')
                .setDescriptionLocalizations({
                    ja: 'Tipsを一覧表示します。'
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('preview')
                .setDescription('Preview a tip.')
                .setDescriptionLocalizations({
                    ja: 'Tipsをプレビューします。'
                })
                .addStringOption(option =>
                    option
                        .setName('group')
                        .setDescription('Select the group to preview the tip in.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('content')
                        .setDescription('Select the tip to preview.')
                        .setDescriptionLocalizations({
                            ja: 'プレビューするTipsを選択してください。'
                        })
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        ),
    /**
     * execute
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @returns {void}
     */
    async execute(interaction, client) {
        logger.trace("[SlashCommand] tips.js");
        nplogger('command');
        //上で設定した順 
        if(interaction.options.getSubcommandGroup() === 'settings') {// settings
            switch(interaction.options.getSubcommand()) {
                case 'list':
                    logger.trace("[SlashCommand] tips.js: settings.list");
                    tipsModule.settings.list(interaction, client);
                    break;
                case 'sending_interval':
                    logger.trace("[SlashCommand] tips.js: settings.sending_interval");
                    tipsModule.settings.interval(interaction, client);
                    break;
                case 'sending_format':
                    logger.trace("[SlashCommand] tips.js: settings.sending_format");
                    tipsModule.settings.format(interaction, client);
                    break;
                case 'sending_channel':
                    logger.trace("[SlashCommand] tips.js: settings.sending_channel");
                    tipsModule.settings.channel(interaction, client);
                    break;
            }
        } else {// not settings
            switch(interaction.options.getSubcommand()) {
                case 'add':
                    logger.trace("[SlashCommand] tips.js: add");
                    tipsModule.add(interaction, client);
                    break;
                case 'remove':
                    logger.trace("[SlashCommand] tips.js: remove");
                    tipsModule.remove(interaction, client);
                    break;
                case 'edit':
                    logger.trace("[SlashCommand] tips.js: edit");
                    tipsModule.edit(interaction, client);
                    break;
                case 'list':
                    logger.trace("[SlashCommand] tips.js: list");
                    tipsModule.list(interaction, client);
                    break;
                case 'preview':
                    logger.trace("[SlashCommand] tips.js: preview");
                    tipsModule.preview(interaction, client);
                    break;
            }
        }
        return;
    },
    /**
     * autocomplete
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @returns {void}
     */
    async autocomplete(interaction, client) {
        logger.trace("[SlashCommand] tips.js: autocomplete");
        nplogger('autocomplete');
        return;
    }
}    
