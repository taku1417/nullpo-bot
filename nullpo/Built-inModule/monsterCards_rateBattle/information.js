const dbclient = require('../database/index.js');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ChatInputCommandInteraction, ContextMenuCommandInteraction, EmbedBuilder } = require('discord.js');
const throw_webhook = require('../../../function/throw_webhook.js');
db_regist = [];
/**
 * monsterCardsの情報を表示する コンテキスト、スラッシュコマンド共通 fromでどちらから呼ばれたかを判別
 * @param {String} from 
 * @param {ChatInputCommandInteraction|ContextMenuCommandInteraction} interaction 
 * @param {Discord.client} client
 * @returns {void}
 * @private
 */
function information(from, interaction, client){
    const interactionMember = interaction.member;
    const member = interaction.options.getMember('user');
    const userId = member.id;
    const buttonyes = new ButtonBuilder().setCustomId('moncard_DBregi_yes').setStyle(ButtonStyle.Success).setLabel('はい');
	const buttonno = new ButtonBuilder().setCustomId('moncard_DBregi_no').setStyle(ButtonStyle.Danger).setLabel('いいえ');
    dbclient.connection(`SELECT * FROM monster_cards WHERE discord_id = '${userId}'`).then(async res => {
        if(res.length == 0) {// = 該当ユーザーが存在しない
            if(interactionMember == member){// 自分の場合
                await interaction.reply({
                    embeds: [{
                        title: "データベースに登録されていないようです。",
                        description: "登録しますか？",
                        color: 0xff00ff
                    }],
                    components: [new ActionRowBuilder().addComponents(buttonyes, buttonno)],
                    ephemeral: true
                });

                return;
            } else {// 他人の場合
                await interaction.reply({
                    embeds: [{
                        title: "データベースに登録されていないようです。",
                        color: 0xff0000
                    }],
                    ephemeral: true
                });
                return;
            }
        } else {// = 該当ユーザーが存在する => データベースから情報を取得、表示
            const battleCount = await dbclient.connection(`SELECT * FROM moncard_battle_count WHERE discord_id = '${userId}'`)[0];
            const timanRate = await dbclient.connection(`SELECT * FROM moncard_1v1 WHERE discord_id = '${userId}'`)[0];
            const v4Rate = await dbclient.connection(`SELECT * FROM moncard_v4 WHERE discord_id = '${userId}'`)[0];
            const totalBattleCount = Number(battleCount.timan_rate) + Number(battleCount.v4_rate) + Number(battleCount.free);
            const totalWinCount = Number(battleCount.win_timan_rate) + Number(battleCount.win_v4_rate) + Number(battleCount.win_free);
            const embeds = new EmbedBuilder()
                .setTitle(`${member_with_nick(interaction)}さんの情報`)
                .setDescription("Monster Cardsに関する情報を表示します。")
                .setColor(0x00ff00)
                .setThumbnail(member.user.displayAvatarURL())
                .addFields(
                    { name: "総試合数(free含む)", value: totalBattleCount + "回", inline: true },
                    { name: "総勝利数(free含む)", value: totalWinCount + "回", inline: true },
                    { name: "勝率(free含む)", value: (totalWinCount / totalBattleCount * 100).toFixed(1) + "%", inline: true },
                    { name: "1v1 レート", value: timanRate.rate, inline: true },
                    { name: "v4 レート", value: v4Rate.rate, inline: true },
                    { name: "\u200B", value: "\u200B", inline: true }
                )
                .setFooter({ text: "Powered by nullpo-bot", iconURL: client.user.displayAvatarURL()})
                .setTimestamp();
            await interaction.reply({
                embeds: [embeds],
                ephemeral: true
            });
        }
    })
    .catch(err => {
        throw_webhook("error", "command[monsterCards_seeRate]: データベース接続時にエラーが発生しました。", err); 
        console.error("\n\n[monsterCards_seeRate] DB error", err);
        interaction.reply({
            embeds: [{
                title: "エラーが発生しました。",
                description: "しばらく経ってから再度お試しください。",
                color: 0xff0000
            }],
            ephemeral: true
        });
    });
}

module.exports = information;


function member_with_nick(interaction){
    if(interaction.member.user.globalName != null) {
        author_with_nick = interaction.member.nickname != null ? (interaction.member.user.username + ' (' + interaction.member.displayName + ')') : (interaction.member.user.username + '(' + interaction.member.user.globalName + ')');
    } else { 
        author_with_nick = interaction.member.nickname != null ? (interaction.member.user.username + ' (' + interaction.member.displayName + ')') : interaction.member.user.username; 
    }//globalName = ユーザー表示名 / nickname = サーバー表示名
}