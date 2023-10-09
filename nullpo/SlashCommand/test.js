const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});
//const svid = '966674976956645407',ncsvid = '1015585928779137105';
const tex_test = '980304691604881419', tex_nlpcs_nofi = '1015852168810606592';
const channelTest = client.channels.cache.get(tex_test);
const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('テスト用コマンドです。bot管理者のみ使用できます。')
		.addSubcommand(subcommand =>
			subcommand
				.setName('tips')
				.setDescription('テスト用Tipsを表示します。')
				.addIntegerOption(option =>
					option.setName('number')
						.setDescription('表示するTipsの番号を入力してください。')
						.setRequired(true))),
	async execute(interaction) {
		logger.trace("[SlashCommand] test.js");
		if(interaction.options.getSubcommand() === 'tips') {
			const tips = ["美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。"];
			channelTest.send("[Tips:" + tips[interaction.options.getInteger('number')] + "]");
		}
		if(interaction.options.getSubcommand() === 'nofi') {
			channelncnofi.send(`再起動通知のテストメッセージです。`);
		}
	},			
};