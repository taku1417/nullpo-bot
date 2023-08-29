const config = require("config");
const { SlashCommandBuilder } = require('discord.js');
const VCNoticeRole = process.env.NODE_ENV === 'heroku' ? process.env.VC_NOTICE_ROLE : config.get("VC_NOTICE_ROLE");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vc-notification')
        .setDescription('DMにおけるVC入退室通知を設定します。')
        .addSubcommand(subcommand =>
            subcommand
                .setName('onoff')
                .setDescription('VC入退室通知を有効にします。')
                .addBooleanOption(option => option.setName('onoff').setDescription('VC入退室通知を有効にします。')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('現在の設定を確認します。')),
    async execute(interaction) {
        const onoff = interaction.options.getBoolean('onoff');
        const check = interaction.options.getSubcommand() === 'check';
        if (check) {
            if (interaction.member.roles.cache.has(VCNoticeRole)) {
                await interaction.reply({
                    content: '現在、VC入退室通知は有効になっています。',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '現在、VC入退室通知は無効になっています。',
                    ephemeral: true
                });
            }
            return;
        } else {
            if (onoff) {
                try {
                interaction.member.roles.add(VCNoticeRole);
                } catch (error) {
                    console.error(error);
                    if(interaction.member.roles.cache.has(VCNoticeRole)) {
                        await interaction.reply({
                            content: 'VC入退室通知の設定に失敗しました。既に有効になっている可能性があります。',
                            ephemeral: true
                        });
                    return;
                    } else {
                        await interaction.reply({
                            content: 'VC入退室通知の設定に失敗しました。もう一度お試しください。',
                            ephemeral: true
                        });
                        return;
                    }
                }
                await interaction.reply({
                    content: 'VC入退室通知を有効にしました。',
                    ephemeral: true
                });
            } else {
                try {
                    interaction.member.roles.remove(VCNoticeRole);
                } catch (error) {
                    console.error(error);
                    if(!interaction.member.roles.cache.has(VCNoticeRole)) {
                        await interaction.reply({
                            content: 'VC入退室通知の設定に失敗しました。既に無効になっている可能性があります。',
                            ephemeral: true
                        });
                    return;
                    } else {
                        await interaction.reply({
                            content: 'VC入退室通知の設定に失敗しました。もう一度お試しください。',
                            ephemeral: true
                        });
                        return;
                    }
                }
                await interaction.reply({
                    content: 'VC入退室通知を無効にしました。',
                    ephemeral: true
                });
            
            }
        }
    },
};