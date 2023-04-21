const logger = require('../../log/logger.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const query_execute = require('../../events/database_connection.js');


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
            query_result = String(throw_query(interaction.options.getString('query')))
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
    reply_message = '';
    await dbclient.connect().catch(err => {reply_message = err; console.error("\n\n[query] dbclient connect error", err);});
    await dbclient.query(query, (err, result) => {
        if (err) {
            console.error("\n\n[query] query error", err);
            reply_message = err;
        } else {
            console.log(result);
			reply_message = result;
        }
    });
    await setTimeout(() => {}, 3000);
    await dbclient.release;
    return reply_message;
}
