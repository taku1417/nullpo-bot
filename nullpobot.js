const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const config = require('config');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const app = express();


if(process.env.NODE_ENV !== 'heroku') {
	process.env.NODE_ENV === 'default';
} 
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const logger = require('./nullpo/log/logger.js');
//const delete_logger = require('./nullpo/log/delete_logger.js');
all_log = 0,join_log = 0,move_log = 0,leave_log = 0,clock_log = 0,restart_log = 0,command_log = 0,delete_log = 0,unknown_log = 0;
const update_from_db = require('./nullpo/components/update_from_db.js');
const yes_button = require('./nullpo/components/button/yes.js');
const no_button = require('./nullpo/components/button/no.js');
const cronjob = require('./nullpo/events/cron.js');
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',nullpo_debug_server_id = '979084665958834216';
const nullpo_admin_log = '997341001809133588',nullpo_casino_admin_log = '1042484015720042546',nullpo_debug_test = '986475538770194432';
const botID = '978923316557537280';
client.Commands = new Collection();
commands_rest = [];
client.slashCommands = new Collection();
slashCommands_rest = [];
client.Commands_NullpoDebug = new Collection();
Commands_rest_NullpoDebug = [];

sql_connect();

client.once('ready', () => {	
	client.user.setPresence({
		activities: [{
			name: `Starting up... | 起動中...`,
		}],
		status: "dnd"
	});
});
const cron = require('node-cron');
const schedule = require('node-schedule');
errorCount = 0,SuccessLogin = 0;
const tex_dblog = '979084899703218186',tex_jihou = '997274370122731611',tex_nlpcs_nofi = '1015852168810606592',tex_jllog = '978962695418155019',tex_pjsekai = '999675995936280717';
const vc_atumare = '997274624045879407',vc_pjsekai = '981173824294879322',vc_apex = '992161885862502400',vc_music = '982523943309180978',vc_spla = '1017431011442819142',vc_granblue = '1083006425791463494';
const svid = '966674976956645407',ncsvid = '1015585928779137105';
const mori = new schedule.RecurrenceRule();
mori.minute = 0;
//const job = schedule.scheduleJob(mori, function(){//森レイドのやつ
	//channeljihou.send(`__**あと3分で森レイドが始まります！**__`)
	//logger("clock");
	//console.log(`森レイド通知`);
//});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

rental = { mjc_pic: 0, mjc_swo: 0, mjc_sho: 0, star_guide: 0,ravan: 0,beer: 0,mrz_iron: 0,mrz_gold: 0,mrz_dia: 0,mrz_eme:0,soul_protection: 0,vortex: 0,haruspe: 0,moriDoll: 0,MGF: 0,MTF: 0,all_pic: 0, GR: 0,origin: 0,orichal: 0,youtou: 0,gokuen: 0,requiem: 0,ffggr: 0,枯れた心: 0,envenom: 0,AZI: 0,sac: 0,vega: 0,fulldora: 0,炎廃業: 0};
maxRental = { mjc_pic: 1, mjc_swo: 1, mjc_sho: 1, star_guide: 1,ravan: 1,beer: 2,mrz_iron: 1,mrz_gold: 1,mrz_dia: 1,mrz_eme:1,soul_protection: 1,vortex: 1,haruspe: 3,moriDoll: 3,MGF: 1,MTF: 2,all_pic: 2,GR: 1,origin: 1,orichal: 1,youtou: 1,gokuen: 1,requiem: 1,ffggr: 1,枯れた心: 1,envenom: 1,AZI: 1,sac: 1,vega: 1,fulldora: 1,炎廃業: 1};
lendSystemCurrent = '';
lendSystemMode = '';
ItemList = [
	{ id: 'mjc_pic', name: 'マジカトロンピッケル'},
	{ id: 'mjc_sho', name: 'マジカトロンシャベル'},
	{ id: 'mjc_swo', name: 'マジカトロンソード'},
	{ id: 'star_guide', name: '星の導き'},
	{ id: 'ravan', name: '赫灼大斧ラヴァン'},
	{ id: 'beer', name: 'ビール装備'},
	{ id: 'MGF', name: 'Master of Gold Fishing装備'},
	{ id: 'MTF', name: 'Master of Treasure Fishing装備'},
	{ id: 'mrz_iron', name: 'マスターロッドZアイアンカスタム'},
	{ id: 'mrz_gold', name: 'マスターロッドZゴールドカスタム'},
	{ id: 'mrz_dia', name: 'マスターロッドZダイヤカスタム'},
	{ id: 'mrz_eme', name: 'マスターロッドZエメラルドカスタム'},
	{ id: 'soul_protection', name: '精霊の加護'},
	{ id: 'vortex', name: 'Vortex Harricane'},
	{ id: 'haruspe', name: 'Springスペランカーソード'},
	{ id: 'moriDoll', name: '幸運森ドール([復刻]BirthdayDoll~Mori01231~)'},
	{ id: 'all_pic', name: '資源成長型ピッケルX AllCustom'},
	{ id: 'GR', name: 'GOLD RUSH装備'},
	{ id: 'origin', name: '原初装備'},
	{ id: 'orichal', name: 'ΟριχαρόνIngot(オリハルコン)装備'},
	{ id: 'youtou', name: '[復刻]妖刀「白狐」'},
	{ id: 'gokuen', name: '思念の獄炎'},
	{ id: 'requiem', name: '壊世錫杖レクイエム'},
	{ id: 'ffggr', name: 'ffggrロッド Rank4'},
	{ id: '枯れた心', name: '枯れた心'},
	{ id: 'envenom', name: 'Envenom Merge'},
	{ id: 'AZI', name: '【AZI SAVIOR】'},
	{ id: 'sac', name: '昇土龍拳サック'},
	{ id: 'vega', name: '星龍の弓_Vega_'},
	{ id: 'fulldora', name: 'フルドラゴンアーマーチェストプレート'},
	{ id: '炎廃業', name: '炎廃業'},
	//{ id: '', name: ''},
]

