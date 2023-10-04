const logger = require('../../log/logger.js');
const dbclient = require('../../Built-inModule/database/index.js');
const { GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const e = require('express');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('デイリーコインを受け取ります。'),
    async execute(interaction) {
        logger("command");
        const userId = interaction.user.id;
        dbclient.connection(`SELECT * FROM coins WHERE id = '${userId}'`).then(async res => {
            if(res.length == 0) {// = 該当ユーザーが存在しない
                dbclient.connection(`INSERT INTO coins (id) VALUES ('${userId}')`).then(() => {
                    console.log(interaction.user.username + ' さんをcoinsテーブルに登録しました。');
                });
            }
            priviousDaily = res[0].daily;
            console.log(priviousDaily);
            if(priviousDaily == null || CheckDaily(priviousDaily)) {// 今日受け取ってないかを確認
                const coin = parseFloat(res[0].amount) + Math.floor(Math.random() * (global_settings.coin_max - global_settings.coin_min)) + global_settings.coin_min;
                dbclient.connection(`UPDATE coins SET (daily,amount) = (now(),${coin}) WHERE id = '${userId}'`)
                .then(() => {
                    console.log(interaction.user.username + ' さんがデイリーコインを受け取りました。');
                    interaction.reply({
                        embeds: [{
                            title: "デイリーコインを受け取りました！",
                            description: ":coin:**" + parseFloat(res[0].amount) + "** → :coin:**" + coin + "** (+**" + (coin - parseFloat(res[0].amount)) + "**)",
                            color: 0x00ff00
                        }],
                        ephemeral: true
                    });
                })
                .catch();// エラー時に受け取れないようにするためのcatch
            } else {
                interaction.reply({
                    embeds: [{
                        title: "既に受け取っているようです。",
                        description: "明日以降、再度お試しください。",
                        color: 0xFF0000
                    }],
                    ephemeral: true
                });
            }
        });
    },
};

/**
 * 第一引数が昨日以前の日付かどうかを確認する
 * @param {Date|String} priviousDaily 
 * @returns {boolean}
 * @private
 */
function CheckDaily(priviousDaily){
    const priviousdate = Date.parse(priviousDaily);
    const nowDate = new Date();
    const today = Date.parse(nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + ' 00:00:00');
    console.log((priviousdate + ' < ' + today + ' = ') + (priviousdate < today));
    return priviousdate < today;
}
//priviousDailyの日付が昨日以前のものなら受け取れる、という処理を組み込む