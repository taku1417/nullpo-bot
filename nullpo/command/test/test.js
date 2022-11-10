const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
//const svid = '966674976956645407',ncsvid = '1015585928779137105';
const tex_test = '980304691604881419', tex_nlpcs_nofi = '1015852168810606592';
const channelTest = client.channels.cache.get(tex_test);
const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);

function test(interaction) {
        //const member = interaction.options.getMember(interaction.member.displayName);
        
		if(interaction.options.getSubcommand() === 'tips') {
			const tips = ["美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。"];
			channelTest.send("[Tips:" + tips[interaction.options.getInteger('number')] + "]");
		}
		if(interaction.options.getSubcommand() === 'nofi') {
			channelncnofi.send(`再起動通知のテストメッセージです。`);
		}
        }

module.exports = test;