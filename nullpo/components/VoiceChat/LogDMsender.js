const config = require("config");
const VCNoticeRole = process.env.NODE_ENV === 'heroku' ? process.env.VC_NOTICE_ROLE : config.get("VC_NOTICE_ROLE");

/**
 * メッセージを特定ロールが付くユーザーにDMで送信する VCログ用 将来的にデータベースで管理するようにする
 * @param {Discord.Client} client 
 * @param {Discord.VoiceState} oldState 
 * @param {Discord.VoiceState} newState
 * @param {string} message
 * @return {undefined}
 */
function LogDMsender(client, oldState, newState, message){
    if(oldState.guild.id == '979084665958834216' || newState.guild.id == '979084665958834216') return;//debug鯖を除外
    client.guilds.cache.get('1015585928779137105').roles.cache.get(VCNoticeRole).members.forEach(member => member.send(message));
}

module.exports = LogDMsender;