/*ステメメモ

*/
client.on('voiceStateUpdate', (oldState, newState) =>	{ 
	const channeljllog = client.channels.cache.get(tex_jllog), channelatumare = oldState.member.guild.channels.cache.get(vc_atumare), channelvcpjsekai = oldState.member.guild.channels.cache.get(vc_pjsekai), channelapex = oldState.member.guild.channels.cache.get(vc_apex),channelmusic = oldState.member.guild.channels.cache.get(vc_music),Ochanneljihou = oldState.member.guild.channels.cache.get(tex_jihou),channelpjsekai = oldState.member.guild.channels.cache.get(tex_pjsekai),channelspla = oldState.member.guild.channels.cache.get(vc_spla),channelgranblue = oldState.member.guild.channels.cache.get(vc_granblue);
	if (oldState.channelId === null && newState.channelId === vc_atumare) {
		logger("join");
		channelatumare.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🌸あつまれVCに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🌸あつまれVCに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_pjsekai) {
		logger("join");
		channelpjsekai.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		channelvcpjsekai.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		//Ochanneljihou.send(`**入室** 🎼プロセカルームに${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🎼プロセカルームに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_spla) {
		logger("join");
		channelspla.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🦑スプラキッズに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🦑スプラキッズに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_apex) {
		logger("join");
		channelapex.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 💥APEXルームに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 💥APEXルームに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_granblue) {
		logger("join");
		channelgranblue.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🐲グラブルルームに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🐲グラブルルームに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_music) {
		logger("join");
		channelmusic.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🎧音楽鑑賞に ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🎧音楽鑑賞に ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === (vc_pjsekai || vc_spla || vc_apex || vc_music || vc_granblue) && newState.channelId === vc_atumare) {
		logger("move");
		channelatumare.send(`__**移動** 🌸あつまれVCに ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🌸あつまれVCに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🌸あつまれVCに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_spla || vc_apex || vc_music || vc_granblue) && newState.channelId === vc_pjsekai) {
		logger("move");
		channelpjsekai.send(`__**移動** プロセカルームに ${oldState.member.displayName} さんが移動しました。__`);
		channelvcpjsekai.send(`__**移動** プロセカルームに ${oldState.member.displayName} さんが移動しました。__`);
		//Ochanneljihou.send(`**移動** 🎼プロセカルームに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🎼プロセカルームに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_apex || vc_music || vc_granblue) && newState.channelId === vc_spla) {
		logger("move");
		channelspla.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🦑スプラキッズに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🦑スプラキッズに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_music || vc_granblue) && newState.channelId === vc_apex) {
		logger("move");
		channelapex.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 💥APEXルームに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 💥APEXルームに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_music) && newState.channelId === vc_granblue) {
		logger("move");
		channelgranblue.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🐲グラブルルームに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🐲グラブルルームに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_granblue) && newState.channelId === vc_music) {
		logger("move");
		channelmusic.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🎧音楽鑑賞に ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🎧音楽鑑賞に ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_music || vc_granblue) && newState.channelId === null) {
		logger("leave");
		channeljllog.send(`**退出:x:**  ${newState.member.displayName} さんが退出しました。`);
		//Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが退出しました。`);
		switch (oldState.channelId) {
			case vc_atumare:
				channelatumare.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  🌸あつまれVCから ${newState.member.displayName} さんが退出しました。`);
				break;
			case vc_pjsekai:
				channelvcpjsekai.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				channelpjsekai.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				break;
			case vc_spla:
				channelspla.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  🦑スプラキッズから ${newState.member.displayName} さんが退出しました。`);
				break;
			case vc_apex:
				channelapex.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  💥APEXルームから ${newState.member.displayName} さんが退出しました。`);
				break;
			case vc_granblue:
				channelgranblue.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  🐲グラブルルームから ${newState.member.displayName} さんが退出しました。`);
				break;
			case vc_music:
				channelmusic.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  🎧音楽鑑賞から ${newState.member.displayName} さんが退出しました。`);
				break;
			default:
				break;
		}
	}
});
client.on('ready', () => {
	cronjob;
	const tips = ["Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます","life本鯖の再起動は5時、16時です","どうでもいいTipsです。追加希望はtaku1417のDMまで。","きりんとねこの身長が180cmなのは嘘である。本当は270cmである","パンに生ハムを乗せると美味しい","薄皮一枚無いスキンをもとに戻したい場合はF3+H","このbotはHerokuというサービス上で稼働しています","あおいんは逆転ものも好き","しまりんはそこまで地上絵が好きじゃない","Monocraftは0時、JMSは9時に投票が可能になります","実はあもさんは下ネタが嫌い","うおみーの言うことは全て嘘","でも実は本当","って言ってるのも嘘かもしれない","でも実は嘘","初めましてronpenです 初めてすぐに10m獲得しました() まだまだ分からないことしかないので色々教えてくれたら嬉しいです","ぬるぽ語録集はVCで生まれた名(迷)言をまとめたものです","この鯖には実に60個ものロールが存在します","畑では植え直しを忘れずに。","木こりは稼げません、マジで。","lifeには統合版でもアクセスできます","釣りをしていると出てくる心の闇は、どこかに座っていると攻撃を大体回避できます","/wikiと打つと主要なwikiページを見ることが出来ます","/recipeと打つとlife独自レシピを見ることが出来ます。レシピは随時追加。","/rentalと打つと貸出記録をbotがやってくれます","/returnと打つと返却記録をbotがやってくれます","真のSはMの天才だし、真のMはSの天才である。それが僕の持論ですね。~LingThai~","しまりんかわいいね","堅あげポテトで口内炎ができるやつ落ち着きがない","命を知ろう〜バイシクル川崎の生体について〜\n一日に生まれるバイシクル川崎のうち約9割がバイク川崎になれないと言われています。\nそしてバイク川崎になれなかったバイシクル川崎の過半数は自然淘汰に対抗するためにコックカワサキへと姿を変えるのです","美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。","本鯖以外のlife系列サーバーは、重くなると再起動されます。","男装男子の定義：女のように見える男が女が男装するときに着る服を着て最終的にギャップだらけになるおとこ"];

	const channeljihou = client.channels.cache.get(tex_jihou);
	const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);
	const channeltest = client.channels.cache.get('979084899703218186');

	console.log(tips.length + "件のtipsを読み込みました。");

	cron.schedule('0 1-4,6-15,17-23 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + "]");
		logger("clock");
	})//tips(大体毎時)
	cron.schedule('0 0 * * *', () => {
		channeljihou.send(`${new Date().getMonth()+1}月${new Date().getDate()}日、${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + 	"]");
		logger("clock");
	})//tips(0時)
	cron.schedule('55 3 * * *', () => {
		//channeljihou.send(`**3分後にlife本鯖からkickされる可能性があります。注意してください。**`);
		//logger("restart");
	})//本鯖kick注意
	cron.schedule('50 4 * * *', () => {
		channeljihou.send(`__**life系列を除くアジ鯖全体、life本鯖再起動まであと10分です。**__`);
		//channelncnofi.send(`<@&1018040272506069042> life本鯖再起動まであと10分です。__**回路が動かなくなるため、再起動が終わるまでは回さないようお願いします。**__`)
		logger("clock");
	})//アジ鯖再起前
	cron.schedule('0 5 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**まもなくlife系列を除くアジ鯖全体、life本鯖再起動です。**`)
		logger("restart");
	})//アジ鯖再起
	cron.schedule('50 15 * * *', () => {
		channeljihou.send(`__**life本鯖再起動まであと10分です。**__`);
		//channelncnofi.send(`<@&1018040272506069042> life本鯖再起動まであと10分です。__**回路が動かなくなるため、再起動が終わるまでは回さないようお願いします。**__`)
		//channeljihou.send(`**本日、4時より__最大30分のlife全鯖メンテナンス__があります。メンテナンス中はlife系列サーバーにアクセスすることが出来ません。**`)//不定期の長期メンテナンス用
		logger("clock");
	})//本鯖再起前
	cron.schedule('0 16 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**life本鯖再起動です。**`);
		logger("restart");
	})//本鯖再起
	cron.schedule('30 23 * * *', () => {
		channeljihou.send(`<@&1010053868987617310> **投票はしましたか？まもなくMonocraftで本日分の投票が出来なくなります。**`)
		logger("clock");
	})//投票リマインド
	//cron.schedule('0 4 * * *', () => {
		//channeljihou.send(`**只今より最大30分の__life全鯖__メンテナンスが行われます。**`)
		//logger("clock");
	//})//臨時
	//cron.schedule('0 18 10,25 * *', () => {
		//channeljihou.send(`**<@431843298588622858> Prince鯖にログインしましょう。**`)
		//logger("clock");
	//})//ナショさん用のリマインド(毎月10日と25日の18時)
});

