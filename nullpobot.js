const { Client, GatewayIntentBits, Collection, REST, Routes, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require('discord.js');
const config = require('config');
const fs = require('node:fs');
const path = require('node:path');
const log4js = require('log4js');
logger = log4js.getLogger();
logger.level = (process.env.NODE_ENV === 'heroku' ? 'info' : 'debug');//herokuの場合はinfo,それ以外はdebug 適宜変更
/* nullpo-botにおけるログレベルの意味
trace: 独自実装部の細かいログ debug程常に必要でないときに使用 例:定時処理中の進捗
debug: 独自実装部での、導入前にconsole.logで出力していたもの 例:定時処理開始,終了やコマンドの実行
info: 通常のログ 例:bot起動時や回数ログ(nplogger)
warn: 予期していて(catchしている)、無視できるエラー もしくは、エラーでないが注意が必要なもの 例:コマンドの実行エラー
error: 予期していて(catchしている)、無視できないがすぐには措置が必要でないエラー 例:dbの接続エラー
fatal: 予期していて(catchしている)、直ちに措置が必要なエラー 例:discord APIへの接続エラー
fatalを除くプロセス停止を伴うエラー: 予期していない(catchしていない)エラー

なお、これに準拠していない場合もある。
*/
if(process.env.NODE_ENV !== 'heroku') {
	process.env.NODE_ENV === 'default';
} 
const throw_webhook = require('./function/throw_webhook.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences
	]
});
const VisualTimer = require('./nullpo/Built-inModule/VisualTimer/index.js');
const nplogger = require('./nullpo/log/logger.js');
//const delete_logger = require('./nullpo/log/delete_logger.js');
all_log = 0,join_log = 0,move_log = 0,leave_log = 0,clock_log = 0,restart_log = 0,command_log = 0,message_log = 0,unknown_log = 0;
const dbclient = require('./nullpo/Built-inModule/database/index.js');
const yes_button = require('./nullpo/components/button/rental_return/yes.js');
const no_button = require('./nullpo/components/button/rental_return/no.js');
const VoiceChatCreate = require('./nullpo/components/button/VC/VoiceChatCreate.js');
const cronjob = require('./nullpo/events/cron.js');
const nullpo_server_id = '966674976956645407',nullpo_casino_server_id = '1015585928779137105',nullpo_debug_server_id = '979084665958834216';
const nullpo_admin_log = '997341001809133588',nullpo_casino_admin_log = '1042484015720042546',nullpo_debug_test = '986475538770194432';
const botID = process.env.NODE_ENV === 'heroku' ? process.env.CLIENT_ID_prod : config.get('CLIENT_ID.PRODUCTION');const botID_debug = process.env.NODE_ENV === 'heroku' ? process.env.CLIENT_ID_DEBUG : config.get('CLIENT_ID.DEBUG');
visual_timer_parent = [];
visual_timer_current = [];
visual_timer_edit_count = 0;
client.Commands = new Collection();
client.slashCommands = new Collection();
commands_rest = [];
client.buttons = new Collection();
client.Commands_NullpoDebug = new Collection();
client.SlashCommands_NullpoDebug = new Collection();
Commands_rest_NullpoDebug = [];
const cron = require('node-cron');
const schedule = require('node-schedule');
const VCJoinLeaveCheck = require('./nullpo/components/VCJoinLeaveCheck.js');
const ServerLogChannelFinder = require('./nullpo/components/ServerLogChannelFinder.js');
const MessageUpdateLogger = require('./nullpo/log/message/update.js');
db_regist = [];
global_settings = {};
client.once('ready', () => {	
	client.user.setPresence({
		activities: [{
			name: `Starting up... | 起動中...`,
		}],
		status: "dnd"
	});
});
errorCount = 0,SuccessLogin = 0;
const tex_dblog = '979084899703218186',tex_jihou = '997274370122731611',tex_nlpcs_nofi = '1015852168810606592',tex_jllog = '978962695418155019',tex_pjsekai = '999675995936280717';
const vc_atumare = '997274624045879407',vc_pjsekai = '981173824294879322',vc_apex = '992161885862502400',vc_music = '982523943309180978',vc_spla = '1017431011442819142',vc_granblue = '1083006425791463494';
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
//以下をいずれ別ファイルへまとめたい
client.on('voiceStateUpdate', (oldState, newState) =>	{
	const channeljllog = client.channels.cache.get(tex_jllog), channelatumare = oldState.member.guild.channels.cache.get(vc_atumare), channelvcpjsekai = oldState.member.guild.channels.cache.get(vc_pjsekai), channelapex = oldState.member.guild.channels.cache.get(vc_apex),channelmusic = oldState.member.guild.channels.cache.get(vc_music),Ochanneljihou = oldState.member.guild.channels.cache.get(tex_jihou),channelpjsekai = oldState.member.guild.channels.cache.get(tex_pjsekai),channelspla = oldState.member.guild.channels.cache.get(vc_spla),channelgranblue = oldState.member.guild.channels.cache.get(vc_granblue);
	logger.trace('[Djs c:on] VoiceStateUpdate');

	VCJoinLeaveCheck(client, oldState, newState);

	if (oldState.channelId === null && newState.channelId === vc_atumare) {
		nplogger("join");
		channelatumare.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🌸あつまれVCに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🌸あつまれVCに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_pjsekai) {
		nplogger("join");
		channelpjsekai.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		channelvcpjsekai.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		//Ochanneljihou.send(`**入室** 🎼プロセカルームに${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🎼プロセカルームに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_spla) {
		nplogger("join");
		channelspla.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🦑スプラキッズに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🦑スプラキッズに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_apex) {
		nplogger("join");
		channelapex.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 💥APEXルームに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 💥APEXルームに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_granblue) {
		nplogger("join");
		channelgranblue.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🐲グラブルルームに ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🐲グラブルルームに ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === null && newState.channelId === vc_music) {
		nplogger("join");
		channelmusic.send(`__**入室** ${oldState.member.displayName} さんが入室しました。__`);
		Ochanneljihou.send(`**入室** 🎧音楽鑑賞に ${oldState.member.displayName} さんが入室しました。`);
		return channeljllog.send(`**入室** 🎧音楽鑑賞に ${oldState.member.displayName} さんが入室しました。`);
	}
	else if (oldState.channelId === (vc_pjsekai || vc_spla || vc_apex || vc_music || vc_granblue) && newState.channelId === vc_atumare) {
		nplogger("move");
		channelatumare.send(`__**移動** 🌸あつまれVCに ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🌸あつまれVCに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🌸あつまれVCに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_spla || vc_apex || vc_music || vc_granblue) && newState.channelId === vc_pjsekai) {
		nplogger("move");
		channelpjsekai.send(`__**移動** プロセカルームに ${oldState.member.displayName} さんが移動しました。__`);
		channelvcpjsekai.send(`__**移動** プロセカルームに ${oldState.member.displayName} さんが移動しました。__`);
		//Ochanneljihou.send(`**移動** 🎼プロセカルームに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🎼プロセカルームに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_apex || vc_music || vc_granblue) && newState.channelId === vc_spla) {
		nplogger("move");
		channelspla.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🦑スプラキッズに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🦑スプラキッズに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_music || vc_granblue) && newState.channelId === vc_apex) {
		nplogger("move");
		channelapex.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 💥APEXルームに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 💥APEXルームに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_music) && newState.channelId === vc_granblue) {
		nplogger("move");
		channelgranblue.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🐲グラブルルームに ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🐲グラブルルームに ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_granblue) && newState.channelId === vc_music) {
		nplogger("move");
		channelmusic.send(`__**移動** ${oldState.member.displayName} さんが移動しました。__`);
		Ochanneljihou.send(`**移動** 🎧音楽鑑賞に ${oldState.member.displayName} さんが移動しました。`);
		return channeljllog.send(`**移動** 🎧音楽鑑賞に ${oldState.member.displayName} さんが移動しました。`);
	}
	else if (oldState.channelId === (vc_atumare || vc_pjsekai || vc_spla || vc_apex || vc_music || vc_granblue) && newState.channelId === null) {
		nplogger("leave");
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
	logger.trace('[Djs c:on] ready');
	cronjob;
	const tips = ["Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます","life本鯖の再起動は5時、16時です","どうでもいいTipsです。追加希望はtaku1417のDMまで。","きりんとねこの身長が180cmなのは嘘である。本当は270cmである","パンに生ハムを乗せると美味しい","薄皮一枚無いスキンをもとに戻したい場合はF3+H","このbotはHerokuというサービス上で稼働しています","あおいんは逆転ものも好き","しまりんはそこまで地上絵が好きじゃない","Monocraftは0時、JMSは9時に投票が可能になります","実はあもさんは下ネタが嫌い","うおみーの言うことは全て嘘","でも実は本当","って言ってるのも嘘かもしれない","でも実は嘘","初めましてronpenです 初めてすぐに10m獲得しました() まだまだ分からないことしかないので色々教えてくれたら嬉しいです","ぬるぽ語録集はVCで生まれた名(迷)言をまとめたものです","この鯖には実に60個ものロールが存在します","畑では植え直しを忘れずに。","木こりは稼げません、マジで。","lifeには統合版でもアクセスできます","釣りをしていると出てくる心の闇は、どこかに座っていると攻撃を大体回避できます","/wikiと打つと主要なwikiページを見ることが出来ます","/recipeと打つとlife独自レシピを見ることが出来ます。レシピは随時追加。","/rentalと打つと貸出記録をbotがやってくれます","/returnと打つと返却記録をbotがやってくれます","真のSはMの天才だし、真のMはSの天才である。それが僕の持論ですね。~LingThai~","しまりんかわいいね","堅あげポテトで口内炎ができるやつ落ち着きがない","命を知ろう〜バイシクル川崎の生体について〜\n一日に生まれるバイシクル川崎のうち約9割がバイク川崎になれないと言われています。\nそしてバイク川崎になれなかったバイシクル川崎の過半数は自然淘汰に対抗するためにコックカワサキへと姿を変えるのです","美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。","本鯖以外のlife系列サーバーは、重くなると再起動されます。","男装男子の定義：女のように見える男が女が男装するときに着る服を着て最終的にギャップだらけになるおとこ"];

	const channeljihou = client.channels.cache.get(tex_jihou);
	const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);
	const channeltest = client.channels.cache.get('979084899703218186');

	logger.info(tips.length + "件のtipsを読み込みました。");

	cron.schedule('0 1-23 * * *', () => {
		channeljihou.send(`${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + "]");
		logger.trace('[cron] tips');
		nplogger("clock");
	})//tips(大体毎時)
	cron.schedule('0 0 * * *', () => {
		channeljihou.send(`${new Date().getMonth()+1}月${new Date().getDate()}日、${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + 	"]");
		logger.trace('[cron] tips,date change');
		nplogger("clock");
	})//tips(0時)
	cron.schedule('30 23 * * *', () => {
		channeljihou.send(`<@&1010053868987617310> **投票はしましたか？まもなくMonocraftで本日分の投票が出来なくなります。**`)
		logger.trace('[cron] vote reminder');
		nplogger("clock");
	})//投票リマインド
	//cron.schedule('0 4 * * *', () => {
		//channeljihou.send(`**只今より最大30分の__life全鯖__メンテナンスが行われます。**`)
		//nplogger("clock");
	//})//臨時
});

