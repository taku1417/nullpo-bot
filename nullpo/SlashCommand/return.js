const nplogger = require('../log/logger.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
itemSearch = item_name => {
	const itemName = ItemList.find(item => item.id === item_name).name;
	return itemName;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('return')
		.setDescription('共用品の返却記録をします。')
		.addStringOption(option =>
			option.setName('item_name')
				.setDescription('返却するアイテムを選択してください。')
				.setRequired(true)
				.addChoices(
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
				)
		),
	async execute(interaction) {
		logger.trace("[SlashCommand] return.js");
		const id = interaction.options.getString('item_name');
		nplogger("command");
		const buttonyes = new ButtonBuilder().setCustomId('yes').setStyle(ButtonStyle.Success).setLabel('はい');
		const buttonno = new ButtonBuilder().setCustomId('no').setStyle(ButtonStyle.Danger).setLabel('いいえ');
		if (rental[id] >= 1) {
			lendSystemCurrent = id;
			lendSystemMode = 'return';
			interaction.reply({
				content: itemSearch(id) + "を返却しますか？",
				components: [new ActionRowBuilder().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})	
		} else {
			interaction.reply({
				content: "現在" + itemSearch(id) + "は貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
	},
}