const CommandsPath = path.join(__dirname, '/nullpo/components/appCommand');
const CommandFiles = fs.readdirSync(CommandsPath).filter(file => file.endsWith('.js'));

for (const file of CommandFiles) {
	const command = require(`./nullpo/components/appCommand/${file}`);
	commands_rest.push(command.data.toJSON());
	if('data' in command && 'execute' in command) {
		client.Commands.set(command.data.name, command);
	}
}

const slashCommandsPath = path.join(__dirname, '/nullpo/SlashCommand');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const filePath = path.join(slashCommandsPath, file);
	const command = require(filePath);
	commands_rest.push(command.data.toJSON());
	if ('data' in command && 'execute' in command) {
		client.slashCommands.set(command.data.name, command);
	}
}

const slashCommandsndPath = path.join(__dirname, '/nullpo/SlashCommand/nullpo_debug');
const slashCommandndFiles = fs.readdirSync(slashCommandsndPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandndFiles) {
	const filePath = path.join(slashCommandsndPath, file);
	const command = require(filePath);
	Commands_rest_NullpoDebug.push(command.data.toJSON());
	if ('data' in command && 'execute' in command) {
		client.Commands_NullpoDebug.set(command.data.name, command);
	}
}

let rest;
if(process.env.NODE_ENV === 'heroku') {
rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
} else {
rest = new REST({ version: '10' }).setToken(config.get('DISCORD_TOKEN'));
}

