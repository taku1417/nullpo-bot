const logger = require('../../log/logger.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const query_execute = require('../../../nullpoweb.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('query_throw')
        .setDescription('クエリ操作をテストします。管理者のみ使用可能です。')
        .setDefaultMemberPermissions(0)
        .addStringOption(option => option.setName('query').setDescription('クエリを入力してください。').setRequired(true)),
    async execute(interaction) {
        logger("command");
        var query_result;
        try {
            query_result = String(throw_query(interaction.options.getString('query')));
        } catch (e) {
                'クエリが正常に実行されませんでした。'
                console.error(e);
        }
        await interaction.reply({
            content: query_result,
            ephemeral: true
        });
    },
};

async function throw_query (query) {
    var reply_message = '';
    setTimeout(() => {
        query_execute(query);
        if (code >= 1) {
            console.error("\n\n[query] query error", err);
            reply_message = err;
        } else {
            console.log(result);
		    reply_message = result;
        }
    }, 3000);
    return reply_message;
}
