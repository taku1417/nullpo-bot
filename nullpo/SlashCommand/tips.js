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
        .addSubcommandGroup(subcommandGroup => // group
            subcommandGroup
                .setName('group')
                .setDescription('Manage groups.')
                .setDescriptionLocalizations({
                    ja: 'Tipsグループを管理します。'
                })
                .addSubcommand(subcommand => // group create
                    subcommand
                        .setName('create')
                        .setDescription('Create a group.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを作成します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('name')
                                .setDescription('Enter the name of the group.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsグループの名前を入力してください。'
                                })
                                .setRequired(true)
                        )
                        .addNumberOption(option =>
                            option
                                .setName('interval')
                                .setDescription('Specify tip interval; default is 10 minutes.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信する間隔を分単位で入力してください。指定がない場合、10分になります。'
                                })
                                .setRequired(false)
                                .setMinValue(1)
                                .setMaxValue(1440)
                        )
                        .addStringOption(option =>
                            option
                                .setName('format')
                                .setDescription('Specify tip format; default is "&b&l[tips]".')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信する形式を入力してください。指定がない場合、"&b&l[tips]"になります。'
                                })
                                .setRequired(false)
                        )
                        .addChannelOption(option =>
                            option
                                .setName('channel')
                                .setDescription('Specify channel for tips; defaults to command-execution channel if not entered.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信するチャンネルを入力してください。指定がない場合、実行されたチャンネルになります。'
                                })
                                .setRequired(false)
                        )
                )
                .addSubcommand(subcommand => // group delete
                    subcommand
                        .setName('delete')
                        .setDescription('Delete a group.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを削除します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('name')
                                .setDescription('Select the group to delete.')
                                .setDescriptionLocalizations({
                                    ja: '削除するTipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                )
                .addSubcommand(subcommand => // group rename
                    subcommand
                        .setName('rename')
                        .setDescription('Rename a group.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループの名前を変更します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('name')
                                .setDescription('Select the group to rename.')
                                .setDescriptionLocalizations({
                                    ja: '名前を変更するTipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('new_name')
                                .setDescription('Enter the new name of the group.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsグループの新しい名前を入力してください。'
                                })
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand => // group list
                    subcommand
                        .setName('list')
                        .setDescription('List groups.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsグループを一覧表示します。'
                        })
                )
        )
        .addSubcommandGroup(subcommandGroup => // channel
            subcommandGroup
                .setName('channel')
                .setDescription('Manage sending channel settings.')
                .setDescriptionLocalizations({
                    ja: 'Tipsの送信されるチャンネルを設定します。'
                })
                .addSubcommand(subcommand => // channel list
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
                                .setRequired(false)
                                .setAutocomplete(true)
                        )
                )
                .addSubcommand(subcommand => // channel add
                    subcommand
                        .setName('add')
                        .setDescription('add a channel to send tips to.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsを送信するチャンネルを追加します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Select the group to add the channel to.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信するチャンネルを追加するTipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addChannelOption(option =>
                            option
                                .setName('channel')
                                .setDescription('Enter the channel to send tips to.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信するチャンネルを入力してください。'
                                })
                                .setRequired(false)
                        )
                        .addNumberOption(option =>
                            option
                                .setName('interval')
                                .setDescription('Specify tip interval; default is 10 minutes.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信する間隔を分単位で入力してください。指定がない場合、10分になります。'
                                })
                                .setRequired(false)
                                .setMinValue(1)
                                .setMaxValue(1440)
                        )
                        .addStringOption(option =>
                            option
                                .setName('format')
                                .setDescription('Specify tip format; default is "&b&l[tips]".')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信する形式を入力してください。指定がない場合、"&b&l[tips]"になります。'
                                })
                                .setRequired(false)
                        )
                )
                .addSubcommand(subcommand => // channel remove
                    subcommand
                        .setName('remove')
                        .setDescription('Remove a channel from sending tips.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsを送信するチャンネルを削除します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Select the group to remove the channel from.')
                                .setDescriptionLocalizations({
                                    ja: 'Tipsを送信するチャンネルを削除するTipsグループを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('channel')
                                .setDescription('Select the channel to remove.')
                                .setDescriptionLocalizations({
                                    ja: '削除するTipsを送信するチャンネルを選択してください。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                )
                .addSubcommand(subcommand => // channel edit
                    subcommand
                        .setName('edit')
                        .setDescription('Edit a channel settings.')
                        .setDescriptionLocalizations({
                            ja: 'Tipsを送信するチャンネルを編集します。'
                        })
                        .addStringOption(option =>
                            option
                                .setName('channel')
                                .setDescription('Choose channel to edit. The second option, Group, helps narrow your selection.')
                                .setDescriptionLocalizations({
                                    ja: '編集するチャンネルを選択してください。2つ目の選択肢でグループを選択すると、絞り込みができます。'
                                })
                                .setRequired(true)
                                .setAutocomplete(true)
                        )
                        .addStringOption(option =>
                            option
                                .setName('group')
                                .setDescription('Choose the Tips group for the editing channel. If not chosen, all Tips groups will be affected.')
                                .setDescriptionLocalizations({
                                    ja: '編集するチャンネルが属すTipsグループを選択してください。選択しない場合、全てのTipsグループが対象になります。'
                                })
                                .setRequired(false)
                                .setAutocomplete(true)
                        )
                )
        )
        .addSubcommand(subcommand => // add
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
        .addSubcommand(subcommand => // remove
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
        .addSubcommand(subcommand => // edit
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
        .addSubcommand(subcommand => // list
            subcommand
                .setName('list')
                .setDescription('List tips.')
                .setDescriptionLocalizations({
                    ja: 'Tipsを一覧表示します。'
                })
        )
        .addSubcommand(subcommand => // preview
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
        switch(interaction.options.getSubcommandGroup()) {
            case 'group':
                switch(interaction.options.getSubcommand()) {
                    case 'create':
                        logger.trace("[SlashCommand] tips.js: group.create");
                        tipsModule.group.create(interaction, client);
                        break;
                    case 'delete':
                        logger.trace("[SlashCommand] tips.js: group.delete");
                        tipsModule.group.delete(interaction, client);
                        break;
                    case 'rename':
                        logger.trace("[SlashCommand] tips.js: group.rename");
                        tipsModule.group.rename(interaction, client);
                        break;
                    case 'list':
                        logger.trace("[SlashCommand] tips.js: group.list");
                        tipsModule.group.list(interaction, client);
                        break;
                }
                break;
            case 'channel':
                switch(interaction.options.getSubcommand()) {
                    case 'list':
                        logger.trace("[SlashCommand] tips.js: channel.list");
                        tipsModule.channel.list(interaction, client);
                        break;
                    case 'add':
                        logger.trace("[SlashCommand] tips.js: channel.add");
                        tipsModule.channel.add(interaction, client);
                        break;
                    case 'remove':
                        logger.trace("[SlashCommand] tips.js: channel.remove");
                        tipsModule.channel.remove(interaction, client);
                        break;
                    case 'edit':
                        logger.trace("[SlashCommand] tips.js: channel.edit");
                        tipsModule.channel.edit(interaction, client);
                        break;
                }
                break;
            case null://グループなし(=tips)
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
                break;
            default://形式が不正
                interaction.reply({
                    content: 'コマンドの形式が不正です。\n管理者に問い合わせてください。',
                    ephemeral: true
                });
                logger.error('tips.js: default: コマンドの形式が不正です。SubCmdGroup:' + interaction.options.getSubcommandGroup() + ', SubCmd:' + interaction.options.getSubcommand());
                throw_webhook('error', 'tips.js', 'コマンドの形式が不正です。SubCmdGroup:' + interaction.options.getSubcommandGroup() + ', SubCmd:' + interaction.options.getSubcommand());
                break;
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
        return;
    }
}    
