const { SlashCommandBuilder } = require('discord.js');
const logger = require('../log/logger.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('wiki')
                .setDescription('アジ鯖のwikiページを表示します。'),
        async execute(interaction){
                logger("command");
                await interaction.reply({
                        content: `公式wikiトップページ : https://tinyurl.com/2lj858o9 \nアイテムリスト : https://tinyurl.com/2a9hlk89 \npet : https://azisabaofficial.playing.wiki/d/MyPet \n非公式wikiトップページ : https://azisaba-hikousiki-life.memo.wiki/ \nFF map : https://tinyurl.com/24a7gz34 \npve ドロップ早見表 : https://tinyurl.com/24tayden \n圧倒的ネタバレ : https://tinyurl.com/2btvntcn \n一部短縮URLです。悪質なサイトにはいきません。\nページは随時追加予定。追加の要望はDMにお願いします。`,
                        ephemeral: true
                });
        },
};