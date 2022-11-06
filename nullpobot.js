const { Client, Intents, MessageButton, MessageActionRow, Role } = require('discord.js');
const logger = require('./nullpo/log/logger.js');
all_log = 0,join_log = 0,move_log = 0,leave_log = 0,clock_log = 0,restart_log = 0,command_log = 0,unknown_log = 0;
const dice = require('./nullpo/command/dice/dice.js');
const update_from_db = require('./nullpo/components/update_from_db.js');
const print = require('./nullpo/command/recipe/print.js');
const test = require('./nullpo/command/test/test.js');
const rental = require('./nullpo/command/rental/rental.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
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
const vc_atumare = '997274624045879407',vc_pjsekai = '981173824294879322',vc_apex = '992161885862502400',vc_music = '982523943309180978',vc_spla = '1017431011442819142';
const tex_dblog = '979084899703218186',tex_jllog = '978962695418155019',tex_jihou = '997274370122731611',tex_rental = '981371600203046964',tex_pjsekai = '999675995936280717',tex_nlpcs_nofi = '1015852168810606592';
const jllog_enable = [tex_jllog,vc_atumare];
const svid = '966674976956645407',ncsvid = '1015585928779137105';
const mori = new schedule.RecurrenceRule();
mori.minute = 0;
const channeljihou = client.channels.cache.get(tex_jihou);
//const job = schedule.scheduleJob(mori, function(){//森レイドのやつ
	//channeljihou.send(`__**あと3分で森レイドが始まります！**__`)
	//logger("clock");
	//console.log(`森レイド通知`);
//});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const dbClient = require('pg/lib/client');
const dbclient = new dbClient({
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	host: process.env.DATABASE_HOST,
	port: 5432,
	database: process.env.DATABASE,
	ssl: true
});
try {
dbclient.connect()
} catch (err) {
	console.error('[postgreSQL] 接続に失敗しました。', err);
	process.exit(1);
} finally {
	console.log('[postgreSQL] 接続に成功しました。');
	console.log(update_from_db('load','all'));
	dbclient.end();
}
rental = { mjc_pic: 0, mjc_swo: 0, mjc_sho: 0, star_guide: 0,ravan: 0,beer: 0,mrz_iron: 0,mrz_gold: 0,mrz_dia: 0,mrz_eme:0,soul_protection: 0,vortex: 0,haruspe: 0,re_haruspe: 0,luck: 0,MGF: 0,MTF: 0,all_pic: 0};
rental_current = { mjc_pic: 0, mjc_swo: 0, mjc_sho: 0, star_guide: 0,ravan: 0,beer: 0,mrz_iron: 0,mrz_gold: 0,mrz_dia: 0,mrz_eme:0,soul_protection: 0,vortex: 0,haruspe: 0,re_haruspe: 0,luck: 0,MGF: 0,MTF: 0,all_pic: 0};
return_current = { mjc_pic: 0, mjc_swo: 0, mjc_sho: 0, star_guide: 0,ravan: 0,beer: 0,mrz_iron: 0,mrz_gold: 0,mrz_dia: 0,mrz_eme:0,soul_protection: 0,vortex: 0,haruspe: 0,re_haruspe: 0,luck: 0,MGF: 0,MTF: 0,all_pic: 0};

client.once('ready', () => {
	client.channels.cache.get(tex_dblog).send('ぬるぽbotが起動しました。');//デバッグ鯖のログに流れる
});

client.on('ready', () => {
	setInterval(() => {
		client.user.setPresence({
			activities: [{
			name: `nullpo bot | ${client.ws.ping}ms`,
			}],
			status: "online"
			});
		}, 3000)
      });
/*ステメメモ

*/
client.on('voiceStateUpdate', (oldState, newState) => {
	const channeljllog = client.channels.cache.get(tex_jllog), channelatumare = oldState.member.guild.channels.cache.get(vc_atumare), channelvcpjsekai = oldState.member.guild.channels.cache.get(vc_pjsekai), channelapex = oldState.member.guild.channels.cache.get(vc_apex),channelmusic = oldState.member.guild.channels.cache.get(vc_music),Ochanneljihou = oldState.member.guild.channels.cache.get(tex_jihou),channelpjsekai = oldState.member.guild.channels.cache.get(tex_pjsekai),channelspla = oldState.member.guild.channels.cache.get(vc_spla);

	if (oldState.channelId === null && newState.channelId === vc_atumare) {
		logger("join");
		channelatumare.send(`__**参加** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**参加** 🌸あつまれVCに${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**参加** 🌸あつまれVCに${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_pjsekai) {
		logger("join");
		channelpjsekai.send(`__**参加** ${oldState.member.displayName} さんが入室しました。__`);
		channelvcpjsekai.send(`__**参加🎼** ${oldState.member.displayName} さんが入室しました。__`);
		//Ochanneljihou.send(`**参加🎼** プロセカルームに${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**参加🎼** プロセカルームに${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_spla) {
		logger("join");
		channelspla.send(`__**参加** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**参加🦑** スプラキッズに${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**参加🦑** スプラキッズに${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_apex) {
		logger("join");
		channelapex.send(`__**参加💥** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**参加💥** APEXルームに${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**参加💥** APEXルームに${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_music) {
		logger("join");
		channelmusic.send(`__**参加♪** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**参加♪** 音楽鑑賞に${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**参加♪** 音楽鑑賞に${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === (vc_pjsekai || vc_spla || vc_apex || vc_music) && newState.channelId === vc_atumare) {
		logger("move");
		channelatumare.send(`__**移動🌸** ${oldState.member.displayName} さんが🌸あつまれVCに移動しました。__`);
		Ochanneljihou.send(`**移動🌸** ${oldState.member.displayName} さんが🌸あつまれVCに移動しました。`);
		return channeljllog.send(`**移動🌸** ${oldState.member.displayName} さんが🌸あつまれVCに移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_spla || vc_apex || vc_music) && newState.channelId === vc_pjsekai) {
		logger("move");
		channelpjsekai.send(`__**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。__`);
		channelvcpjsekai.send(`__**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。__`);
		Ochanneljihou.send(`**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。`);
		return channeljllog.send(`**移動🎼** ${oldState.member.displayName} さんがプロセカルームに移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_apex || vc_music) && newState.channelId === vc_spla) {
		logger("move");
		channelspla.send(`__**移動🦑** ${oldState.member.displayName} さんがスプラキッズに移動しました。__`);
		Ochanneljihou.send(`**移動🦑** ${oldState.member.displayName} さんがスプラキッズに移動しました。`);
		return channeljllog.send(`**移動🦑** ${oldState.member.displayName} さんがスプラキッズに移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_music) && newState.channelId === vc_apex) {
		logger("move");
		channelapex.send(`__**移動💥** ${oldState.member.displayName} さんがAPEXルームに移動しました。__`);
		Ochanneljihou.send(`**移動💥** ${oldState.member.displayName} さんがAPEXルームに移動しました。`);
		return channeljllog.send(`**移動💥** ${oldState.member.displayName} さんがAPEXルームに移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex) && newState.channelId === vc_music) {
		logger("move");
		channelmusic.send(`__**移動♪** ${oldState.member.displayName} さんが音楽鑑賞に移動しました。__`);
		Ochanneljihou.send(`**移動♪** ${oldState.member.displayName} さんが音楽鑑賞に移動しました。`);
		return channeljllog.send(`**移動♪** ${oldState.member.displayName} さんが音楽鑑賞に移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_music) && newState.channelId === null) {
		logger("leave");
		channeljllog.send(`**退出:x:**  ${newState.member.displayName} さんが退出しました。`);
		//Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが退出しました。`);
		switch (oldState.channelId) {
			case vc_atumare:
				channelatumare.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが🌸あつまれVCから退出しました。`);
				break;
			case vc_pjsekai:
				channelvcpjsekai.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				channelpjsekai.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				break;
			case vc_spla:
				channelspla.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんがスプラキッズから退出しました。`);
				break;
			case vc_apex:
				channelapex.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんがAPEXルームから退出しました。`);
				break;
			case vc_music:
				channelmusic.send(`__**退出:x:** ${newState.member.displayName} さんが退出しました。__`);
				Ochanneljihou.send(`**退出:x:**  ${newState.member.displayName} さんが音楽鑑賞から退出しました。`);
				break;
			default:
				break;
		}

	}
});
client.on('ready', () => {//cron.schedule
	const tips = ["pve鯖は15時(1)、16時(2)に自動再起動されます。","Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます","life本鯖の再起動は4時、5時(全体)、14時です","どうでもいいTipsです。追加希望はtaku1417のDMまで。",/*"コマンドはキーボードの↑キーで一つ前の自分が打ったコマンドを入力省略できるが、しかしこれでは種などの購入と圧縮を繰り返す作業には不向きである、そこで二度↑キーを押すと2つ前の自分が打ったコマンドに戻れる。これで/shopと/rguiを簡単に交互に実行することができる",*/"きりんとねこの身長が180cmなのは嘘である。本当は270cmである","パンに生ハムを乗せると美味しい","薄皮一枚無いスキンをもとに戻したい場合はF3+H","このbotはHerokuというサービス上で稼働しています","あおいんは逆転ものも好き","しまりんはそこまで地上絵が好きじゃない","Monocraftは0時、JMSは9時に投票が可能になります","実はあもさんは下ネタが嫌い","うおみーの言うことは全て嘘","でも実は本当","って言ってるのも嘘かもしれない","でも実は嘘","初めましてronpenです 初めてすぐに10m獲得しました() まだまだ分からないことしかないので色々教えてくれたら嬉しいです","ぬるぽ語録集はVCで生まれた名(迷)言をまとめたものです","この鯖には実に60個ものロールが存在します","畑では植え直しを忘れずに。","木こりは稼げません、マジで。","lifeには統合版でもアクセスできます","釣りをしていると出てくる心の闇は、どこかに座っていると攻撃を大体回避できます","/wikiと打つと主要なwikiページを見ることが出来ます","/recipeと打つとlife独自レシピを見ることが出来ます。レシピは随時追加。","/rentalと打つと貸出記録をbotがやってくれます","/returnと打つと返却記録をbotがやってくれます","真のSはMの天才だし、真のMはSの天才である。それが僕の持論ですね。~LingThai~","しまりんかわいいね","堅あげポテトで口内炎ができるやつ落ち着きがない","命を知ろう〜バイシクル川崎の生体について〜\n一日に生まれるバイシクル川崎のうち約9割がバイク川崎になれないと言われています。\nそしてバイク川崎になれなかったバイシクル川崎の過半数は自然淘汰に対抗するためにコックカワサキへと姿を変えるのです","美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。"];
	const tipslength = tips.length;
	const channeljihou = client.channels.cache.get(tex_jihou);
	const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);
	console.log(tipslength + "件のtipsを読み込みました。");
  	cron.schedule('0 1-3,6-13,18-23 * * *', () => {
    		channeljihou.send(`${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + "]");
    		logger("clock");
   	})//tips(大体毎時)
	cron.schedule('0 0 * * *', () => {
		channeljihou.send(`${new Date().getMonth()+1}月${new Date().getDate()}日、${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + "]");
		logger("clock");
	})//tips(0時)
	cron.schedule('55 3 * * *', () => {
		channeljihou.send(`**3分後にlife本鯖からkickされる可能性があります。注意してください。**`);
		logger("restart");
	})//本鯖kick注意
	cron.schedule('0 4,14 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**life本鯖再起動です。**(再起動は行われない事があります。)`);
		logger("restart");
	})//本鯖再起
	cron.schedule('0 5 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**まもなくアジ鯖全体再起動です。**`)
		logger("restart");
	})//アジ鯖再起
	/*cron.schedule('0 15 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**pve1鯖の再起動です。**`)
		logger("restart");
	})//pve1鯖再起
	cron.schedule('0 16 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**pve2鯖の再起動です。**`)
		logger("restart");
	})//pve2鯖再起
	cron.schedule('0 17 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**pve3鯖の再起動です。**`)
		logger("restart");
	})//pve3鯖再起*/
	cron.schedule('50 3,13 * * *', () => {
		channeljihou.send(`__**life本鯖再起動まであと10分です。**__(再起動は行われない事があります。)`)
		channelncnofi.send(`<@&1018040272506069042> life本鯖再起動まであと10分です。__**回路が動かなくなるため、再起動が終わるまでは回さないようお願いします。**__(再起動は行われない事があります。)`)
		//channeljihou.send(`**本日、4時より__最大30分のlife全鯖メンテナンス__があります。メンテナンス中はlife系列サーバーにアクセスすることが出来ません。**`)//不定期の長期メンテナンス用
		logger("clock");
	})//本鯖再起前
	cron.schedule('50 4 * * *', () => {
		channeljihou.send(`__**アジ鯖全体再起動まであと10分です。**__`)
		channelncnofi.send(`<@&1018040272506069042> アジ鯖全体再起動まであと10分です。__**回路が動かなくなるため、再起動が終わるまでは回さないようお願いします。**__`)
		logger("clock");
	})//アジ鯖再起前
	/*cron.schedule('50 14 * * *', () => {
		channeljihou.send(`__**pve1鯖再起動まであと10分です。**__`)
		logger("clock");
	})//pve1鯖再起前
	cron.schedule('50 15 * * *', () => {
		channeljihou.send(`__**pve2鯖再起動まであと10分です。**__`)
		logger("clock");
	})//pve2鯖再起前
	cron.schedule('50 16 * * *', () => {
		channeljihou.send(`__**pve3鯖再起動まであと10分です。**__`)
		logger("clock");
	})//pve3鯖再起前*/
	cron.schedule('30 23 * * *', () => {
		channeljihou.send(`<@&1010053868987617310> **投票はしましたか？まもなくMonocraftで本日分の投票が出来なくなります。**`)
		logger("clock");
	})//投票リマインド
	//cron.schedule('0 4 * * *', () => {
		//channeljihou.send(`**只今より最大30分の__life全鯖__メンテナンスが行われます。**`)
		//logger("clock");
	//})//臨時
	cron.schedule('0 18 10,25 * *', () => {
		channeljihou.send(`**<@431843298588622858> Prince鯖にログインしましょう。**`)
		logger("clock");
	})//ナショさん用のリマインド
});
/*
	client.on('ready', () => {
		const channeljihou = client.channels.cache.get(tex_jihou);
  		cron.schedule('45 1 5,17 * * *', () => {
     			channeljihou.send(`__**再起動終了予定時刻になりました。**__`)
     			logger("restart");
		})
	})
*/
client.once("ready", async () => {//コマンド定義
	const data = [
		{name: "wiki", description: "公式、非公式アジ鯖wikiページを表示します。"},
		{name: "test", description: "テスト用コマンドです。bot管理者のみ使用できます。",
		options: [{
			type: "SUB_COMMAND",
			name: "tips",
			description: "テスト用tipsを表示します。",
			options: [{
				type: "INTEGER",
				name: "number",
				description: "表示するtipsを指定します。",
				required: true
			}]
		}]
	},
		{name: "rental", description: "共用品の貸借記録をします。",
		options: [{
			type: "STRING",
			name: "item_name",
			description: "貸し出したいアイテムの名前を選択してください。",
			required: true,
			choices:[
				{name:"マジカトロンピッケル", value:"mjc_pickaxe"},
				{name:"マジカトロンシャベル", value:"mjc_shovel"},
				{name:"マジカトロンソード", value:"mjc_sword"},
				{name:"星の導き", value:"star_guide"},
				{name:"赫灼大斧ラヴァン", value:"ravan"},
				{name:"ビール装備", value:"beer"},
				{name:"Master of Gold Fishing装備", value:"MGF"},
				{name:"Master of Treasure Fishing装備", value:"MTF"},
				{name:"マスターロッドZアイアンカスタム", value:"mrz_iron"},
				{name:"マスターロッドZゴールドカスタム", value:"mrz_gold"},
				{name:"マスターロッドZダイヤカスタム", value:"mrz_dia"},
				{name:"マスターロッドZエメラルドカスタム", value:"mrz_eme"},
				{name:"精霊の加護", value:"soul_protection"},
				{name:"Vortex Hurricane", value:"vortex"},
				{name:"Springスペランカーソード", value:"haruspe"},
				{name:"[復刻]Springスペランカーソード", value:"re_haruspe"},
				{name:"運上昇Lv5", value:"luck"},
				{name:"資源成長型ピッケルX AllCustom", value:"all_pic"},
				]
			}]
	},
		{name: "return", description: "共用品の返却記録をします。",
		options: [{
			type: "STRING",
			name: "item_name",
			description: "返却したいアイテムの名前を選択してください。",
			required: true,
			choices:[
				{name:"マジカトロンピッケル", value:"mjc_pickaxe"},
				{name:"マジカトロンシャベル", value:"mjc_shovel"},
				{name:"マジカトロンソード", value:"mjc_sword"},
				{name:"星の導き", value:"star_guide"},
				{name:"赫灼大斧ラヴァン", value:"ravan"},
				{name:"ビール装備", value:"beer"},
				{name:"Master of Gold Fishing装備", value:"MGF"},
				{name:"Master of Treasure Fishing装備", value:"MTF"},
				{name:"マスターロッドZアイアンカスタム", value:"mrz_iron"},
				{name:"マスターロッドZゴールドカスタム", value:"mrz_gold"},
				{name:"マスターロッドZダイヤカスタム", value:"mrz_dia"},
				{name:"マスターロッドZエメラルドカスタム", value:"mrz_eme"},
				{name:"精霊の加護", value:"soul_protection"},
				{name:"Vortex Hurricane", value:"vortex"},
				{name:"Springスペランカーソード", value:"haruspe"},
				{name:"[復刻]Springスペランカーソード", value:"re_haruspe"},
				{name:"運上昇Lv5", value:"luck"},
				{name:"資源成長型ピッケルX AllCustom", value:"all_pic"},
				]
			}]
	},
/*		{name: "mori", description: "森レイドの時間を指定します。",
		options: [{
			type: "INTEGER",
			name: "minute",
			description: "レイドが終了した時間を分で指定してください。",
			required: true
		}]
	},
*/
		{name: "dice",description: "ダイスを振ります。",
		options: [{
			type: "SUB_COMMAND",
			name: "tintiro",
			description: "チンチロリンの形式でダイスを振ります。",
		},{
			type: "SUB_COMMAND",
			name: "100",
			description: "100式ダイスを振ります。",
		},{
			type: "SUB_COMMAND",
			name: "custom",
			description: "カスタムするダイスを振ります。",
			options: [{
				type: "INTEGER",
				name: "個数",
				description: "振るダイスの個数を指定してください。",
				required: true
			},{
				type: "INTEGER",
				name: "最大値",
				description: "振るダイスの最大値を指定してください。",
				required: true
				}]
		}]
	}
];
	const data2 = [{name: "test", description: "テスト用コマンドです。bot管理者のみ使用できます。",
		options: [{
			type: "SUB_COMMAND",
			name: "nofi",
			description: "nofi test"
		}]
	},
		{name: "recipe", description: "lifeのレシピを参照します。",
		options: [{
			type: "STRING",
			name: "item_name",
			description: "レシピを参照したいアイテムの名前を選択してください。",
			required: true,
			choices:[
				{name:"ミスリルインゴット", value:"mithril"},
				{name:"鋼鉄インゴット", value:"steel"},
				{name:"強化黒曜石", value:"reinforced_obsidian"},
				{name:"$成金ブロック$", value:"narikin"},
				{name:"複合鉱石の塊", value:"complex_ore"},
				{name:"― 赤熟した複合鉱石の塊 ―", value:"ripe_red_complex_ore"},
				{name:"超強力冷却剤", value:"super_strong_coolant"},
				{name:"ΟριχαρόνIngot(オリハルコン)", value:"orichalcum"},
				{name:"青き魔力の源", value:"blue_magical_power"},
				{name:"赤き燃力の源", value:"red_burning_power"},
				{name:"マジカトロン結晶", value:"majicatron_crystal"},
				{name:"水バケツ圧縮チケット", value:"water_ticket"},
				{name:"海洋の心", value:"ocean_heart"},
				{name:"スポンジ", value:"sponge"},
				{name:"超合金ドリルクァーリー", value:"super_duranium_drill"},
				{name:"超合金ドリルクァーリー(強化)", value:"super_duranium_drill_upgrade"},
				{name:"ヘルメスの斧", value:"axe_of_helmes"},
				{name:"アイスソード(極含む)", value:"ice_sword"},
				{name:"キュアステッキ", value:"cure_stick"},
				{name:"Godlyマナロッド", value:"godly_mana_rod"}, 
				]
			}]
	},];
	await client.application.commands.set(data, svid);
	await client.application.commands.set(data2);
});
client.on('interactionCreate', async (interaction) => {//コマンド・ボタン処理
	if (!interaction.isCommand()) {//コマンド、ボタンでないものをはじく
		if(!interaction.isButton()) {
			return;
		}
	}
	if (interaction.commandName === 'wiki') {
			logger("command");
			await interaction.reply({ content: "公式wikiトップページ : https://tinyurl.com/2lj858o9 \nアイテムリスト : https://tinyurl.com/2a9hlk89 \npet : https://azisabaofficial.playing.wiki/d/MyPet \n非公式wikiトップページ : https://azisaba-hikousiki-life.memo.wiki/ \nFF map : https://tinyurl.com/24a7gz34 \npve ドロップ早見表 : https://tinyurl.com/24tayden \n圧倒的ネタバレ : https://tinyurl.com/2btvntcn \n一部短縮URLです。悪質なサイトにはいきません。\nページは随時追加予定。追加の要望はDMにお願いします。", ephemeral: true});
	}
	if (interaction.commandName === 'recipe') print(interaction);
	if (interaction.commandName === 'rental') rental(interaction);
	if (interaction.commandName === 'return') {
			logger("command");
			const buttonyes = new MessageButton().setCustomId('yes').setStyle("SUCCESS").setLabel('はい');
			const buttonno = new MessageButton().setCustomId('no').setStyle("DANGER").setLabel('いいえ');
			switch (interaction.options.getString('item_name')) {
			case 'mjc_pickaxe': 
				if (rental['mjc_pic'] === 1) {
                              		return_current['mjc_pic'] = 1;
                                	await interaction.reply({
                                		content: "マジカトロンピッケルを返却しますか？",
                                   	    	components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
                                   	   	ephemeral: true
                                	})
                        	}
                      		if (rental['mjc_pic'] === 0) {
                                	await interaction.reply({
                                        	content: "現在マジカトロンピッケルは貸し出されていません。借りる場合は/rentalを使用してください。",
                                        	ephemeral: true
                                	})
                        	}
				break;
			case 'mjc_shovel':
				if (rental['mjc_sho'] === 1) {
					return_current['mjc_sho'] = 1;
					await interaction.reply({
						content: "マジカトロンショベルを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['mjc_sho'] === 0) {
					await interaction.reply({
						content: "現在マジカトロンショベルは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'mjc_sword':
				if (rental['mjc_swo'] === 1) {
					return_current['mjc_swo'] = 1;
					await interaction.reply({
						content: "マジカトロンソードを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['mjc_swo'] === 0) {
					await interaction.reply({
						content: "現在マジカトロンソードは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'star_guide':
				if (rental['star_guide'] === 1) {
					return_current['star_guide'] = 1;
					await interaction.reply({
						content: "星の導きを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['star_guide'] === 0) {
					await interaction.reply({
						content: "現在星の導きは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'ravan':
				if (rental['ravan'] === 1) {
					return_current['ravan'] = 1;
					await interaction.reply({
						content: "赫灼大斧ラヴァンを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['ravan'] === 0) {
					await interaction.reply({
						content: "現在赫灼大斧ラヴァンは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'beer':
				if (rental['beer'] >= 1) {
					return_current['beer'] = 1;
					await interaction.reply({
						content: "ビール装備を返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['beer'] === 0) {
					await interaction.reply({
						content: "現在ビール装備は貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'MGF':
				if (rental['MGF'] >= 1) {
					return_current['MGF'] = 1;
					await interaction.reply({
						content: "Master of Gold Fishing装備を返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['MGF'] === 0) {
					await interaction.reply({
						content: "現在Master of Gold Fishing装備は貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'MTF':
				if (rental['MTF'] >= 1) {
					return_current['MTF'] = 1;
					await interaction.reply({
						content: "Master of Treasure Fishing装備を返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['MTF'] === 0) {
					await interaction.reply({
						content: "現在Master of Treasure Fishing装備は貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'mrz_iron':
				if (rental['mrz_iron'] >= 1) {
					return_current['mrz_iron'] = 1;
					await interaction.reply({
						content: "マスターロッドZアイアンカスタムを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['mrz_iron'] === 0) {
					await interaction.reply({
						content: "現在マスターロッドZアイアンカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'mrz_gold':
				if (rental['mrz_gold'] >= 1) {
					return_current['mrz_gold'] = 1;
					await interaction.reply({
						content: "マスターロッドZゴールドカスタムを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['mrz_gold'] === 0) {
					await interaction.reply({
						content: "現在マスターロッドZゴールドカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'mrz_dia':
				if (rental['mrz_dia'] >= 1) {
					return_current['mrz_dia'] = 1;
					await interaction.reply({
						content: "マスターロッドZダイヤカスタムを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['mrz_dia'] === 0) {
					await interaction.reply({
						content: "現在マスターロッドZダイヤカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'mrz_eme':
				if (rental['mrz_eme'] >= 1) {
					return_current['mrz_eme'] = 1;
					await interaction.reply({
						content: "マスターロッドZエメラルドカスタムを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['mrz_eme'] === 0) {
					await interaction.reply({
						content: "現在マスターロッドZエメラルドカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'soul_protection':
				if (rental['soul_protection'] >= 1) {
					return_current['soul_protection'] = 1;
					await interaction.reply({
						content: "精霊の加護を返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['soul_protection'] === 0) {
					await interaction.reply({
						content: "現在精霊の加護は貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'vortex':
				if (rental['vortex'] >= 1) {
					return_current['vortex'] = 1;
					await interaction.reply({
						content: "Vortex Hurricaneを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['vortex'] === 0) {
					await interaction.reply({
						content: "現在Vortex Hurricaneは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'haruspe':
				if (rental['haruspe'] >= 1) {
					return_current['haruspe'] = 1;
					await interaction.reply({
						content: "Springスペランカーソードを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['haruspe'] === 0) {
					await interaction.reply({
						content: "現在Springスペランカーソードは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 're_haruspe':
				if (rental['re_haruspe'] >= 1) {
					return_current['re_haruspe'] = 1;
					await interaction.reply({
						content: "[復刻]Springスペランカーソードを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['re_haruspe'] === 0) {
					await interaction.reply({
						content: "現在[復刻]Springスペランカーソードは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'luck':
				if (rental['luck'] >= 1) {
					return_current['luck'] = 1;
					await interaction.reply({
						content: "運上昇Lv5を返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['luck'] === 0) {
					await interaction.reply({
						content: "現在運上昇Lv5は貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
				break;
			case 'all_pic':
				if (rental['all_pic'] >= 1) {
					return_current['all_pic'] = 1;
					await interaction.reply({
						content: "資源成長型ピッケルX AllCustomを返却しますか？",
						components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
						ephemeral: true
					})
				}
				if (rental['all_pic'] === 0) {
					await interaction.reply({
						content: "現在資源成長型ピッケルX AllCustomは貸し出されていません。借りる場合は/rentalを使用してください。",
						ephemeral: true
					})
				}
			}
	}
	if (interaction.commandName === 'test') test(interaction);
/*	
if (interaction.commandName === 'mori') {
		var minute = interaction.options.getInteger('minute');
		if(minute < 0 || minute > 59){
			await interaction.reply({ content: "設定できません。0~59の範囲で入力してください。", ephemeral: true});
		}else{
			logger("command");
			job.cancel();
			await interaction.reply({ content: "森レイドの時間を"+minute+"分に設定しました。", ephemeral: false});
			if (minute >= 0 && minute <= 2) { minute += 60; }
			mori.minute = minute - 3;
			job.reschedule(mori);
		}
	}
*/
	if (interaction.commandName === 'dice') dice(interaction);
	if (interaction.customId === 'yes') {
		const channelrental = client.channels.cache.get(tex_rental);
		if (rental_current['mjc_pic'] === 1) {
			rental['mjc_pic'] = 1;
			await interaction.reply({
				content: "マジカトロンピッケルを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマジカトロンピッケルを借りました。`);
			rental_current['mjc_pic'] = 0;
		} 
		if (rental_current['mjc_sho'] === 1) {
			rental['mjc_sho'] = 1;
			await interaction.reply({
				content: "マジカトロンシャベルを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマジカトロンシャベルを借りました。`);
			rental_current['mjc_sho'] = 0;
		} 
		if (rental_current['mjc_swo'] === 1) {
			rental['mjc_swo'] = 1;
			await interaction.reply({
				content: "マジカトロンソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマジカトロンソードを借りました。`);
			rental_current['mjc_swo'] = 0;
		}
		if (rental_current['star_guide'] === 1) {
			rental['star_guide'] = 1;
			await interaction.reply({
				content: "星の導きを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが星の導きを借りました。`);
			rental_current['star_guide'] = 0;
		}
		if (rental_current['ravan'] === 1) {
			rental['ravan'] = 1;
			await interaction.reply({
				content: "赫灼大斧ラヴァンを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが赫灼大斧ラヴァンを借りました。`);
			rental_current['ravan'] = 0;
		}
		if (rental_current['beer'] === 1) {
			rental['beer'] = rental['beer'] + 1;
			await interaction.reply({
				content: "ビール装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがビール装備を借りました。`);
			rental_current['beer'] = 0;
		}
		if (rental_current['MGF'] === 1) {
			rental['MGF'] = rental['MGF'] + 1;
			await interaction.reply({
				content: "Master of Gold Fishing装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがMaster of Gold Fishing装備を借りました。`);
			rental_current['MGF'] = 0;
		}
		if (rental_current['MTF'] === 1) {
			rental['MTF'] = rental['MTF'] + 1;
			await interaction.reply({
				content: "Master of Treasure Fishing装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがMaster of Treasure Fishing装備を借りました。`);
			rental_current['MTF'] = 0;
		}
		if (rental_current['mrz_iron'] === 1) {
			rental['mrz_iron'] = rental['mrz_iron'] + 1;
			await interaction.reply({
				content: "マスターロッドZアイアンカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZアイアンカスタムを借りました。`);
			rental_current['mrz_iron'] = 0;
		}
		if (rental_current['mrz_gold'] === 1) {
			rental['mrz_gold'] = rental['mrz_gold'] + 1;
			await interaction.reply({
				content: "マスターロッドZゴールドカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZゴールドカスタムを借りました。`);
			rental_current['mrz_gold'] = 0;
		}
		if (rental_current['mrz_dia'] === 1) {
			rental['mrz_dia'] = rental['mrz_dia'] + 1;
			await interaction.reply({
				content: "マスターロッドZダイヤカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZダイヤカスタムを借りました。`);
			rental_current['mrz_dia'] = 0;
		}
		if (rental_current['mrz_eme'] === 1) {
			rental['mrz_eme'] = rental['mrz_eme'] + 1;
			await interaction.reply({
				content: "マスターロッドZエメラルドカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZエメラルドカスタムを借りました。`);
			rental_current['mrz_eme'] = 0;
		}
		if (rental_current['soul_protection'] === 1) {
			rental['soul_protection'] = rental['soul_protection'] + 1;
			await interaction.reply({
				content: "精霊の加護を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが精霊の加護を借りました。`);
			rental_current['soul_protection'] = 0;
		}
		if (rental_current['vortex'] === 1) {
			rental['vortex'] = rental['vortex'] + 1;
			await interaction.reply({
				content: "Vortex Harricaneを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがVortex Harricaneを借りました。`);
			rental_current['vortex'] = 0;
		}
		if (rental_current['haruspe'] === 1) {
			rental['haruspe'] = rental['haruspe'] + 1;
			await interaction.reply({
				content: "Springスペランカーソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがSpringスペランカーソードを借りました。`);
			rental_current['haruspe'] = 0;
		}
		if (rental_current['re_haruspe'] === 1) {
			rental['re_haruspe'] = rental['re_haruspe'] + 1;
			await interaction.reply({
				content: "[復刻]Springスペランカーソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが[復刻]Springスペランカーソードを借りました。`);
			rental_current['re_haruspe'] = 0;
		}
		if (rental_current['luck'] === 1) {
			rental['luck'] = rental['luck'] + 1;
			await interaction.reply({
				content: "運上昇Lv5を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが運上昇Lv5を借りました。`);
			rental_current['luck'] = 0;
		}
		if (rental_current['all_pic'] === 1) {
			rental['all_pic'] = rental['all_pic'] + 1;
			await interaction.reply({
				content: "資源成長型ピッケルX AllCustomを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが資源成長型ピッケルX AllCustomを借りました。`);
			rental_current['all_pic'] = 0;
		}
		//ここから返却
		if (return_current['mjc_pic'] === 1) {
			rental['mjc_pic'] = 0;
			await interaction.reply({
				content: "マジカトロンピッケルを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマジカトロンピッケルを返却しました。`);
			return_current['mjc_pic'] = 0;
		}
		if (return_current['mjc_sho'] === 1) {
			rental['mjc_sho'] = 0;
			await interaction.reply({
				content: "マジカトロンショベルを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマジカトロンショベルを返却しました。`);
			return_current['mjc_sho'] = 0;
		}
		if (return_current['mjc_swo'] === 1) {
			rental['mjc_swo'] = 0;
			await interaction.reply({
				content: "マジカトロンソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマジカトロンソードを返却しました。`);
			return_current['mjc_swo'] = 0;
		}
		if (return_current['star_guide'] === 1) {
			rental['star_guide'] = 0;
			await interaction.reply({
				content: "星の導きを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが星の導きを返却しました。`);
			return_current['star_guide'] = 0;
		}
		if (return_current['ravan'] === 1) {
			rental['ravan'] = 0;
			await interaction.reply({
				content: "赫灼大斧ラヴァンを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが赫灼大斧ラヴァンを返却しました。`);
			return_current['ravan'] = 0;
		}
		if (return_current['beer'] === 1) {
			rental['beer'] = rental['beer'] - 1;
			await interaction.reply({
				content: "ビール装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがビール装備を返却しました。`);
			return_current['beer'] = 0;
		}
		if (return_current['MGF'] === 1) {
			rental['MGF'] = rental['MGF'] - 1;
			await interaction.reply({
				content: "Master of Gold Fishing装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがMaster of Gold Fishing装備を返却しました。`);
			return_current['MGF'] = 0;
		}
		if (return_current['MTF'] === 1) {
			rental['MTF'] = rental['MTF'] - 1;
			await interaction.reply({
				content: "Master of Treasure Fishing装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがMaster of Treasure Fishing装備を返却しました。`);
			return_current['MTF'] = 0;
		}
		if (return_current['mrz_iron'] === 1) {
			rental['mrz_iron'] = rental['mrz_iron'] - 1;
			await interaction.reply({
				content: "マスターロッドZアイアンカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZアイアンカスタムを返却しました。`);
			return_current['mrz_iron'] = 0;
		}
		if (return_current['mrz_gold'] === 1) {
			rental['mrz_gold'] = rental['mrz_gold'] - 1;
			await interaction.reply({
				content: "マスターロッドZゴールドカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZゴールドカスタムを返却しました。`);
			return_current['mrz_gold'] = 0;
		}
		if (return_current['mrz_eme'] === 1) {
			rental['mrz_eme'] = rental['mrz_eme'] - 1;
			await interaction.reply({
				content: "マスターロッドZエメラルドカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZエメラルドカスタムを返却しました。`);
			return_current['mrz_eme'] = 0;
		}
		if (return_current['mrz_dia'] === 1) {
			rental['mrz_dia'] = rental['mrz_dia'] - 1;
			await interaction.reply({
				content: "マスターロッドZダイヤカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがマスターロッドZダイヤカスタムを返却しました。`);
			return_current['mrz_dia'] = 0;
		}
		if (return_current['soul_protection'] === 1) {
			rental['soul_protection'] = rental['soul_protection'] - 1;
			await interaction.reply({
				content: "精霊の加護を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが精霊の加護を返却しました。`);
			return_current['soul_protection'] = 0;
		}
		if (return_current['vortex'] === 1) {
			rental['vortex'] = rental['vortex'] - 1;
			await interaction.reply({
				content: "Vortex Harricaneを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがVortex Harricaneを返却しました。`);
			return_current['vortex'] = 0;
		}
		if (return_current['haruspe'] === 1) {
			rental['haruspe'] = rental['haruspe'] - 1;
			await interaction.reply({
				content: "Springスペランカーソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんがSpringスペランカーソードを返却しました。`);
			return_current['haruspe'] = 0;
		}
		if (return_current['re_haruspe'] === 1) {
			rental['re_haruspe'] = rental['re_haruspe'] - 1;
			await interaction.reply({
				content: "[復刻]Springスペランカーソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが[復刻]Springスペランカーソードを返却しました。`);
			return_current['re_haruspe'] = 0;
		}
		if (return_current['luck'] === 1) {
			rental['luck'] = rental['luck'] - 1;
			await interaction.reply({
				content: "運上昇Lv5を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが運上昇Lv5を返却しました。`);
			return_current['luck'] = 0;
		}
		if (return_current['all_pic'] === 1) {
			rental['all_pic'] = rental['all_pic'] - 1;
			await interaction.reply({
				content: "資源成長型ピッケルX AllCustomを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			await channelrental.send(`${interaction.member.displayName}さんが資源成長型ピッケルX AllCustomを返却しました。`);
			return_current['all_pic'] = 0;
		}
	}
	if (interaction.customId === 'no') {
		if (rental_current['mjc_pic'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mjc_pic'] = 0;
		}
		if (rental_current['mjc_sho'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mjc_sho'] = 0;
		}
		if (rental_current['mjc_swo'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mjc_swo'] = 0;
		}
		if (rental_current['star_guide'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['star_guide'] = 0;
		}
		if (rental_current['mrz_iron'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mrz_iron'] = 0;
		}
		if (rental_current['mrz_eme'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mrz_eme'] = 0;
		}
		if (rental_current['mrz_dia'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mrz_dia'] = 0;
		}
		if (rental_current['mrz_gold'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['mrz_gold'] = 0;
		}
		if (rental_current['soul_protection'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['soul_protection'] = 0;
		}
		if (rental_current['vortex'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['vortex'] = 0;
		}
		if (rental_current['haruspe'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['haruspe'] = 0;
		}
		if (rental_current['re_haruspe'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['re_haruspe'] = 0;
		}
		if (rental_current['luck'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['luck'] = 0;
		}
		if (rental_current['all_pic'] === 1) {
			await interaction.reply({
				content: "キャンセルしました。",
				ephemeral: true,
				fetchReply: true
			});
			rental_current['all_pic'] = 0;
		}
	}
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
try {
	client.login();//ログイン
	console.log('Discordサービスへの接続に成功しました。');
} catch (error) {
	console.error('Discordサービスへの接続に失敗。プロセスを終了します。',error);
	process.exit(1);
}