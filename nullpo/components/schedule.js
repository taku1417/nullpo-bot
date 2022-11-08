const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('node-cron');
        
function cron_schedule() {
        const tips = ["Ebiflyは/fly [分数]で飛ぶ分数の指定が出来ます","life本鯖の再起動は4時、5時(全体)、14時です","どうでもいいTipsです。追加希望はtaku1417のDMまで。",/*"コマンドはキーボードの↑キーで一つ前の自分が打ったコマンドを入力省略できるが、しかしこれでは種などの購入と圧縮を繰り返す作業には不向きである、そこで二度↑キーを押すと2つ前の自分が打ったコマンドに戻れる。これで/shopと/rguiを簡単に交互に実行することができる",*/"きりんとねこの身長が180cmなのは嘘である。本当は270cmである","パンに生ハムを乗せると美味しい","薄皮一枚無いスキンをもとに戻したい場合はF3+H","このbotはHerokuというサービス上で稼働しています","あおいんは逆転ものも好き","しまりんはそこまで地上絵が好きじゃない","Monocraftは0時、JMSは9時に投票が可能になります","実はあもさんは下ネタが嫌い","うおみーの言うことは全て嘘","でも実は本当","って言ってるのも嘘かもしれない","でも実は嘘","初めましてronpenです 初めてすぐに10m獲得しました() まだまだ分からないことしかないので色々教えてくれたら嬉しいです","ぬるぽ語録集はVCで生まれた名(迷)言をまとめたものです","この鯖には実に60個ものロールが存在します","畑では植え直しを忘れずに。","木こりは稼げません、マジで。","lifeには統合版でもアクセスできます","釣りをしていると出てくる心の闇は、どこかに座っていると攻撃を大体回避できます","/wikiと打つと主要なwikiページを見ることが出来ます","/recipeと打つとlife独自レシピを見ることが出来ます。レシピは随時追加。","/rentalと打つと貸出記録をbotがやってくれます","/returnと打つと返却記録をbotがやってくれます","真のSはMの天才だし、真のMはSの天才である。それが僕の持論ですね。~LingThai~","しまりんかわいいね","堅あげポテトで口内炎ができるやつ落ち着きがない","命を知ろう〜バイシクル川崎の生体について〜\n一日に生まれるバイシクル川崎のうち約9割がバイク川崎になれないと言われています。\nそしてバイク川崎になれなかったバイシクル川崎の過半数は自然淘汰に対抗するためにコックカワサキへと姿を変えるのです","美味しいヤミー❗️✨🤟😁👍感謝❗️🙌✨感謝❗️🙌✨またいっぱい食べたいな❗️🍖😋🍴✨デリシャッ‼️🙏✨ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬ‼️🙏✨ ｼｬｯｯ‼ハッピー🌟スマイル❗️👉😁👈","食前の合掌、いただきます。"];

	const channeljihou = client.channels.cache.get(tex_jihou);
	const channelncnofi = client.channels.cache.get(tex_nlpcs_nofi);
	const channeltest = client.channels.cache.get('979084899703218186');
	console.log(tips.length + "件のtipsを読み込みました。");

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
	cron.schedule('* * * * * *', () => {
		channeltest.send(`てすと`)
		logger("clock");
	})
}

module.exports = cron_schedule;