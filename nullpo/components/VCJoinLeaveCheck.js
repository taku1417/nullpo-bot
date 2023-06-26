const ServerLogChannelFinder = require('./ServerLogChannelFinder.js');
/**
 * VCへの入退室を検知し、ログの出力や入退室の間隔の確認を行う
 * @param {Discord.Client} client 
 * @param {Discord.VoiceState} oldState 
 * @param {Discord.VoiceState} newState 
 * @return {undefined}
 */
async function VCJoinLeaveCheck(client, oldState, newState){//type: "join", "leave" or "move"
    const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
    const userid = newState.member.user.id;
    const oldChannelID = oldState.channelId ?? null;
    const oldChannelName = oldState.channelId ? oldState.channel.name : null;
    const newChannelID = newState.channelId ?? null;
    const newChannelName = newState.channelId ? newState.channel.name : null;
    let type, logChannel, embed;
    if(oldChannelID == null && newChannelID != null) type = "join";
    else if(oldChannelID != null && newChannelID == null) type = "leave";
    else if(oldChannelID != null && newChannelID != null) type = "move";//ごみこーど

    console.log(`[VC] ${type} ${userid} ${oldChannelID} -> ${newChannelID}`);
    if(oldChannelID == newChannelID) return;//移動してないので無視 カメラ起動やミュート切り替えなどを条件に使う場合このif文を使う

    /* メモ
    *  サーバーを超える移動はmoveにならず、leave -> joinになる 
    *  短時間であればサーバーを超える移動をmoveにするという処理を追加する必要がありそう
    */
    switch(type){
        case "join":
            logChannel = ServerLogChannelFinder(client, newState, "VC入退室ログ");
            if(logChannel == null) break;
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
            logChannel.send({embeds: [embed]});
            break;
        case "leave":
            logChannel = ServerLogChannelFinder(client, oldState, "VC入退室ログ");
            if(logChannel == null) break;
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
            logChannel.send({embeds: [embed]});
            break;
        case "move":
            logChannel = ServerLogChannelFinder(client, newState, "VC入退室ログ");
            if(logChannel == null) break;
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
            logChannel.send({embeds: [embed]});
            break;
        default:
            break;
    }
}

/**
 * VoiceStateからニックネームを考慮した文字列を返す 
 * @param {Discord.VoiceState} State 
 * @example taku1417 (tk) | taku1417#3456 (tk)
 * @return {string}
 * @private
 */
function member_with_nick(State){
    if (State.member.user.tag.split('#')[1] == "0") {
        return State.member.nickname != null ? (State.member.user.username + ' (' + State.member.displayName + ')') : State.member.user.username;//ID+タグとIDのみが混在するため、とりあえずの対策。移行済みのユーザーはユーザーネームのみになる。グローバル表示名を考慮する必要もあるが、djs@14.11.0時点で未実装。devにはあるため、stableへの実装待ち。
    } else {
        return State.member.nickname != null ? (State.member.user.tag + ' (' + State.member.displayName + ')') : State.member.user.tag;
    }
}

module.exports = VCJoinLeaveCheck;