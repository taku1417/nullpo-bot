const logger = require('../log/logger.js');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const dbclient = require('../Built-inModule/database/index.js');
const throw_webhook = require('../../function/throw_webhook.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('所持コイン数を表示します。')
        .addUserOption(option => option
            .setName('user')
            .setDescription('所持コイン数を表示したいユーザーを選択してください。')),
    async execute(interaction, client) {
        logger('command');
        if(interaction.options.getUser('user') && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            await interaction.reply({
                content: '他ユーザーのコイン数の表示は管理者のみ使用可能です。',
                ephemeral: true
            });
            return;
        }
        const user = interaction.options.getUser('user') ?? interaction.user;
        const userId = user.id;
        const member_with_nick = user.globalName ? (user.username + '(' + user.globalName + ')') : user.username;
        dbclient.connection(`SELECT * FROM coins WHERE id = '${userId}'`).then(async res => {
            if(res.length == 0) {
                await interaction.reply({
                    content: 'ユーザーが見つかりませんでした。ユーザーが所持しているコイン数は0です。',
                    ephemeral: true
                });
                dbclient.connection(`INSERT INTO coins (id) VALUES ('${userId}')`).then(() => {
                    console.log(member_with_nick + ' さんを追加しました。');
                });
                return;
            }
            const coin = res[0].amount;
            await interaction.reply({
                content: `<@${userId}>さんの所持コイン数は${coin}です。`,
                ephemeral: true
            });
        });
    }    
};