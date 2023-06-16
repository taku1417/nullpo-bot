async function VCJoinLeaveCheck(client, oldState, newState){//type: "join", "leave" or "move"
    const userid = newState.member.user.id;
    const oldChannelID = oldState.channelId ?? null;
    const oldChannelName = oldState.channelId ? oldState.channel.name : null;
    const newChannelID = newState.channelId ?? null;
    const newChannelName = newState.channelId ? newState.channel.name : null;
    let type;
    if(oldChannelID == null && newChannelID != null) type = "join";
    else if(oldChannelID != null && newChannelID == null) type = "leave";
    else if(oldChannelID != null && newChannelID != null) type = "move";//ごみこーど

    console.log(`[VC] ${type} ${userid} ${oldChannelID} -> ${newChannelID}`);
    if(newState.member.user.bot) return;//botは無視
    if(oldChannelID == newChannelID) return;//移動してないので無視 カメラ起動やミュート切り替えなどを条件に使う場合このif文を使う

    /* メモ
    *  サーバーを超える移動はmoveにならず、leave -> joinになる 
    *  短時間であればサーバーを超える移動をmoveにするという処理を追加する必要がありそう
    */
    switch(type){
        case "join":
            const logChannel = ServerLogChannelFinder(client, newState) ?? null;
            if(logChannel == null) return;
            logChannel.send(`${member_with_nick(newState)} が ${newChannelName} に参加しました`);
            console.log("member.user.tag  " + newState.member.user.tag + "  member.username  " + newState.member.user.username + "  member.nickname  " + newState.member.globalName + "\nmember[]  " + newState.member.user);
            break;
        case "leave":
            break;
        case "move":
            break;
        default:
            break;
    }
}

function ServerLogChannelFinder(client, State){//各種ログというチャンネルを探す、clientが必要
    const serverID = State.guild.id;
    return client.guilds.cache.get(serverID).channels.cache.find(ch => ch.name == "各種ログ") ?? null;
}

function member_with_nick(State){
    if (State.member.user.tag.split('#')[1] == "0") {
        return State.member.nickname != null ? (State.member.user.username + ' (' + State.member.displayName + ')') : State.member.user.username;//ID+タグとIDのみが混在するため、とりあえずの対策。移行済みのユーザーはユーザーネームのみになる。グローバル表示名を考慮する必要もあるが、14.11.0時点で未実装。devにはあるため、stableへの実装待ち。
    } else {
        return State.member.nickname != null ? (State.member.user.tag + ' (' + State.member.displayName + ')') : State.member.user.tag;
    }
}

module.exports = VCJoinLeaveCheck;