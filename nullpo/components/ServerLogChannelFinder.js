/**
 * stateのサーバー内から特定の名前のチャンネルを探す stateを使わずに直接サーバーIDを指定する場合はstateにnullを渡す
 * @param {Discord.Client} client
 * @param {string} channelName
 * @param {Discord.VoiceState} state
 * @param {string} directServerID
 * @return {Discord.Channel}
 */
function ServerLogChannelFinder(client, state, channelName, directServerID){
    let serverID;
    if(state != null) {
        serverID = state.guild.id;
    } else {
        serverID = directServerID;
    }
    return client.guilds.cache.get(serverID).channels.cache.find(ch => ch.name == channelName) ?? null;
}

module.exports = ServerLogChannelFinder;