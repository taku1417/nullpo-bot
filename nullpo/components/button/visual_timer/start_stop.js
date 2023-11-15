const {ButtonBuilder, ButtonStyle, ActionRowBuilder, ButtonInteraction, Client} = require("discord.js");
const dbclient = require('../../../Built-inModule/database/index.js');
const throw_webhook = require("../../../../function/throw_webhook.js");
const VisualTimer = require('../../../Built-inModule/VisualTimer/index.js');

module.exports = {
    data: new ButtonBuilder()
        .setCustomId('start_stop')
        .setStyle(ButtonStyle.Success)
        .setLabel('開始/停止'),
    /**
     * execute
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});
        if(visual_timer_executing_user.find(object => object == interaction.user.id) != undefined) {
            interaction.followUp({content: '連打しないでください...。', ephemeral: true});
            return;
        } else {
            visual_timer_executing_user.push(interaction.user.id);
        }
        const target_timer_id = interaction.customId.replace(/[^0-9]/g,'');//customIdからmessage_idを取得(数字以外を削除)
        const target_timer = await dbclient.connection(`SELECT * FROM visual_timer WHERE message_id = '${target_timer_id}';`);
        const target_timer_message = await client.channels.fetch(target_timer[0].channel_id).then(channel => channel.messages.fetch(target_timer_id));

        if(target_timer_message == null) {
            interaction.followUp({content: 'タイマーの取得に失敗しました。壊れている可能性があります。修正までしばらくお待ちください。'});
            throw_webhook('error', 'button:visual_timer/start_stop', 'タイマーの取得に失敗しました。壊れている可能性があります。target => ' + target_timer_id + ' / ' + target_timer[0].channel_id + ' | ' + interaction.user + 'さんが実行');
            visual_timer_executing_user = visual_timer_executing_user.filter(object => object != interaction.user.id);
            return;
        }
        if(visual_timer_current.find(
            object => object.message_id == target_timer_id && object.discord_id == interaction.user.id
        ) == undefined) {//タイマーが開始されていない場合
            VisualTimer.timer.start(target_timer_message, target_timer, interaction, client);
            return;
        } else {//タイマーが開始されている場合
            VisualTimer.timer.stop(target_timer_message, target_timer, interaction, client);
            return;
        }
    }
};