const { Client,Intents,MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105';
const nullpo_admin_log = '997341001809133588',nullpo_casino_admin_log = '1042484015720042546';
const nullpo = client.channels.fetch(nullpo_admin_log).then(channel => console.log(channel.name));
const nullpocasino = client.channels.fetch(nullpo_casino_admin_log).then(channel => console.log(channel.name));

function delete_logger(message) {
        const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
        //client.channels.cache.get(nullpo_admin_log).send(`[delete_logger]実行されています。`);
        const embed = {
                title: 'メッセージ削除',
                color: 0xff0000,
                description: '削除されたメッセージです。',
                fields: [{
                        name: 'メッセージ内容',
                        value: message.content,
                },{
                        name: 'チャンネル',
                        value: (message.channel != null ? message.channel : 不明),
                }],
                footer: {
                        text: '削除者: ' + message.author.tag + ' | ' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '.' + MilliSec0,
                },
        };
        switch(message.guild.id) {
                case nullpo_server_id:
                        client.guilds.cache.get(nullpo_server_id).channels.cache.get(nullpo_admin_log).send({embeds: [embed]});
                        break;
                case nullpo_casino_server_id:
                        client.guilds.cache.get(nullpo_casino_server_id).channels.cache.get(nullpocasino).send({embeds: [embed]});
                        break;
                default:
                        break;
        }
}

module.exports = delete_logger;