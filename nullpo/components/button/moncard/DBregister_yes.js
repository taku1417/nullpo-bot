const { ButtonBuilder, ButtonStyle } = require("discord.js");
const { object } = require("promisify");

module.exports = {
    data: new ButtonBuilder()
        .setCustomId('moncard_DBregi_yes')
        .setLabel('はい')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true),
    async execute(interaction, client) {
        const registing = db_regist.find(object => object.did == interaction.member.id);
        if(registing == undefined) {
            interaction.reply({
                content: "何らかの理由で登録処理がキャンセルされました。もう一度やり直してください。",
                ephemeral: true,
                fetchReply: true
            });
        } else {
            //registing.msgid
        }
    }
}
