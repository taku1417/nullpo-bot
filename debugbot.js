const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });

const cron = require('node-cron');
const schedule = require('node-schedule');
const dotenv = require('dotenv');
const wait = require('util').promisify(setTimeout);
const mori = new schedule.RecurrenceRule();
let all_log = 0,join_log = 0,move_log = 0,leave_log = 0,clock_log = 0,restart_log = 0;

const vc_db = '986359187065946193',vc_db2 = '986359234637733948';
const tex_dblog = '979084899703218186',tex_dbjllog = '986361817884422185';
const svid_db = '979084665958834216';//debug鯖のid

dotenv.config();

client.once('ready', () => {
	console.log('起動完了!');
	client.channels.cache.get(tex_dblog).send('ぬるぽ**debug**botが起動しました。');
});


	client.on('voiceStateUpdate', (oldState, newState) => {
		const channel = oldState.member.guild.channels.cache.get(tex_dbjllog);

		if (oldState.channelId === null && newState.channelId === vc_db) {
			all_log = all_log + 1;
			join_log = join_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {join}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
			return channel.send(`**参加:one:** debugに${oldState.member.user.tag} さんが入室しました。`);
		}
		else if (oldState.channelId === null && newState.channelId === vc_db2) {
			all_log = all_log + 1;
			join_log = join_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {join}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
			return channel.send(`**参加:two:** debug-2に${oldState.member.user.tag} さんが入室しました。`);
		}
		else if (oldState.channelId === vc_db2 && newState.channelId === vc_db) {
			all_log = all_log + 1;
			move_log = move_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {move}     " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
			return channel.send(`**移動:one:** ${oldState.member.user.tag} さんがdebugに移動しました。`);
		}
		else if (oldState.channelId === vc_db && newState.channelId === vc_db2) {
			all_log = all_log + 1;
			move_log = move_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {move}     " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
			return channel.send(`**移動:two:** ${oldState.member.user.tag} さんがdebug-2に移動しました。`);
		}
		else if (oldState.channelId !== null && newState.channelId === null) {
			all_log = all_log + 1;
			leave_log = leave_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {leave}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
			return channel.send(`**退出:x:**  ${newState.member.user.tag} さんが退出しました。`);
		}
	});

	client.on('ready', () => {
  		cron.schedule('0 * * * *', () => {
     			const channel = client.channels.cache.get(tex_dblog)
    			channel.send(`${new Date().getHours()}時になりました。`)
    			all_log = all_log + 1;
   			clock_log = clock_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
     			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {clock}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
   		})
 	});
