const logger = require('../../log/logger.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const dbclient = require('../../Built-inModule/database/index.js');
const throw_webhook = require('../../../function/throw_webhook.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('query_throw')
        .setDescription('クエリ操作をテストします。管理者のみ使用可能です。')
        .setDefaultMemberPermissions(0)
        .addStringOption(option => option.setName('query').setDescription('クエリを入力してください。').setRequired(true)),
    async execute(interaction) {
        await interaction.reply({
            content: 'クエリを実行しています。しばらくお待ちください。',
            ephemeral: true,
            fetchReply: true
        });
        logger("command");
        await dbclient.connection(interaction.options.getString('query')).then(async res => {
            const res_json = JSON.stringify(res);
            if(interaction.replied || interaction.deferred) {
                console.log(res);
                if(res == undefined) {
                    await interaction.editReply({
                        content: "クエリを実行しましたが、結果はありませんでした。INSERTなどは戻り値がありません。",
                        ephemeral: true,
                        fetchReply: true
                    });
                } else {
                    await interaction.editReply({
                        content: res_json,
                        ephemeral: true,
                        fetchReply: true
                    });
                }
            } else {
                if(res == undefined) {
                    await interaction.reply({
                        content: "クエリを実行しましたが、結果はありませんでした。INSERTなどは戻り値がありません。",
                        ephemeral: true,
                        fetchReply: true
                    });
                } else {
                    await interaction.reply({
                        content: res_json,
                        ephemeral: true,
                        fetchReply: true
                    });
                }
            }
        });
    }
};
