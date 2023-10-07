const axios = require('axios');
const config = require('config');

declare class WebhookThrowBuilder {
    readonly type: string | null;
    readonly location: string | null;
    readonly content: string | null;
    readonly extra: string | null;
    setType(type: string | null): this
    setLocation(location: string | null): this;
    setContent(content: string | null): this;
    setExtra(extra: string | null): this;
}
function ThrowWebhook(WebhookThrowBuilder: WebhookThrowBuilder) {
    const webhookUrl:string = (process.env.NODE_ENV === 'heroku') ? String(process.env.WEBHOOK_ERROR) : config.get('WEBHOOK.ERROR');
    const data = {
        value1: WebhookThrowBuilder.location ?? "不明",
        content: WebhookThrowBuilder.content ?? "不明",
        extra: WebhookThrowBuilder.extra ?? "なし"
    }
    axios.post(webhookUrl, data)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
    });
}
export { WebhookThrowBuilder, ThrowWebhook };