const nplogger = require('../log/logger.js');
const { SlashCommandBuilder, PermissionsBitField, ChatInputCommandInteraction, Client } = require('discord.js');
const dbclient = require('../Built-inModule/database/index.js');
const throw_webhook = require('../../function/throw_webhook.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('所持コイン数を表示します。')
        .addUserOption(option => option
            .setName('user')
            .setDescription('所持コイン数を表示したいユーザーを選択してください。')),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        logger.trace("[SlashCommand] coin.js");
        nplogger('command');
        if(interaction.options.getUser('user') && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {// ユーザー指定あり、かつサーバー管理の権限なし => 使用不可
            await interaction.reply({
                content: '他ユーザーのコイン数の表示は管理者のみ使用可能です。',
                ephemeral: true
            });
            return;
        }
        const user = interaction.options.getUser('user') ?? interaction.user;
        const userId = user.id;
        const member_with_nick = user.globalName ? (user.username + '(' + user.globalName + ')') : user.username;
        const res = await dbclient.connection(`SELECT * FROM coins WHERE id = '${userId}'`);
        if(res.length == 0) {// = 該当ユーザーが存在しない
            if(interaction.options.getUser('user')){// ユーザー指定ありなら追加しない
                await interaction.reply({
                    content: 'ユーザーが見つかりませんでした。',
                    ephemeral: true
                });
                return;
            } else {
                await interaction.reply({
                    content: 'ユーザーが見つかりませんでした。coinsテーブルに追加します。',
                    ephemeral: true
                });
                dbclient.connection(`INSERT INTO coins (id) VALUES ('${userId}');`).then(() => {
                    logger.info(member_with_nick + ' さんをcoinsテーブルに登録しました。');
                });
                return;
            }
        }
        const coin = res[0].amount;//複数居ないが、一応
        await interaction.reply({
            content: `<@${userId}>さんの所持コイン数は${coin}です。`,
            ephemeral: true
        });
        return;
    }
}    
