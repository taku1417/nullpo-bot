/**
 * stateのサーバー内から特定の名前のチャンネルを探す stateを使わずに直接サーバーIDを指定する場合はstateにnullを渡す必要がある 複数見つかった場合、最初のチャンネルを返す
 * @param {Discord.Client} client
 * @param {Discord.VoiceState} state
 * @param {string} channelName
 * @param {string} ServerID
 * @return {Discord.Channel}
 */
function ServerLogChannelFinder(client, state, channelName, ServerID){
    logger.trace("[Components] ServerLogChannelFinder.js");
    let serverID;
    if(state != null) {
        serverID = state.guild.id;
    } else {
        serverID = ServerID;
    }
    return client.guilds.cache.get(serverID).channels.cache.find(ch => ch.name == channelName) ?? null;
}

module.exports = ServerLogChannelFinder;