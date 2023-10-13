const { ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new ButtonBuilder()
        .setCustomId('moncard_DBregi_no')
        .setLabel('いいえ')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true),
    async execute(interaction, client) {
       interaction.reply({
              content: "登録処理をキャンセルしました。",
              ephemeral: true,
              fetchReply: true
       })
    }
};

// todo: ボタンを持つメッセージのinteraction発行者のdiscordのidをkey,ボタンを持つメッセージのidをvalueとして変数に格納しておいて、ここでfetchする キャンセルだからボタンを削除した上でメッセージを編集する形で伝える 変数からは削除