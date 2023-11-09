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
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});
        const target_timer_id = interaction.customId.replace(/[^0-9]/g,'');//customIdからmessage_idを取得(数字以外を削除)
        const target_timer = await dbclient.connection(`SELECT * FROM visual_timer WHERE message_id = '${target_timer_id}';`);
        const target_timer_message = await client.channels.fetch(target_timer[0].channel_id).then(channel => channel.messages.fetch(target_timer_id));

        if(target_timer_message == null) {
            interaction.followUp({content: 'タイマーの取得に失敗しました。壊れている可能性があります。修正までしばらくお待ちください。'});
            throw_webhook('error', 'button:visual_timer/start_stop', 'タイマーの取得に失敗しました。壊れている可能性があります。target => ' + target_timer_id + ' / ' + target_timer[0].channel_id + ' | ' + interaction.user + 'さんが実行');
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
//todo: 配列「visual_timer_current」を元にrefresh.jsでembedを更新する。

        // if(visual_timer_current.find(
        //     object => object.message_id == target_timer_id && object.discord_id == interaction.id
        //     ) != undefined) {
        //         VisualTimer.timer.stop(target_timer_message, interaction, client);
        //     }
        // let enddate = Date.now() + target_timer[0].time * 1000;
        // let embed = target_timer_message.embeds[0];
        // // embed.fields[1].value = '誰も開始していません！';

        // logger.debug(embed.fields[1].value);
        // let button = this.data;
        // button.setCustomId(`start_stop${target_timer_id}`);
        // await target_timer_message.edit({embeds: [embed], components: [new ActionRowBuilder().addComponents(button)]});
        // await dbclient.connection('BEGIN;');
        // await dbclient.connection(`INSERT visual_timer_current (timer_message_id, discord_id, end_date_unix) VALUES ('${target_timer_id}', '${interaction.user.id}', '${enddate}');`);
        // interaction.followUp({content: 'タイマーを開始しました。'}).then(msg => setTimeout(() => msg.delete(), 3000));
        // const current_id = dbclient.connection(`SELECT id FROM visual_timer_current WHERE timer_message_id = '${target_timer_id}' AND discord_id = '${interaction.user.id}';`)
        // if(current_id[0].id <= 0) {
        //     interaction.followUp({content: 'タイマーの開始に失敗しました。', ephemeral: true});
        //     throw_webhook('error', 'button:visual_timer/start_stop', 'タイマーの開始に失敗しました。target => ' + target_timer_id + ' | ' + interaction.user + 'さんが実行');
        //     await dbclient.connection('ROLLBACK;');
        //     return;
        // }
        // visual_timer_current.push({id: current_id[0].id, message_id: target_timer_id, discord_id: interaction.user.id, end_date_unix: enddate});
        // await dbclient.connection('COMMIT;');
        // VisualTimer.refresh(interaction, client);