const throw_webhook = require('../../function/throw_webhook.js');
const ServerLogChannelFinder = require('./ServerLogChannelFinder.js');
const LogDMsender = require('./VoiceChat/LogDMsender.js');
const nplogger = require('../../nullpo/log/logger.js');
/**
 * VCへの入退室を検知し、ログの出力や入退室の間隔の確認を行う
 * @param {Discord.Client} client 
 * @param {Discord.VoiceState} oldState 
 * @param {Discord.VoiceState} newState 
 * @return {undefined}
 */
async function VCJoinLeaveCheck(client, oldState, newState){//type: "join", "leave" or "move"
    logger.trace("[Components] VCJoinLeaveCheck.js");
    const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
    const userid = newState.member.user.id;
    const oldChannelID = oldState.channelId ?? null;
    const newChannelID = newState.channelId ?? null;
    const oldIgnore = oldState.channel == null ? null : (oldState.channel.type == 13/*GUILD_STAGE_VOICE*/ || oldState.channel.name.includes("非表示"));//ステージチャンネル、非表示と名前にあるチャンネルを無視
    const newIgnore = newState.channel == null ? null : (newState.channel.type == 13/*GUILD_STAGE_VOICE*/ || newState.channel.name.includes("非表示"));//ステージチャンネル、非表示と名前にあるチャンネルを無視

    //  logger.trace(oldIgnore + " " + newIgnore) //デバッグ用

    let type, logChannel, embed;
    if(oldChannelID == null && newChannelID != null) type = "join";
    else if(oldChannelID != null && newChannelID == null) type = "leave";
    else if(oldChannelID != null && newChannelID != null) type = "move";//ごみこーど

    logger.trace(`[VC] ${type} ${userid} ${oldChannelID} -> ${newChannelID}`);
    if(oldChannelID == null && newChannelID == null) return;//ないとは思うがどちらもnullなら無視
    if(oldChannelID == newChannelID) return;//移動してないので無視 カメラ起動やミュート切り替えなどを条件に使う場合このif文を使う

    logger.trace("[Components] VCJoinLeaveCheck.js: switch " + type);
    switch(type){
        case "join":
            nplogger("join");
            logChannel = ServerLogChannelFinder(client, newState, "VC入退室ログ");
            embed = {
                color: 0x00CC00,
                description: `<#${newChannelID}> に**参加**しました`,
                author: {
                    name: member_with_nick(newState),
                    icon_url: newState.member.displayAvatarURL(),
                },
                fields: [{
                name: '日付',
                value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
            }]};
            if(logChannel != null){
                logChannel.send({embeds: [embed]});
            }

            publicLogChannel = ServerLogChannelFinder(client, newState, "vc入退室log");
            if(!(publicLogChannel == null || newIgnore)) {
                const message = logMessageCreate(oldState, newState, "join");
                publicLogChannel.send(message);
                LogDMsender(client, oldState, newState, message);
            }
            break;
        case "leave":
            nplogger("leave");
            logChannel = ServerLogChannelFinder(client, oldState, "VC入退室ログ");
            embed = {
                color: 0xCC0000,
                description: `<#${oldChannelID}> から**退出**しました`,
                author: {
                    name: member_with_nick(oldState),
                    icon_url: oldState.member.displayAvatarURL(),
                },
                fields: [{
                name: '日付',
                value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
            }]};
            if(logChannel != null) {
                logChannel.send({embeds: [embed]});
            }

            publicLogChannel = ServerLogChannelFinder(client, oldState, "vc入退室log");
            if(!(publicLogChannel == null || oldIgnore)) {
                const message = logMessageCreate(oldState, newState, "leave");
                publicLogChannel.send(message);
                LogDMsender(client, oldState, newState, message);
            }
            break;
        case "move":
            nplogger("move");
            logChannel = ServerLogChannelFinder(client, newState, "VC入退室ログ");
            embed = {
                color: 0x0000CC,
                description: `<#${oldChannelID}> から <#${newChannelID}> に**移動**しました`,
                author: {
                    name: member_with_nick(newState),
                    icon_url: newState.member.displayAvatarURL(),
                },
                fields: [{
                name: '日付',
                value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
            }]};
            if(logChannel == null) {
                logChannel.send({embeds: [embed]});
            }

            publicLogChannel = ServerLogChannelFinder(client, newState, "vc入退室log");
            if(!(publicLogChannel == null)) {
                let message = "",membercount = "";//ステージチャンネルからの出入りを無かったことにする
                if(newIgnore && oldIgnore) break;//ステージチャンネルからステージチャンネルへの移動は無視
                if(oldIgnore) {//ステージ→ボイス 入室
                    message = logMessageCreate(oldState, newState, "join");
                } else if(newIgnore) {//ボイス→ステージ 退室
                    message = logMessageCreate(oldState, newState, "leave");
                } else { //ボイス→ボイス 移動
                    message = logMessageCreate(oldState, newState, "move");
                }
                publicLogChannel.send(message);
                LogDMsender(client, oldState, newState, message);
            }
            break;
        default:
            break;
    }

    
}

/**
 * VoiceStateからニックネームを考慮した文字列を返す
 * @param {Discord.VoiceState} State 
 * @example taku1417 (tk) | taku1417
 * @return {string}
 * @private
 */
function member_with_nick(State){
    logger.trace("[Components] VCJoinLeaveCheck.js: member_with_nick");
    if(State.member.user.globalName != null) {
        return State.member.nickname != null ? (State.member.user.username + ' (' + State.member.displayName + ')') : (State.member.user.username + '(' + State.member.user.globalName + ')');
    } else { 
        return State.member.nickname != null ? (State.member.user.username + ' (' + State.member.displayName + ')') : State.member.user.username; 
    }//globalName = ユーザー表示名 / nickname = サーバー表示名
}

/**
 * discordのマークダウン記法に使われる文字をエスケープする
 * @param {String} text 
 * @example taku1417_s -> taku1417\_s | __taku1417__ -> \_\_taku1417\_\_
 * @return {String} escaped text
 * @private
 */
function markdownEscape(text){
    logger.trace("[Components] VCJoinLeaveCheck.js: markdownEscape");
    return text.replace(/([\\*_\-#<>\|~])/g, '\\$1');
}

/**
 * vc入退室logチャンネルへ送信するメッセ―ジを返す
 * @param {Discord.VoiceState} oldState
 * @param {Discord.VoiceState} newState
 * @param {String} type
 * @return {String} message
 * @private
 */
function logMessageCreate(oldState, newState, type){
    logger.trace("[Components] VCJoinLeaveCheck.js: logMessageCreate");
    let membercount = "";
    switch(type){
        case "join":
            membercount = "現在、" + newState.channel.members?.size + "人が参加中です。";
            return newState.channel.name + " に " + markdownEscape(member_with_nick(newState)) + " さんが参加しました。\n" + membercount;
        case "leave":
            if(oldState.channel.members?.size >= 1){
                membercount = "現在、" + (oldState.channel.members?.size) + "人が参加中です。";
            } else {
                membercount = "誰も居なくなったようです。";
            }
            return oldState.channel.name + " から " + markdownEscape(member_with_nick(oldState)) + " さんが退出しました。\n" + membercount;
        case "move":
            membercount = "現在、" + newState.channel.members?.size + "人が参加中です。";
            return oldState.channel.name + " から " + newState.channel.name + " へ " + markdownEscape(member_with_nick(newState)) + " さんが移動しました。\n" + membercount;
    }
}

module.exports = VCJoinLeaveCheck;