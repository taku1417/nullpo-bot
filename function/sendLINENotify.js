const axios = require('axios');
const config = require('config');
const nplogger = require('../nullpo/log/logger.js');
const { BaseInteraction } = require('discord.js');

/**
 * LINE notifyを使いユーザーにメッセージを送信する。
 * @param {String} type 
 * @param {BaseInteraction|null} interaction 
 * @param {String} content
 * @returns {Boolean} result
 */
function sendLINENotify (type, interaction, content) {
    logger.trace("[sendLINENotify] executing...");
    const notifyBASEURL = "https://notify-api.line.me/api/notify";
    type = type != "" ? type.toLowerCase() : "error";
    switch (type) {
        case 'error': //content=error message
            logger.trace("[sendLINENotify] switch: error");
            const token = (process.env.NODE_ENV === 'heroku') ? process.env.LINE_NOTIFY_TOKEN : config.get('LINE_NOTIFY_TOKEN.taku1417');
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            };
            const params = new URLSearchParams();
            params.append('message', content);
            axios.post(notifyBASEURL, params, { headers: headers })
            .then((res) => {
                logger.info("[sendLINENotify] " + res.data);
            })
            .catch((error) => {
                logger.error("[sendLINENotify] LINE notifyの送信に失敗しました。\n\n" + error);
            });
            break;
    }
    logger.trace("[sendLINENotify] ended.");
}

module.exports = sendLINENotify;

sendLINENotify("VClog", null, "test message.");