(async () => {
	try {
		console.log('アプリケーションコマンドの登録開始');
		//if (process.env.NODE_ENV === 'heroku') 
			await rest.put(
				Routes.applicationCommands(botID),
				{ body: commands_rest },
			);//herokuで実行されているときのみグローバルコマンドを登録する
		await rest.put(
			Routes.applicationGuildCommands(botID, nullpo_debug_server_id),
			{ body: Commands_rest_NullpoDebug },
		);//実行環境に関わらずnullpo_debugのサーバーコマンドを登録する
		console.log('アプリケーションコマンドの登録完了');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async (interaction) => {//コマンド・ボタン処理
	if (interaction.isChatInputCommand()){
		const resistered_command = interaction.client.slashCommands.get(interaction.commandName) || interaction.client.Commands_NullpoDebug.get(interaction.commandName);
		if (!resistered_command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			interaction.reply({ content: '指定したコマンドが見つかりませんでした。このメッセージが何度も出てくる場合は、下記のエラーコード、実行されたコマンド名ともにtaku1417#3456まで問い合わせてください。\nエラーコード: 1404  実行されたコマンド名: ' + interaction.commandName, ephemeral: true })
			return;
		}
		try {
			await resistered_command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	}
	if(interaction.isButton()){
		if (interaction.customId === 'yes') yes_button(interaction);
		if (interaction.customId === 'no') no_button(interaction);
	}
	if (interaction.isMessageContextMenuCommand()){
		const resistered_context = interaction.client.Commands.get(interaction.commandName);
		if (!resistered_context) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			interaction.reply({ content: '指定したコマンドが見つかりませんでした。このメッセージが何度も出てくる場合は、下記のエラーコード、実行したコマンド名ともにtaku1417#3456まで問い合わせてください。\nエラーコード: 1404  実行されたコマンド名: ' + interaction.commandName, ephemeral: true })
			return;
		}
		try {
			await resistered_context.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
		
	}
});
client.on('messageDelete', message => {
	logger("delete");
	const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
	const author_with_nick = (message.member.nickname != null ? (message.author.tag + ' (' + message.member.nickname + ')') : message.author.tag);
        const embed = {
                color: 0xCC0000,
                description: String(message.channel) + 'にてメッセージが削除されました。',
                author: {
                        name: author_with_nick,
                        icon_url: message.author.avatarURL(),
                },
                fields: [{
                        name: 'メッセージ内容',
                        value: message.content,
                },{
			name: '日付',
			value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
		},{
			name: 'メッセージID',
			value: message.id,
		}],
                timestamp: new Date(),
        };
        switch(message.guild.id) {
                case nullpo_server_id:
                        client.guilds.cache.get(nullpo_server_id).channels.cache.get(nullpo_admin_log).send({embeds: [embed]});
                        break;
                case nullpo_casino_server_id:
                        client.guilds.cache.get(nullpo_casino_server_id).channels.cache.get(nullpo_casino_admin_log).send({embeds: [embed]});
                        break;
                case nullpo_debug_server_id:
                        client.guilds.cache.get(nullpo_debug_server_id).channels.cache.get(nullpo_debug_test).send({embeds: [embed]});
			break;
                default:
                        break;
        }
	//delete_logger(message);
});
client.once('ready', () => {
	client.channels.cache.get(tex_dblog).send('ぬるぽbotが起動しました。');//デバッグ鯖のログに流れる
});
client.on('ready', () => {
	setInterval(() => {
		client.user.setPresence({
			activities: [{
			name: `${client.ws.ping}ms | nullpo bot`,
			}],
			status: "online"
			});
		setTimeout(() => {
			if(process.env.NODE_ENV === 'heroku'){
				client.user.setPresence({
					activities: [{
						name: `herokuで動作中 | nullpo bot`,
						}],
					status: "online"
				});
			} else {
				client.user.setPresence({
					activities: [{
						name: `ローカルで動作中 | nullpo bot`,
						}],
					status: "online"
				});
			}
		}, 15000);//15秒間ping、5秒間動作モード表示
	}, 20000)//20秒ごとにpingを更新
});
/*
const tryLogin = function(){
	if(errorCount < 3){//最大3回までリトライ
		try {
		client.login();//ログイン
		SuccessLogin = 1;//ログインに成功すると実行
		clearInterval(tryLogin);//下のsetIntervalを停止
		} catch (error) {
			console.error('Discordサービスへの接続に失敗。15秒後にリトライします。',error);
			errorCount++;
		}
		if(SuccessLogin === 1){//ログインに成功していれば実行
			console.log('Discordサービスへの接続に成功しました。');
			return;//ifから抜ける
		}
	} else {//4回目でこちらに
		console.error('Discordサービスへの接続に指定回数失敗したため、プロセスを終了します。');
		process.exit(1);
	}
}
setInterval(tryLogin,15000);//15秒ごとにtryLoginを実行
*/
if(process.env.NODE_ENV === 'heroku'){
	try {
		client.login();//ログイン
		console.log('Discordサービスへの接続に成功しました。');
	} catch (error) {
		console.error('Discordサービスへの接続に失敗。プロセスを終了します。',error);
		process.exit(1);
	}	
} else {
	try {
		client.login(config.get('DISCORD_TOKEN'));//ログイン
		console.log('Discordサービスへの接続に成功しました。');
	} catch (error) {
		console.error('Discordサービスへの接続に失敗。プロセスを終了します。',error);
		process.exit(1);
	}	
}
