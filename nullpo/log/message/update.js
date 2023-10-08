const nplogger = require('../logger.js');
const ServerLogChannelFinder = require('../../components/ServerLogChannelFinder.js');
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',nullpo_debug_server_id = '979084665958834216';
/**
 * メッセージの編集をログに記録する
 * @param {Discord.Client} client 
 * @param {Discord.Message} oldMessage 
 * @param {Discord.Message} newMessage 
 * @returns 
 */
function MessageUpdateLogger(client, oldMessage, newMessage){
    if(newMessage.author.bot == true) return;
    if(oldMessage.content == newMessage.content) return;
    if(newMessage.guild == null) return;

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

    const embed = {
        color: 0xe62aed,
        description: String(newMessage.channel) + 'にてメッセージが編集されました。',
        author: {
            name: author_with_nick,
            icon_url: newMessage.author.displayAvatarURL(),
        },
        fields: [{
            name: '変更前のメッセージ',
            value: oldMessage.content,
        },{
            name: '変更後のメッセージ',
            value: newMessage.content,
        },{
            name: '日付',
            value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
        },{
            name: 'メッセージID',
            value: `${newMessage.id}\n[対象のメッセージに飛ぶ](${newMessage.url})`,
        }],
        timestamp: new Date(),
    };

    switch(newMessage.guild.id) {
        case nullpo_server_id:
                ServerLogChannelFinder(client, null, "メッセージログ", nullpo_server_id).send({embeds: [embed]});
            break;
        case nullpo_casino_server_id:
                ServerLogChannelFinder(client, null, "メッセージログ", nullpo_casino_server_id).send({embeds: [embed]});
            break;
        case nullpo_debug_server_id:
                ServerLogChannelFinder(client, null, "メッセージログ", nullpo_debug_server_id).send({embeds: [embed]});
            break;
        default:
            break;
    }
}

module.exports = MessageUpdateLogger;