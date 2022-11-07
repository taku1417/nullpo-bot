const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES]});

function voiceInOut(oldState, newState) {
        const channeljllog = client.channels.cache.get(tex_jllog), channelatumare = oldState.member.guild.channels.cache.get(vc_atumare), channelvcpjsekai = oldState.member.guild.channels.cache.get(vc_pjsekai), channelapex = oldState.member.guild.channels.cache.get(vc_apex),channelmusic = oldState.member.guild.channels.cache.get(vc_music),Ochanneljihou = oldState.member.guild.channels.cache.get(tex_jihou),channelpjsekai = oldState.member.guild.channels.cache.get(tex_pjsekai),channelspla = oldState.member.guild.channels.cache.get(vc_spla);
        if (oldState.channelId === null && newState.channelId === vc_atumare) {
                logger("join");
                channelatumare.send(`__**参加** ${oldState.member.displayName} さんが入室しました。__`);
                Ochanneljihou.send(`**参加** 🌸あつまれVCに${oldState.member.displayName} さんが入室しました。`);
                return channeljllog.send(`**参加** 🌸あつまれVCに${oldState.member.displayName} さんが入室しました。`);
        }
        else if (oldState.channelId === null && newState.channelId === vc_pjsekai) {
                logger("join");
                channelpjsekai.send(`__**参加** ${oldState.member.displayName} さんが入室しました。__`);
                channelvcpjsekai.send(`__**参加🎼** ${oldState.member.displayName} さんが入室しました。__`);
                //Ochanneljihou.send(`**参加🎼** プロセカルームに${oldState.member.displayName} さんが入室しました。`);
                return channeljllog.send(`**参加🎼** プロセカルームに${oldState.member.displayName} さんが入室しました。`);
        }
        else if (oldState.channelId === null && newState.channelId === vc_spla) {
                logger("join");
                channelspla.send(`__**参加** ${oldState.member.displayName} さんが入室しました。__`);
                Ochanneljihou.send(`**参加🦑** スプラキッズに${oldState.member.displayName} さんが入室しました。`);
                return channeljllog.send(`**参加🦑** スプラキッズに${oldState.member.displayName} さんが入室しました。`);
        }
        else if (oldState.channelId === null && newState.channelId === vc_apex) {
                logger("join");
                channelapex.send(`__**参加💥** ${oldState.member.displayName} さんが入室しました。__`);
                Ochanneljihou.send(`**参加💥** APEXルームに${oldState.member.displayName} さんが入室しました。`);
                return channeljllog.send(`**参加💥** APEXルームに${oldState.member.displayName} さんが入室しました。`);
        }
        else if (oldState.channelId === null && newState.channelId === vc_music) {
                logger("join");
                channelmusic.send(`__**参加♪** ${oldState.member.displayName} さんが入室しました。__`);
                Ochanneljihou.send(`**参加♪** 音楽鑑賞に${oldState.member.displayName} さんが入室しました。`);
                return channeljllog.send(`**参加♪** 音楽鑑賞に${oldState.member.displayName} さんが入室しました。`);
        }
        else if (oldState.channelId === (vc_pjsekai || vc_spla || vc_apex || vc_music) && newState.channelId === vc_atumare) {
                logger("move");
                channelatumare.send(`__**移動🌸** ${oldState.member.displayName} さんが🌸あつまれVCに移動しました。__`);
                Ochanneljihou.send(`**移動🌸** ${oldState.member.displayName} さんが🌸あつまれVCに移動しました。`);
                return channeljllog.send(`**移動🌸** ${oldState.member.displayName} さんが🌸あつまれVCに移動しました。`);
        }
        else if (oldState.channelId === (vc_atumare || vc_spla || vc_apex || vc_music) && newState.channelId === vc_pjsekai) {
                logger("move");
                channelpjsekai.send(`__**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。__`);
                channelvcpjsekai.send(`__**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。__`);
                Ochanneljihou.send(`**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。`);
                return channeljllog.send(`**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。`);
        }
        else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_apex || vc_music) && newState.channelId === vc_spla) {
                logger("move");
                channelspla.send(`__**移動🦑** ${oldState.member.displayName} さんがスプラキッズに移動しました。__`);
                Ochanneljihou.send(`**移動🦑** ${oldState.member.displayName} さんがスプラキッズに移動しました。`);
                return channeljllog.send(`**移動🦑** ${oldState.member.displayName} さんがスプラキッズに移動しました。`);
        }
        else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_music) && newState.channelId === vc_apex) {
                logger("move");
                channelapex.send(`__**移動💥** ${oldState.member.displayName} さんがAPEXルームに移動しました。__`);
                Ochanneljihou.send(`**移動💥** ${oldState.member.displayName} さんがAPEXルームに移動しました。`);
                return channeljllog.send(`**移動💥** ${oldState.member.displayName} さんがAPEXルームに移動しました。`);
        }
        else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex) && newState.channelId === vc_music) {
                logger("move");
                channelmusic.send(`__**移動♪** ${oldState.member.displayName} さんが音楽鑑賞に移動しました。__`);
                Ochanneljihou.send(`**移動♪** ${oldState.member.displayName} さんが音楽鑑賞に移動しました。`);
                return channeljllog.send(`**移動♪** ${oldState.member.displayName} さんが音楽鑑賞に移動しました。`);
        }
        else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_music) && newState.channelId === null) {
                logger("leave");
                channeljllog.send(`**退出:x:**  ${newState.member.displayName} さんが退出しました。`);
                //Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが退出しました。`);
                switch (oldState.channelId) {
                        case vc_atumare:
                                channelatumare.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
                                Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが🌸あつまれVCから退出しました。`);
                                break;
                        case vc_pjsekai:
                                channelvcpjsekai.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
                                channelpjsekai.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
                                break;
                        case vc_spla:
                                channelspla.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
                                Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんがスプラキッズから退出しました。`);
                                break;
                        case vc_apex:
                                channelapex.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
                                Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんがAPEXルームから退出しました。`);
                                break;
                        case vc_music:
                                channelmusic.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
                                Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが音楽鑑賞から退出しました。`);
                                break;
                        default:
                                break;
                }
        }
}

module.exports = voiceInOut;