client.on('ready', () => {
	const tips = ["Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます","life本鯖の再起動は4時、5時(全体)、14時です","どうでもいいTipsです。追加希望はtaku1417のDMまで。",/*"コマンドはキーボードの↑キーで一つ前の自分が打ったコマンドを入力省略できるが、しかしこれでは種などの購入と圧縮を繰り返す作業には不向きである、そこで二度↑キーを押すと2つ前の自分が打ったコマンドに戻れる。これで/shopと/rguiを簡単に交互に実行することができる",*/"きりんとねこの身長が180cmなのは嘘である。本当は270cmである","パンに生ハムを乗せると美味しい","薄皮一枚無いスキンをもとに戻したい場合はF3+H","このbotはHerokuというサービス上で稼働しています","あおいんは逆転ものも好き","しまりんはそこまで地上絵が好きじゃない","Monocraftは0時、JMSは9時に投票が可能になります","実はあもさんは下ネタが嫌い","うおみーの言うことは全て嘘","でも実は本当","って言ってるのも嘘かもしれない","でも実は嘘","初めましてronpenです 初めてすぐに10m獲得しました() まだまだ分からないことしかないので色々教えてくれたら嬉しいです","ぬるぽ語録集はVCで生まれた名(迷)言をまとめたものです","福岡県北九州市小倉北区田町16-25 ルネサンスTOEIたまち801号室","この鯖には実に60個ものロールが存在します","畑では植え直しを忘れずに。",/*"清水虎之介 8月26日生まれおとめ座 血液型:A\n住所:福岡県北九州市小倉北区田町16‐25 ルネサンスTOEIたまち801号室 電話番号:09096074965\n父親は生きてるし、母は一生懸命育ててくれたし、ナイフはキャンプでしか使わないし、kunは嫌いだし、仮性包茎\n好きな食べ物はいちご、バジル、たけのこが入った炊き込みご飯\n嫌いな食べ物はきのこ、ピーマン、パイン、グリーンピース、コーン、ぶよぶよの脂 そしてにんじんがメインの料理\n趣味はゲーム、キャンプ、ドライブ、テニス\n好きなゲームはドラクエ、どうぶつの森、マインクラフト  嫌いなゲームはAPEX\n好きなライバーは花畑チャイカ、リゼ・ヘルエスタ、イブラヒム 好きなYoutuberは東海オンエア\n学歴は天籟寺保育所→北九州市立大谷小学校→北九州市立大谷中学校→九州国際大学付属高等学校→九州国際大学 学籍番号J20172\n車はHonda Vezel ナンバーは 北九州330 ね ・８２６\n逮捕歴なし、職質3回 彼女いません\n好きな体位は対面座位\nバイト先は資さんうどん鞘ヶ谷店\nTwitter iiTzShimmy\nInstagram nosuke13826\nps.初めましてうおみーです。初めてすぐに10m獲得してないので謙虚に頑張ってます。このサーバーにもだいぶ慣れてきましたが、まだまだ知識不足ですのでいろいろ教えていただけると嬉しいです。",*/"木こりは稼げません、マジで。","lifeには統合版でもアクセスできます","釣りをしていると出てくる心の闇は、どこかに座っていると地中に埋まって攻撃をほぼ回避できます","/wikiと打つと主要なwikiページを見ることが出来ます","/recipeと打つとlife独自レシピを見ることが出来ます。レシピは随時追加。","/rentalと打つと貸出記録をbotがやってくれます","/returnと打つと返却記録をbotがやってくれます","真のSはMの天才だし、真のMはSの天才である。それが僕の持論ですね。~LingThai~"];
	const tipslength = tips.length;
	const channeljihou = client.channels.cache.get(tex_dbjllog);
	console.log(tipslength + "件のtipsを読み込みました。");
	cron.schedule('0 * * * * *', () => {
		channeljihou.send(`[debug(毎分)]${new Date().getHours()}時になりました。` + "[Tips:" + tips[Math.floor(Math.random() * tips.length)] + "]");
	})
});//tips

