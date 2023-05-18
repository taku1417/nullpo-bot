const {Client , GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent]});
let number;
async function VoiceChatCreate(interaction) {
	await interaction.reply({
        content: "ボイスチャットを作成しています...",
        ephemeral: true,
        fetchReply: true
    });
    switch(interaction.channelId){//ボタンのあるチャンネルID
        case '1108624508211966012'://debug鯖でのテスト用
            const VC_name_test = "テスト";
            const category_test = '1108624382009548810';
            const bitrate_test = 96000;
            await execute(interaction, category_test, VC_name_test, bitrate_test);
            break;
        case '1108678708480446535'://CASINO イベントVC
            const VC_name_event = "イベント";
            const category_event = '1108678500963061891';
            const bitrate_event = 192000;
            await execute(interaction, category_event, VC_name_event, bitrate_event);
            break;
    }
}

function execute(interaction, category, VCname, VCbitrate) {
    const bitrateAmount = (VCbitrate ?? 64000);
    const array = [];
    interaction.guild.channels.cache.filter(ch => ch.name.slice(-(VCname.length + 1)) === ('-' + VCname)).each(channel => array.push(Number(channel.name.slice(0,1))));
    const checkVC = Array.from(new Set(array));
    const checkVC_arr = Array.from(checkVC);
    checkVC_arr.sort((a, b) => a - b);
    console.log(checkVC + '//' + checkVC_arr);
    if (checkVC_arr.length == 0) { number = 1; }
    if (checkVC_arr.length == 9) { number = -1; }
    else {
        for(let j = 0; j <= checkVC_arr.length; j++){
            console.log('j: ' + j);
            if(checkVC_arr[j] != (String(j+1))){
                console.log('if');
                number = j + 1;
                break;
            }else{
                console.log('else');
            }
        }
    }
    console.log('num: ' + number);
    if(number == -1) {
        interaction.editReply({
            content: 'ボイスチャンネルの作成上限に達しています。',
            ephemeral: true,
            fetchReply: true
        });
        return;//一時的な措置
    }
    interaction.guild.channels.create({
        name: number + '-' + VCname, 
        type: 2,// GUILD_VOICE
        parent: category,
        bitrate: bitrateAmount,
        position: number + 1
    }).then(channel => {
        interaction.editReply({
            content: `<#${channel.id}>を作成しました！`,
            ephemeral: true,
            fetchReply: true
        });
    })
}
module.exports = VoiceChatCreate;