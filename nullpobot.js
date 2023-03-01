const { Client, Intents, Role, MessageEmbed, MessageManager } = require('discord.js');
if(process.env.NODE_ENV !== 'heroku') {
	process.env.NODE_ENV === 'default';
} 
const config = require('config');
const logger = require('./nullpo/log/logger.js');
const delete_logger = require('./nullpo/log/delete_logger.js');
all_log = 0,join_log = 0,move_log = 0,leave_log = 0,clock_log = 0,restart_log = 0,command_log = 0,delete_log = 0,unknown_log = 0;
const dice = require('./nullpo/command/dice/dice.js');
const update_from_db = require('./nullpo/components/update_from_db.js');
const print = require('./nullpo/command/recipe/print.js');
const test = require('./nullpo/command/test/test.js');
const rental_command = require('./nullpo/command/rental/rental.js');
const return_command = require('./nullpo/command/return/return.js');
const yes_button = require('./nullpo/components/button/yes.js');
const no_button = require('./nullpo/components/button/no.js');
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',nullpo_debug_server_id = '979084665958834216';
const nullpo_admin_log = '997341001809133588',nullpo_casino_admin_log = '1042484015720042546',nullpo_debug_test = '986475538770194432';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.MESSAGE_CONTENT, Intents.FLAGS.GUILD_MESSAGES] });
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
const vc_atumare = '997274624045879407',vc_pjsekai = '981173824294879322',vc_apex = '992161885862502400',vc_music = '982523943309180978',vc_spla = '1017431011442819142';
const svid = '966674976956645407',ncsvid = '1015585928779137105';
const mori = new schedule.RecurrenceRule();
mori.minute = 0;
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
client.on('ready', () => {
	const tips = ["Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます","life本鯖の再起動は5時、16時です","どうでもいいTipsです。追加希望はtaku1417のDMまで。",/*"コマンドはキーボードの↑キーで一つ前の自分が打ったコマンドを入力省略できるが、しかしこれでは種などの購入と圧縮を繰り返す作業には不向きである、そこで二度↑キーを押すと2つ前の自分が打ったコマンドに戻れる。これで/shopと/rguiを簡単に交互に実行することができる",*/"きりんとねこの身長が180cmなのは嘘である。本当は270cmである","パンに生ハムを乗せると美味しい","薄皮一枚無いスキンをもとに戻したい場合はF3+H","このbotはHerokuというサービス上で稼働しています","あおいんは逆転ものも好き","しまりんはそこまで地上絵が好きじゃない","Monocraftは0時、JMSは9時に投票が可能になります","実はあもさんは下ネタが嫌い","うおみーの言うことは全て嘘","でも実は本当","って言ってるのも嘘かもしれない","でも実は嘘","初めましてronpenです 初めてすぐに10m獲得しました() まだまだ分からないことしかないので色々教えてくれたら嬉しいです","ぬるぽ語録集はVCで生まれた名(迷)言をまとめたものです","この鯖には実に60個ものロールが存在します","畑では植え直しを忘れずに。","木こりは稼げません、マジで。","lifeには統合版でもアクセスできます","釣りをしていると出てくる心の闇は、どこかに座っていると攻撃を大体回避できます","/wikiと打つと主要なwikiページを見ることが出来ます","/recipeと打つとlife独自レシピを見ることが出来ます。レシピは随時追加。","/rentalと打つと貸出記録をbotがやってくれます","/returnと打つと返却記録をbotがやってくれます","真のSはMの天才だし、真のMはSの天才である。それが僕の持論ですね。~LingThai~","しまりんかわいいね","堅あげポテトで口内炎ができるやつ落ち着きがない","命を知ろう〜バイシクル川崎の生体について〜\n一日に生まれるバイシクル川崎のうち約9割がバイク川崎になれないと言われています。\nそしてバイク川崎になれなかったバイシクル川崎の過半数は自然淘汰に対抗するためにコックカワサキへと姿を変えるのです","美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。","本鯖以外のlife系列サーバーは、重くなると再起動されます。"];

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
		channelncnofi.send(`<@&1018040272506069042> life本鯖再起動まであと10分です。__**回路が動かなくなるため、再起動が終わるまでは回さないようお願いします。**__`)
		logger("clock");
	})//アジ鯖再起前
	cron.schedule('0 5 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。**まもなくlife系列を除くアジ鯖全体、life本鯖再起動です。**`)
		logger("restart");
	})//アジ鯖再起
	cron.schedule('50 15 * * *', () => {
		channeljihou.send(`__**life本鯖再起動まであと10分です。**__`);
		channelncnofi.send(`<@&1018040272506069042> life本鯖再起動まであと10分です。__**回路が動かなくなるため、再起動が終わるまでは回さないようお願いします。**__`)
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
	cron.schedule('0 18 10,25 * *', () => {
		channeljihou.send(`**<@431843298588622858> Prince鯖にログインしましょう。**`)
		logger("clock");
	})//ナショさん用のリマインド(毎月10日と25日の18時)
});
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
	},{name: "rental", description: "共用品の貸借記録をします。",
		options: [{
			type: "STRING",
			name: "item_name",
			description: "貸し出したいアイテムの名前を選択してください。",
			required: true,
			choices:[
				{name:"マジカトロンピッケル", value:"mjc_pic"},
				{name:"マジカトロンシャベル", value:"mjc_sho"},
				{name:"マジカトロンソード", value:"mjc_swo"},
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
				{name:"運上昇Lv5", value:"luck"},
				{name:"資源成長型ピッケルX AllCustom", value:"all_pic"},
				{name:"GOLD RUSH装備", value:"GR"},
				{name:"原初装備", value:"origin"},
				{name:"ΟριχαρόνIngot(オリハルコン)装備", value:"orichal"},
				{name:"[復刻]妖刀「白狐」", value:"youtou"},
				{name:"思念の獄炎", value:"gokuen"},
				{name:"壊世錫杖レクイエム", value:"requiem"},
				{name:"ffggrロッド Rank4", value:"ffggr"},
				{name:"枯れた心", value:"枯れた心"},
				/*{name:"Envenom Merge", value:"envenom"},
				{name:"【AZI SAVIOR】", value:"AZI"},
				{name:"昇土龍拳サック", value:"sac"},
				{name:"星龍の弓_Vega_", value:"vega"},
				{name:"フルドラゴンアーマーチェストプレート", value:"fulldora"},
				{name:"炎廃業", value:"炎廃業"}*/
				]
			}]
	},{name: "return", description: "共用品の返却記録をします。",
		options: [{
			type: "STRING",
			name: "item_name",
			description: "返却したいアイテムの名前を選択してください。",
			required: true,
			choices:[
				{name:"マジカトロンピッケル", value:"mjc_pic"},
				{name:"マジカトロンシャベル", value:"mjc_sho"},
				{name:"マジカトロンソード", value:"mjc_swo"},
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
				{name:"運上昇Lv5", value:"moriDoll"},
				{name:"資源成長型ピッケルX AllCustom", value:"all_pic"},
				{name:"GOLD RUSH装備", value:"GR"},
				{name:"原初装備", value:"origin"},
				{name:"ΟριχαρόνIngot(オリハルコン)装備", value:"orichal"},
				{name:"[復刻]妖刀「白狐」", value:"youtou"},
				{name:"思念の獄炎", value:"gokuen"},
				{name:"壊世錫杖レクイエム", value:"requiem"},
				{name:"ffggrロッド Rank4", value:"ffggr"},
				{name:"枯れた心", value:"枯れた心"},
				/*{name:"Envenom Merge", value:"envenom"},
				{name:"【AZI SAVIOR】", value:"AZI"},
				{name:"昇土龍拳サック", value:"sac"},
				{name:"星龍の弓_Vega_", value:"vega"},
				{name:"フルドラゴンアーマーチェストプレート", value:"fulldora"},
				{name:"炎廃業", value:"炎廃業"}*/
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
	},{name: "recipe", description: "lifeのレシピを参照します。",
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
	}];
	await client.application.commands.set(data, svid);
	await client.application.commands.set(data2);
});
client.on('interactionCreate', async (interaction) => {//コマンド・ボタン処理
	const tex_rental = '981371600203046964';
	channelrental = client.channels.cache.get(tex_rental);
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
	if (interaction.commandName === 'rental') rental_command(interaction);
	if (interaction.commandName === 'return') return_command(interaction);
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
	if (interaction.customId === 'yes') yes_button(interaction);
	if (interaction.customId === 'no') no_button(interaction);
});
client.on('messageDelete', message => {
	logger("delete");
	const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
	const author_with_nick = (message.member.nickname != null ? (message.author.tag + ' (' + message.member.nickname + ')') : message.author.tag);
	let has_content;
	if(message.attachments.first() != null) {
	has_content = (message.attachments.first().contentType?.startsWith("image" || "movie") ? true : false);
	} else {
		has_content = false;
	}
	//const channelInput = (message.channel != null ? String(message.channel) : '不明なチャンネル');
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
                        client.guilds.cache.get(nullpo_debug_server_id).channels.cache.get(nullpo_debug_test).send({embeds: [embed]}).then(msg => {
				/*if(has_content == true) {
					msg.edit({
						embeds: [{
							description: String(message.channel) + 'にてメッセージが削除されました。',
							files: [
								//Array.from(message.attachments.values())
							],
						}]
					})
				}*/
			});
			const atta = message.attachments;
			console.log(Array.from(atta.values()));
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
		}, 15000);
	}, 20000)
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