const CommandsPath = path.join(__dirname, '/nullpo/components/appCommand');
const CommandFiles = fs.readdirSync(CommandsPath).filter(file => file.endsWith('.js'));

logger.trace('[Djs] Start loading global commands');
for (const file of CommandFiles) {
	logger.trace(`[Djs g:cmd] load ${file}`);
	const command = require(`./nullpo/components/appCommand/${file}`);
	commands_rest.push(command.data.toJSON());
	if('data' in command && 'execute' in command) {
		logger.trace(`[Djs g:cmd] set ${command.data.name}`);
		client.Commands.set(command.data.name, command);
	}
}

const slashCommandsPath = path.join(__dirname, '/nullpo/SlashCommand');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

logger.trace('[Djs] Start loading global slash commands');
for (const file of slashCommandFiles) {
	logger.trace(`[Djs g:slcmd] load ${file}`);
	const filePath = path.join(slashCommandsPath, file);
	const command = require(filePath);
	commands_rest.push(command.data.toJSON());
	if ('data' in command && 'execute' in command) {
		logger.trace(`[Djs g:slcmd] set ${command.data.name}`);
		client.slashCommands.set(command.data.name, command);
	}
}

const buttonsPath = path.join(__dirname, '/nullpo/components/button');
const buttonsFolders = fs.readdirSync(buttonsPath);

