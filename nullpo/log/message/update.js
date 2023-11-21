const nplogger = require('../logger.js');
const ServerLogChannelFinder = require('../../components/ServerLogChannelFinder.js');
const { EmbedBuilder } = require('discord.js');
const throw_webhook = require('../../../function/throw_webhook.js');
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',nullpo_debug_server_id = '979084665958834216';
/**
 * メッセージの編集をログに記録する
 * @param {Discord.Client} client 
 * @param {Discord.Message} oldMessage 
 * @param {Discord.Message} newMessage 
 * @returns 
 */
function MessageUpdateLogger(client, oldMessage, newMessage){
    logger.trace("[Message] update.js");
    if(newMessage.author.bot == true || oldMessage.content == newMessage.content || newMessage.guild == null) return;
    nplogger("edit");
	const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
    
	let author_with_nick;
	try {
		if(newMessage.member.user.globalName != null) {
            author_with_nick = newMessage.member.nickname != null ? (newMessage.member.user.username + ' (' + newMessage.member.displayName + ')') : (newMessage.member.user.username + '(' + newMessage.member.user.globalName + ')');
        } else { 
            author_with_nick = newMessage.member.nickname != null ? (newMessage.member.user.username + ' (' + newMessage.member.displayName + ')') : newMessage.member.user.username; 
        }//globalName = ユーザー表示名 / nickname = サーバー表示名
	} catch (error) {
		logger.warn("\n\n" + error);
		return;
	}

    let embed = new EmbedBuilder()
        .setColor(0xe62aed)
        .setAuthor({name: author_with_nick, iconURL: newMessage.author.displayAvatarURL()})
        .setTimestamp(new Date());
    let embed2 = null;
    let oldMsgContent = oldMessage.content, newMsgContent = newMessage.content;
    if(oldMsgContent.length + newMsgContent.length > 5500) {//全体文字数制限回避
        embed2 = new EmbedBuilder()
            .setColor(0xe62aed)
            .setDescription('(2/2)')
            .setTimestamp(new Date())
        embed.setDescription(String(newMessage.channel) + 'にてメッセージが編集されました。\n(1/2)');
        embed.addFields({name: `変更前のメッセージ(1/${Math.ceil(oldMsgContent.length / 1000)})`, value: oldMsgContent.slice(0, 1000)});
        for(let i = 1000; i < oldMsgContent.length; i += 1000) {
            embed.addFields({name: `(${(i/1000) + 1}/${Math.ceil(oldMsgContent.length / 1000)})`, value: oldMsgContent.slice(i, i + 1000)});
        }
        embed2.addFields({name: `変更後のメッセージ(1/${Math.ceil(newMsgContent.length / 1000)})`, value: newMsgContent.slice(0, 1000)});
        for(let i = 1000; i < newMsgContent.length; i += 1000) {
            embed2.addFields({name: `(${(i/1000) + 1}/${Math.ceil(newMsgContent.length / 1000)})`, value: newMsgContent.slice(i, i + 1000)});
        }
        embed2.addFields(
            {name: '日付', value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)'},
            {name: 'メッセージID', value:`${newMessage.id}\n[対象のメッセージに飛ぶ](${newMessage.url})`}
        );
    } else if(oldMsgContent.length > 1000 || newMsgContent.length > 1000) {//1Fieldの文字数制限回避
        embed.setDescription(String(newMessage.channel) + 'にてメッセージが編集されました。');
        embed.addFields(
            {name: '日付', value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)'},
            {name: 'メッセージID', value:`${newMessage.id}\n[対象のメッセージに飛ぶ](${newMessage.url})`}
        );
        if(oldMsgContent.length > 1000) {
            embed.addFields({name: `変更前のメッセージ(1/${Math.ceil(oldMsgContent.length / 1000)})`, value: oldMsgContent.slice(0, 1000)});
            for(let i = 1000; i < oldMsgContent.length; i += 1000) {
                embed.addFields({name: `(${(i/1000) + 1}/${Math.ceil(oldMsgContent.length / 1000)})`, value: oldMsgContent.slice(i, i + 1000)});
            }
        }
        embed.addFields({name: `変更後のメッセージ(1/${Math.ceil(newMsgContent.length / 1000)})`, value: newMsgContent.slice(0, 1000)});
        for(let i = 1000; i < newMsgContent.length; i += 1000) {
            embed.addFields({name: `(${(i/1000) + 1}/${Math.ceil(newMsgContent.length / 1000)})`, value: newMsgContent.slice(i, i + 1000)});
        }
    } else {//通常
        oldMsgContent = oldMsgContent ?? ' ';
        newMsgContent = newMsgContent ?? ' ';
        embed.setDescription(String(newMessage.channel) + 'にてメッセージが編集されました。');
        embed.addFields(
            {name: '変更前のメッセージ', value: oldMsgContent},
            {name: '変更後のメッセージ', value: newMsgContent},
            {name: '日付', value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)'},
            {name: 'メッセージID', value:`${newMessage.id}\n[対象のメッセージに飛ぶ](${newMessage.url})`}
        );
    }
    

    logger.trace("[Log] update.js: switch");
    let channel;
    switch(newMessage.guild.id) {
        case nullpo_server_id:
                channel = ServerLogChannelFinder(client, null, "メッセージログ", nullpo_server_id);
            break;
        case nullpo_casino_server_id:
                channel = ServerLogChannelFinder(client, null, "メッセージログ", nullpo_casino_server_id);
            break;
        case nullpo_debug_server_id:
                channel = ServerLogChannelFinder(client, null, "メッセージログ", nullpo_debug_server_id);
            break;
        default:
            break;
    }
    if(channel != null) {
        channel.send({embeds: [embed]});
        if(embed2 != null) {
            channel.send({embeds: [embed2]});
        }
    } else {
        logger.error("メッセージログチャンネルが見つかりませんでした。");
        throw_webhook("error", 'MessageUpdateLogger', "メッセージログチャンネルが見つかりませんでした。メッセージログスレッドがクローズされていないか確認してください。" + newMessage.guild.name);
    }
}

module.exports = MessageUpdateLogger;