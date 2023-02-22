const { Client,Intents,MessageEmbed } = require('discord.js');
const logger = require('./logger.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT,]});
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',nullpo_debug_server_id = '979084665958834216';
const nullpo_admin_log = '997341001809133588',nullpo_casino_admin_log = '1042484015720042546',nullpo_debug_test = '986475538770194432';

function delete_logger(message) {
        logger("delete");
        const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
	//const channelInput = (message.channel != null ? String(message.channel) : '不明なチャンネル');
        const embed = {
                title: 'メッセージ削除',
                color: 0xCC0000,
                description: String(message.channel) + 'にてメッセージが削除されました。',
                author: {
                        name: message.author.tag,
                        icon_url: message.author.avatarURL(),
                },
                fields: [{
                        name: 'メッセージ内容',
                        value: message.content,
                },{
			name: '日付',
			value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
		},{
			name: 'メッセージID',
			value: message.id,
		}],
                timestamp: new Date(),
        };
        switch(message.guild.id) {
                case nullpo_server_id:
                        client.guilds.cache.get(nullpo_server_id).channels.cache.get(nullpo_admin_log).send({embeds: [embed]});
                        break;
                case nullpo_casino_server_id:
                        client.guilds.cache.get(nullpo_casino_server_id).channels.cache.get(nullpo_casino_admin_log).send({embeds: [embed]});
                        break;
                case nullpo_debug_server_id:
                        client.guilds.cache.get(nullpo_debug_server_id).channels.cache.get(nullpo_debug_test).send({embeds: [embed]});
                default:
                        break;
        }
}

module.exports = delete_logger;