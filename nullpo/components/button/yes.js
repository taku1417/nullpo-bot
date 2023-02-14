const ItemList = [
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

function yes_button(interaction) {
	//console.log(lendSystemCurrent + "||" + lendSystemMode);//test用
	itemSearch = lendSystemCurrent => {
		const itemName = ItemList.find(item => item.id === lendSystemCurrent).name;
		return itemName;
	}
	switch (lendSystemMode) {
		case 'rental':
			rental[lendSystemCurrent]++;
			interaction.reply({
				content: itemSearch(lendSystemCurrent) + "を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが${itemSearch(lendSystemCurrent)}を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'return':
			rental[lendSystemCurrent]++;
			interaction.reply({
				content: itemSearch(lendSystemCurrent) + "を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが${itemSearch(lendSystemCurrent)}を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		default:
			break;
	}
}

module.exports = yes_button;