for (const folder of buttonsFolders) {
	logger.trace(`loading ${folder} buttons`)
	const buttonsFiles = fs.readdirSync(`${buttonsPath}/${folder}`).filter(file => file.endsWith('.js'));
	if(buttonsFiles.length === 0) continue;
	for (const file of buttonsFiles) {
		logger.trace(`loading ${file}`)
		const button = require(`${buttonsPath}/${folder}/${file}`);
		if('data' in button && 'execute' in button) {
			client.buttons.set(button.data.data.custom_id, button);
			logger.trace(`button ${button.data.data.custom_id} loaded`)
		}
	}
}

const CommandsNDPath = path.join(__dirname, '/nullpo/components/appCommand/nullpo_debug');
const CommandNDFiles = fs.readdirSync(CommandsNDPath).filter(file => file.endsWith('.js'));

if(CommandNDFiles.length === 0) {
	logger.debug('no found nullpo_debug appCommand. Skip command registration.')
} else {
	logger.trace('[Djs] Start loading debug server commands');
	for (const file of CommandNDFiles) {
	logger.trace(`[Djs d:cmd] load ${file}`);
		const command = require(`./nullpo/components/appCommand/nullpo_debug/${file}`);
		Commands_rest_NullpoDebug.push(command.data.toJSON());
		if('data' in command && 'execute' in command) {
		logger.trace(`[Djs g:slcmd] load ${file}`);
			client.Commands_NullpoDebug.set(command.data.name, command);
		}
	}
}


