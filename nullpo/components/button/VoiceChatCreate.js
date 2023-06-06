const {Client, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent]});
let number;
const throw_webhook = require('../../../function/throw_webhook.js');
async function VoiceChatCreate(interaction) {
    const VoiceChatCreate_button_disabled = new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Danger).setLabel('作成中...').setDisabled(true);
    await interaction.message.edit({
        components: [new ActionRowBuilder().addComponents(VoiceChatCreate_button_disabled)],
    })
	await interaction.reply({
        content: "ボイスチャットを作成しています...",
        ephemeral: true,
        fetchReply: true,
    }).catch(err => {
        throw_webhook("error", "command[VoiceChatCreate]: ボイスチャット作成時にエラーが発生しました。", err); 
        console.error("\n\n[VoiceChatCreate] VoiceChatCreate error", err);
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

//ボイスチャット作成
function execute(interaction, category, VCname, VCbitrate) {
    const bitrateAmount = (VCbitrate ?? 64000);//VCbitrateがnullの場合は64000になる
    const array = [];
    interaction.guild.channels.cache.filter(ch => ch.name.slice(-(VCname.length + 1)) === ('-' + VCname)).each(channel => array.push(Number(channel.name.slice(0, -(VCname.length + 1)))));
    const checkVC = Array.from(new Set(array));
    const checkVC_arr = Array.from(checkVC);
    checkVC_arr.sort((a, b) => a - b);
    if (checkVC_arr.length == 0) { number = 1; }
    else {
        for(let j = 0; j <= checkVC_arr.length; j++){
            if(checkVC_arr[j] != (String(j+1))){
                number = j + 1;
                break;
            }
        }
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
            console.log('[VCC] VC created: ' + number + '-' + VCname);
        }).catch(err => {
            if(err.code == 50035) {
                interaction.editReply({
                    content: 'チャンネルの作成上限に達しました。既に作成されているチャンネルを利用してください。空きがない場合は管理者にお問い合わせください。',
                    ephemeral: true,
                    fetchReply: true
                });
                console.error(err);
            } else {
                interaction.editReply({
                    content: 'なんらかのエラーによりチャンネルの作成に失敗しました。時間をおいてもう一度お試しください。\n何度もこのエラーが出る場合は管理者にお問い合わせください。',
                    ephemeral: true,
                    fetchReply: true
                });
                throw_webhook('error', `VoiceChatCreate.js:作成失敗(${VCname})`, err, "");
                console.error(err);
            }
            interaction.message.edit({
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Success).setLabel('イベントVCを作成する'))],
            })
        });
    interaction.message.edit({
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Success).setLabel('イベントVCを作成する'))],
    })
}

module.exports = VoiceChatCreate;