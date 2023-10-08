const axios = require('axios');
const config = require('config');

function throw_webhook (type, location, content, extra) {
    let webhook_url;
    type = type != "" ? type.toLowerCase() : "error";
    switch (type) {
        case 'error': //content=error message
            webhook_url = (process.env.NODE_ENV === 'heroku') ? process.env.WEBHOOK_ERROR : config.get('WEBHOOK.ERROR');
            axios.post(webhook_url, {
                value1: location ?? "不明",
                value2: content ?? "不明",
                value3: extra ?? "なし"
            }).then((res) => {
                logger.info("[throwWebhook] " + res.data);
            }
            ).catch((error) => {
                logger.error("[throwWebhook] webhookの送信に失敗しました。\n\n" + error);
            });
            break;
    }
}

module.exports = throw_webhook;