const slashCommandsNDPath = path.join(__dirname, '/nullpo/SlashCommand/nullpo_debug');
const slashCommandNDFiles = fs.readdirSync(slashCommandsNDPath).filter(file => file.endsWith('.js'));

if(slashCommandNDFiles.length === 0) {
	logger.debug('no found nullpo_debug slashCommand. Skip command registration.')
} else {
	logger.trace('[Djs] Start loading debug server slash commands');
for (const file of slashCommandNDFiles) {
	logger.trace(`[Djs d:slcmd] load ${file}`);
		const command = require(`./nullpo/SlashCommand/nullpo_debug/${file}`);
		Commands_rest_NullpoDebug.push(command.data.toJSON());
		if ('data' in command && 'execute' in command) {
			logger.trace(`[Djs d:slcmd] load ${file}`);
		client.SlashCommands_NullpoDebug.set(command.data.name, command);
		}
	}
}

let rest;
if(process.env.NODE_ENV === 'heroku') {
rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
} else {
rest = new REST({ version: '10' }).setToken(config.get('DISCORD_TOKEN.DEBUG'));
}

(async () => {
	try {
		logger.debug('アプリケーションコマンドの登録開始');
		if (process.env.NODE_ENV === 'heroku') {
			logger.trace(`[Djs] put Global Commands`);
			await rest.put(
				Routes.applicationCommands(botID),
				{ body: commands_rest },
			);//production用 グローバルコマンドを登録する
			if (Commands_rest_NullpoDebug.length > 0) {
				logger.trace(`[Djs] put Debug Server Commands`);
				await rest.put(
					Routes.applicationGuildCommands(botID, nullpo_debug_server_id),
					{ body: Commands_rest_NullpoDebug },
				);//production用 nullpo_debugのサーバーコマンドを登録する
			} else logger.info("nullpo_debugのサーバーコマンドがありません。処理を飛ばします。");
		} else {
			logger.trace(`[Djs] put Global Commands`);
			await rest.put(
				Routes.applicationCommands(botID_debug),
				{ body: commands_rest },
			);//debug用 グローバルコマンドを登録する
			if (Commands_rest_NullpoDebug.length != 0) {
				logger.trace(`[Djs] put Debug Server Commands`);
				await rest.put(
					Routes.applicationGuildCommands(botID_debug, nullpo_debug_server_id),
					{ body: Commands_rest_NullpoDebug },
				);//debug用 nullpo_debugのサーバーコマンドを登録する
			} else logger.info("nullpo_debugのサーバーコマンドがありません。処理を飛ばします。");
		}
		logger.debug('アプリケーションコマンドの登録完了');
	} catch (error) {
		logger.error(error);
	}
})();