/*
	client.on('ready', () => {
		cron.schedule('0 5,17 * * *', () => {
			const channel = client.channels.cache.get(tex_dblog)
			channel.send(`${new Date().getHours()}時になりました。**まもなく定期再起動です。**`)
			all_log = all_log + 1;
			restart_log = restart_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {restart}  " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
		})
	})
*/
/*
	client.on('ready', () => {
		cron.schedule('50 4,16 * * *', () => {
			const channel = client.channels.cache.get(tex_dblog)
			channel.send(`__**定期再起動まであと10分です。**__`)
			all_log = all_log + 1;
			clock_log = clock_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {clock}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
		})
	})
*/
/*
	client.on('ready', () => {
  		cron.schedule('45 1 5,17 * * *', () => {
     			const channel = client.channels.cache.get(tex_dblog)
     			channel.send(`__**再起動終了予定時刻になりました。**__`)
     			all_log = all_log + 1;
     			restart_log = restart_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {restart}  " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
		})
	})
*/
/*
	client.on('ready', () => {
		const channel = client.channels.cache.get(tex_dbjllog);
		const tips = ["Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます。","life本鯖の再起動は4時、5時(全体)、14時です。","どうでもいいTipsです。追加希望はtaku1417のDMまで。"];
		const leng = tips.length;
		cron.schedule('* * * * * *', () => {
			let rand = Math.floor((Math.random() * (leng)));
			all_log = all_log + 1;
			clock_log = clock_log + 1;
			const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
			channel.send(`${new Date().getHours()}時になりました。` + tips[Math.floor(Math.random() * tips.length)]);
			//console.log(rand);
			console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {clock}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d',all_log,join_log,move_log,leave_log,clock_log,restart_log);
		})//毎秒コンソールにlogを流す(デバッグ用)
	})
*/
client.on('ready', () => {
	const channeljihou = client.channels.cache.get(tex_dbjllog);
	schedule.scheduleJob(mori, () => {
		channeljihou.send(`__**あと3分で森レイドが始まります！**__`);
	})
});//森レイド
	client.once("ready", async () => {
		const data = [{
	    		name: "ping",
	  		description: "Replies with Pong!"
	    	},{
			name: "wiki",
			description: "主要なwikiのページを表示します。",
		},{
			name: "recipe",
			description: "lifeのレシピを参照します。",
			options: [{
				type: "STRING",
				name: "item_name",
				description: "レシピを参照したいアイテムの名前を選択してください。",
				required: true,
				choices:[
					{ name:"ミスリルインゴット", value:"mithril"},
					{ name:"鋼鉄インゴット", value:"steel"},
					{ name:"強化黒曜石", value:"reinforced_obsidian"},
				]
			}]
		},{
			name: "rental",
			description: "共用アイテムを借りる時に使用します。",
			options: [{
				type: "STRING",
				name: "item_name",
				description: "借りたいアイテムの名前を選択してください。",
				required: true,
				choices:[
					{ name:"マジカトロンピッケル", value:"mjt_pickaxe"},
					{ name:"マジカトロンシャベル", value:"mjt_shovel"},
					{ name:"マジカトロンソード", value:"mjt_sword"},
				]		
			}]
		},{
			name: "mori",
			description: "森レイドの時間を設定します。",
			options: [{
				type: "INTEGER",
				name: "minute",
				description: "レイドが開始された時間を分で指定してください。",
				required: true
			}]
		}]
		await client.application.commands.set(data, svid_db);
   	});

	client.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand()) {
		    	return;
			}
		if (interaction.commandName === 'ping') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('primary')
						.setLabel('Primary')
						.setStyle('PRIMARY'),
				);
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Some title')
				.setURL('https://discord.js.org')
				.setDescription('Some description here');
		
				await interaction.reply({ content: 'Pong!', embeds: [embed], components: [row] });
			}
		if (interaction.commandName === 'wiki') {
			await interaction.reply({ content: "トップページ : https://azisabaofficial.playing.wiki/d/%a5%c8%a5%c3%a5%d7%a5%da%a1%bc%a5%b8 \nアイテムリスト : https://azisabaofficial.playing.wiki/d/item \n随時追加予定。追加の要望はDMにお願いします。", ephemeral: true});
			}
		if (interaction.commandName === 'recipe') {
			if(interaction.options.getString('item_name') === 'mithril'){
				await interaction.reply({ 
				content: "必要素材:圧縮ダイヤブロック×4、圧縮鉄ブロック×2、鋼鉄インゴット×2、ネザースター×1",
				files:['./recipe/mithril.png','./recipe/res_mithril.png'], 
				ephemeral: true
				});
			}
			if(interaction.options.getString('item_name') === 'steel'){
				await interaction.reply({ 
				content: "必要素材:圧縮鉄ブロックx8、圧縮石炭ブロックx1",
				files:['./recipe/steel.png','./recipe/res_steel.png'], 
				ephemeral: true
				});
			}
			if(interaction.options.getString('item_name') === 'reinforced_obsidian'){
				await interaction.reply({ 
				content: "必要素材:黒曜石x8、ダイヤモンドx1",
				files:['./recipe/reinforced_obsidian.png','./recipe/res_reinforced_obsidian.png'], 
				ephemeral: true
				});
			}
		}
		if (interaction.commandName === 'rental') {
			if(interaction.options.getString('item_name') === 'mjt_pickaxe'){
				await interaction.reply({ 
				content: "必要素材:マジカトロンピッケルx1、マジカトロンシャベルx1、マジカトロンソードx1",
				ephemeral: true
				});
			}
			if(interaction.options.getString('item_name') === 'mjt_shovel'){
				await interaction.reply({ 
				content: "必要素材:マジカトロンシャベルx1、マジカトロンソードx1",
				ephemeral: true
				});
			}
			if(interaction.options.getString('item_name') === 'mjt_sword'){
				await interaction.reply({ 
				content: "必要素材:マジカトロンソードx1",
				ephemeral: true
				});
			}
			}
		if (interaction.commandName === 'mori') {
			const minute = interaction.options.getInteger('minute');
			if(minute < 0 || minute > 59){
				await interaction.reply({ content: "設定できません。0~59の範囲で入力してください。", ephemeral: true});
			}else{
				await interaction.reply({ content: "森レイドの時間を"+minute+"分に設定しました。", ephemeral: true});
				mori.minute = minute - 3;
			}
		}
	});

client.login();