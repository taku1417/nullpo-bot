const { Client, Intents, Role } = require('discord.js');
const logger = require('./nullpo/log/logger.js');
all_log = 0,join_log = 0,move_log = 0,leave_log = 0,clock_log = 0,restart_log = 0,command_log = 0,unknown_log = 0;
const dice = require('./nullpo/command/dice/dice.js');
const update_from_db = require('./nullpo/components/update_from_db.js');
const print = require('./nullpo/command/recipe/print.js');
const test = require('./nullpo/command/test/test.js');
const rental_command = require('./nullpo/command/rental/rental.js');
const return_command = require('./nullpo/command/return/return.js');
const yes_button = require('./nullpo/components/button/yes.js');
const no_button = require('./nullpo/components/button/no.js');
const voiceInOut = require('./nullpo/components/voiceinout.js');
const cron_schedule = require('./nullpo/components/schedule.js');

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
vc_atumare = '997274624045879407',vc_pjsekai = '981173824294879322',vc_apex = '992161885862502400',vc_music = '982523943309180978',vc_spla = '1017431011442819142';
tex_dblog = '979084899703218186',tex_jllog = '978962695418155019',tex_jihou = '997274370122731611',tex_pjsekai = '999675995936280717',tex_nlpcs_nofi = '1015852168810606592';
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
client.on('voiceStateUpdate', (oldState, newState) => voiceInOut(oldState, newState));
client.on('ready', () => cron_schedule());
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