client.on('interactionCreate', async (interaction) => {//コマンド・ボタン処理
	logger.trace(`[Djs c.on] interactionCreate`);

	if (interaction.isChatInputCommand()){
		logger.trace(`[Djs slcmd] Checking command ${interaction.commandName}`);
		const resistered_command = interaction.client.slashCommands.get(interaction.commandName) || interaction.client.SlashCommands_NullpoDebug.get(interaction.commandName);
		if (!resistered_command) {
			logger.error(`No command matching ${interaction.commandName} was found.`);
			throw_webhook("error", "command search: No Command matching. →" + interaction.commandName, `${interaction.user.username}さんが実行。`, "slash command");
			interaction.reply({ content: '指定したコマンドが見つかりませんでした。コマンド名を確認して下さい。\nまた、このエラーは管理者に通知されました。改善されるまでお待ちください。', ephemeral: true })
			return;
		}
		try {
			logger.trace(`[Djs slcmd] Execute command ${interaction.commandName}`);
			await resistered_command.execute(interaction, client);
		} catch (error) {
			logger.error(`${interaction.commandName}(slash command)を実行できませんでした。`);
			throw_webhook("error", "command execute: Error executing. → " + interaction.commandName, error, "slash command");
			logger.error(error);
		}
	}
	if(interaction.isButton()){
		logger.trace(`[Djs btn] Checking button ${interaction.customId}`);
		const resistered_button = interaction.client.buttons.get((interaction.customId).replace(/\d/g, ''));
		if (!resistered_button) {
			logger.error(`${interaction.customId}に対応するボタンが見つかりませんでした。`);
			throw_webhook("error", "button search: No Button matching. → " + interaction.customId, `${interaction.user.username}さんが実行。`, "button");
			interaction.reply({ content: '指定したボタンが見つかりませんでした。このエラーは内部処理によるものです。\n管理者に通知しましたので、修正までお待ちください。\nまた、状況確認のため管理者よりDMをさせていただく場合がございます。DMが嫌な場合はお手数ですがその旨を遠慮なくお伝えください。', ephemeral: true })
			return;
		}
		try {
			await resistered_button.execute(interaction, client);
		} catch (error) {
			logger.error(`${interaction.customId}(button)を実行できませんでした。`);
			throw_webhook("error", "button execute: Error executing. → " + interaction.customId, error, "button");
			logger.error(error);
		}
		// if (interaction.customId === 'yes') yes_button(interaction);
		// if (interaction.customId === 'no') no_button(interaction);
		// if (interaction.customId === 'VoiceChatCreate') VoiceChatCreate(interaction);
	}
	if (interaction.isContextMenuCommand()){
		logger.trace(`[Djs mcmd] Checking command ${interaction.commandName}`);
		const resistered_context = interaction.client.Commands.get(interaction.commandName) || interaction.client.Commands_NullpoDebug.get(interaction.commandName);
		if (!resistered_context) {
			logger.error(`${interaction.commandName}に対応するコンテキストメニューコマンドが見つかりませんでした。`);
			throw_webhook("error", "context command search: No Command matching.", interaction.commandName, `${interaction.user.username}さんが実行。`, "context menu");
			interaction.reply({ content: '指定したコンテキストコマンドが見つかりませんでした。このエラーは内部処理によるものです。\n管理者に通知しましたので、修正までお待ちください。\nまた、状況確認のため管理者よりDMをさせていただく場合がございます。DMが嫌な場合はお手数ですがその旨を遠慮なくお伝えください。', ephemeral: true })
			return;
		}
		try {
			logger.trace(`[Djs mcmd] Execute command ${interaction.commandName}`);
			await resistered_context.execute(interaction);
		} catch (error) {
			logger.error(`${interaction.commandName}(Message context)を実行できませんでした。`);
			throw_webhook("error", "command execute: Error executing. → " + interaction.commandName, error, "message context menu");
			logger.error(error);
		}
		
	}
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
	logger.trace(`[Djs c:on] messageUpdate`);
	MessageUpdateLogger(client, oldMessage, newMessage);
});
client.on('messageDelete', message => {
	logger.trace(`[Djs c:on] messageDelete`);
	nplogger("delete");
	const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),Year = new Date().getFullYear();
	let author_with_nick;
	try {
		if(message.member.user.globalName != null) {
            author_with_nick = message.member.nickname != null ? (message.member.user.username + ' (' + message.member.displayName + ')') : (message.member.user.username + '(' + message.member.user.globalName + ')');
        } else { 
            author_with_nick = message.member.nickname != null ? (message.member.user.username + ' (' + message.member.displayName + ')') : message.member.user.username; 
        }//globalName = ユーザー表示名 / nickname = サーバー表示名
	} catch (error) {
		logger.error("\n\n" + error);
		return;
	}
        const embed = {
                color: 0xCC0000,
                description: String(message.channel) + 'にてメッセージが削除されました。',
                author: {
                        name: author_with_nick,
                        icon_url: message.author.displayAvatarURL(),
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
				if(message.author.bot == true) return;
				logger.trace("[Djs mdel] send message delete log");
				ServerLogChannelFinder(client, null, "メッセージログ", nullpo_server_id).send({embeds: [embed]});
				break;
			case nullpo_casino_server_id:
				if(message.author.bot == true) return;
				logger.trace("[Djs mdel] send message delete log");
				ServerLogChannelFinder(client, null, "メッセージログ", nullpo_casino_server_id).send({embeds: [embed]});
				break;
			case nullpo_debug_server_id:
				if(message.author.bot == true) return;
				logger.trace("[Djs mdel] send message delete log");
				ServerLogChannelFinder(client, null, "メッセージログ", nullpo_debug_server_id).send({embeds: [embed]});
				break;
			default:
					break;
        }
	//delete_logger(message);
});

