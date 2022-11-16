const { MessageEmbed } = require('discord.js');
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',debug_server_id = '979084665958834216';
const nullpo_admin_log = '997341001809133588',nullpo_casino_admin_log = '1042484015720042546';

function delete_logger(message) {
        const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
        const embed = new MessageEmbed()
        .setTitle('メッセージ削除')
        .setColor(0xff0000)
        .setDescription('削除されたメッセージです。')
        .addField('メッセージ内容', message.content)
        .addField('チャンネル', message.channel)
        .setFooter('削除者: ' + message.author.tag + ' | ' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '.' + MilliSec0)
        switch(message.guild.id) {
                case nullpo_server_id:
                        client.channels.cache.get(nullpo_admin_log).send({embeds: [embed]});
                        break;
                case nullpo_casino_server_id:
                        client.channels.cache.get(nullpo_casino_admin_log).send({embeds: [embed]});
                        break;
                default:
                        break;
        }
}

module.exports = delete_logger;