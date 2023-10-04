const dbclient = require('../database/index.js');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ChatInputCommandInteraction, ContextMenuCommandInteraction } = require('discord.js');
const throw_webhook = require('../../../function/throw_webhook.js');

/**
 * monsterCardsの情報を表示する コンテキスト、スラッシュコマンド共通 fromでどちらから呼ばれたかを判別
 * @param {String} from 
 * @param {ChatInputCommandInteraction|ContextMenuCommandInteraction} interaction 
 * @param {Discord.client} client
 * @returns {void}
 * @private
 */
function information(from, interaction, client){
    const interactionUser = interaction.member.user;
    const member = interaction.options.getMember('user');
    const userId = member.id;
    const buttonyes = new ButtonBuilder().setCustomId('moncard_DBregi_yes').setStyle(ButtonStyle.Success).setLabel('はい');
	const buttonno = new ButtonBuilder().setCustomId('moncard_DBregi_no').setStyle(ButtonStyle.Danger).setLabel('いいえ');
    dbclient.connection(`SELECT * FROM monster_cards WHERE id = '${userId}'`).then(async res => {
        if(res.length == 0) {// = 該当ユーザーが存在しない
            if(interactionUser == member){// 自分の場合
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
            await interaction.reply({
                embeds: [{
                    title: `${member_with_nick(interaction)}さんの情報`,
                    description: "登録情報を表示します。",
                    color: 0x00ff00
                }],
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