client.once('ready', () => {
	logger.trace('[Djs c:once] ready');
	client.channels.cache.get(tex_dblog).send('ぬるぽbotが起動しました。');//デバッグ鯖のログに流れる
	
	const VCCembed = {
		color: 0xF0E68C,
		description: 'サブVC作成ボタン',
		fields: [{
			name: '概要',
			value: 'ボタンを押すとサブVCが作成されます。連続で3つ以上生成しようとしないでください。ボタンが戻らなくなることがあります。\n5分ごとに誰も居ないVCは削除されるようになっています。削除されない場合は管理者にお問い合わせください。\n作成されるVCのビットレートは192kbps、人数制限はありません。',
		}],
		fetchReply: true,
	};
	const VCCreateButton_sub = new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Success).setLabel('サブVCを作成する').setDisabled(false);
	const VCCreateButton_test = new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Success).setLabel('テストVCを作成する').setDisabled(false);

	if(process.env.NODE_ENV === 'heroku') client.channels.cache.get('1108678708480446535').messages.fetch('1108803775415730246').then(message => message.edit({components:[new ActionRowBuilder().addComponents([VCCreateButton_sub])]}));//ボタンを直す
	if(process.env.NODE_ENV === 'default') client.channels.cache.get('1108624508211966012').messages.fetch('1146451411681431603').then(message => message.edit({components:[new ActionRowBuilder().addComponents([VCCreateButton_test])]}));//ボタンを直す
});

client.on('ready', async () => {
	logger.trace('[Djs c:on] ready');
	const VCCreateButton_sub = new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Success).setLabel('サブVCを作成する').setDisabled(false);
	const VCCreateButton_test = new ButtonBuilder().setCustomId('VoiceChatCreate').setStyle(ButtonStyle.Success).setLabel('テストVCを作成する').setDisabled(false);
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

	setInterval(() => {
		logger.debug('[VCC] Start checking...');
		const VCC_list = ['テスト','サブ'];
		for (let i = 0; i < VCC_list.length; i++) {
			logger.trace('[VCC] Checking ' + VCC_list[i] + '...');
			try {
				for(let channel of client.channels.cache) {
					if ( String(channel[1].name).match(RegExp("\d*\-" + VCC_list[i])) && channel[1].type === ChannelType.GuildVoice) {
						if(channel[1].members.size === 0) {
							channel[1].delete().catch(error => logger.error(error));
							logger.debug('[VCC] VC removed: ' + channel[1].name);
						}
					}
				}
			} 	catch (error) {
				logger.warn("[VCC] VC削除のチェック中にエラーが発生しました。処理はスキップされます。\n\n" + error);
				throw_webhook("error", "VCC: An error occurred while checking VC deletion", error, "VCC");
			}
		}
		if(process.env.NODE_ENV === 'heroku') client.channels.cache.get('1108678708480446535').messages.fetch('1108803775415730246').then(message => message.edit({components:[new ActionRowBuilder().addComponents([VCCreateButton_sub])]}));//ボタンを直す
		if(process.env.NODE_ENV === 'default') client.channels.cache.get('1108624508211966012').messages.fetch('1146451411681431603').then(message => message.edit({components:[new ActionRowBuilder().addComponents([VCCreateButton_test])]}));//ボタンを直す
		logger.debug('[VCC] Check finished.');
	}, 300000);//5分ごとにVCCのチェック、誰も居ないなら削除 & ボタンを直す

	// setInterval(async () => {
	// 	const offlineBots = await client.guilds.cache.forEach(async (guild) => (await guild.members.fetch()).filter(
	// 		member => member.user.bot && member.presence.status === "offline"
	// 	));
	// 	await logger.trace(offlineBots);
	// 	const notification = await Object.values(offlineBots).map(member => member.id);
	// 	await notification.forEach(member => {
	// 		const botOnlineCheckEmbed = {
	// 			color: 0xCCCC00,
	// 			description: `<@${member.id}>がオフラインになっています。確認してください。`,
	// 			fields: [{
	// 			name: '日付',
	// 			value: Year + '/' + Month + '/' + Day + ' ' + Hour0 + ':' + Min0 + ':' + Sec0 + '(JST)',
	// 		}]};
	// 		ServerLogChannelFinder(client, null, "bot疎通確認ログ", guild.id).send(`<@270515939739566080>`, {embeds: [botOnlineCheckEmbed]});//オフラインならメッセージを送信
	// 	});
	// }, 10000);//10秒ごとにbotがオンラインかどうかを確認、オフラインならメッセージを送信

	global_settings = await dbclient.connection("SELECT * FROM global_settings;");
	logger.debug(global_settings);
	//guild関係ない設定を取得
	setInterval(async () => {
		global_settings = await dbclient.connection("SELECT * FROM global_settings;");
	}, global_settings[0].settings_reload_interval);//設定のリロード
	
	setInterval(() => {
		console.time("VTimer_refresh")
		logger.level = global_settings[0].log_level;//ログレベル
		VisualTimer.refresh(client);
		logger.debug(console.timeEnd("VTimer_refresh"));
	}, await global_settings[0].VTimer_refresh_interval);//VisualTimerの更新間隔
	
	const VCCembed = {
			color: 0xF0E68C,
			description: 'サブVC作成ボタン',
			fields: [{
				name: '概要',
				value: 'ボタンを押すとサブVCが作成されます。連続で3つ以上生成しようとしないでください。\n5分ごとに誰も居ないVCは削除されるようになっています。削除されない場合は管理者にお問い合わせください。\n作成されるVCのビットレートは192kbps、人数制限はありません。',
			}],
			fetchReply: true,
	};
	//client.channels.cache.get('1108678708480446535').send({embeds: [VCCembed],components:[new ActionRowBuilder().addComponents([VoiceChatCreate_button])]});
});//手動でボタンを設置する用


/*
const tryLogin = function(){
	if(errorCount < 3){//最大3回までリトライ
		try {
		client.login();//ログイン
		SuccessLogin = 1;//ログインに成功すると実行
		clearInterval(tryLogin);//下のsetIntervalを停止
		} catch (error) {
			logger.error('Discordサービスへの接続に失敗。15秒後にリトライします。',error);
			errorCount++;
		}
		if(SuccessLogin === 1){//ログインに成功していれば実行
			logger.info('Discordサービスへの接続に成功しました。');
			return;//ifから抜ける
		}
	} else {//4回目でこちらに
		logger.error('Discordサービスへの接続に指定回数失敗したため、プロセスを終了します。');
		process.exit(1);
	}
}
setInterval(tryLogin,15000);//15秒ごとにtryLoginを実行
*/
if(process.env.NODE_ENV === 'heroku'){
	try {
		client.login();//ログイン
		logger.info('Discord APIへの接続に成功しました。');
	} catch (error) {
		logger.fatal('Discord APIへの接続に失敗。プロセスを終了します。',error);
		throw_webhook("error", 'Discord APIへの接続:失敗', error, "");
		process.exit(1);
	}	
} else {
	try {
		client.login(config.get('DISCORD_TOKEN.DEBUG'));//ログイン
		logger.info('Discord APIへの接続に成功しました。');
	} catch (error) {
		logger.fatal('Discord APIへの接続に失敗。プロセスを終了します。',error);
		throw_webhook("error", 'Discord APIへの接続:失敗', error, "");
		process.exit(1);
	}	
}
