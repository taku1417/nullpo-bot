const logger = require('../../log/logger.js');
const { Client, MessageActionRow, MessageButton, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
itemSearch = item_name => {
	const itemName = ItemList.find(item => item.id === item_name).name;
	return itemName;
}

function rental_command(interaction) {
        logger("command");
	//update_from_db("rental");
	const buttonyes = new MessageButton().setCustomId('yes').setStyle("SUCCESS").setLabel('はい');
	const buttonno = new MessageButton().setCustomId('no').setStyle("DANGER").setLabel('いいえ');
	//console.log(interaction.options.getString('item_name'));
	/*switch (interaction.options.getString('item_name')) {
		case 'mjc_pic':
			if (rental['mjc_pic'] < maxRental['mjc_pic']) {
				lendSystemCurrent = 'mjc_pic';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マジカトロンピッケルは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})	
			} else {
				interaction.reply({
					content: "現在マジカトロンピッケルは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mjc_sho':
			if (rental['mjc_sho'] < maxRental['mjc_sho']) {
				lendSystemCurrent = 'mjc_sho';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マジカトロンショベルは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在マジカトロンショベルは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mjc_swo':
			if (rental['mjc_swo'] < maxRental['mjc_swo']) {
				lendSystemCurrent = 'mjc_swo';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マジカトロンソードは貸し出しされていません。借りますか？",
	        			components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在マジカトロンソードは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'star_guide':
			if (rental['star_guide'] < maxRental['star_guide']) {
				lendSystemCurrent = 'star_guide';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "星の導きは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在星の導きは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'ravan':
			if (rental['ravan'] < maxRental['ravan']) {
				lendSystemCurrent = 'ravan';
				lendSystemMode = 'rental';
        			interaction.reply({
					content: "赫灼大斧ラヴァンは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在赫灼大斧ラヴァンは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'beer':
			if (rental['beer'] < maxRental['beer']) {
				lendSystemCurrent = 'beer';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "ビール装備は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
			})
			} else {
				interaction.reply({
					content: "現在ビール装備は全て__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'MGF':
			if (rental['MGF'] < maxRental['MGF']) {
				lendSystemCurrent = 'MGF';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "Master of Gold Fishing装備は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在Master of Gold Fishing装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'MTF':
			if (rental['MTF'] < maxRental['MTF']) {
				lendSystemCurrent = 'MTF';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "Master of Treasure Fishing装備は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在Master of Treasure Fishing装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mrz_iron':
			if (rental['mrz_iron'] < maxRental['mrz_iron']) {
				lendSystemCurrent = 'mrz_iron';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マスターロッドZアイアンカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在マスターロッドZアイアンカスタムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mrz_gold':
			if (rental['mrz_gold'] < maxRental['mrz_gold']) {
				lendSystemCurrent = 'mrz_gold';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マスターロッドZゴールドカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在マスターロッドZゴールドカスタムは__貸し出されています__。返却をお待ちください。",
			        	ephemeral: true
					})
				}
			break;
		case 'mrz_dia':
			if (rental['mrz_dia'] < maxRental['mrz_dia']) {
				lendSystemCurrent = 'mrz_dia';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マスターロッドZダイヤカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在マスターロッドZダイヤカスタムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mrz_eme':
			if (rental['mrz_eme'] < maxRental['mrz_eme']) {
				lendSystemCurrent = 'mrz_eme';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "マスターロッドZエメラルドカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在マスターロッドZエメラルドカスタムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'soul_protection':
			if (rental['soul_protection'] < maxRental['soul_protection']) {
				lendSystemCurrent = 'soul_protection';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "精霊の加護は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在精霊の加護は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'vortex':
			if (rental['vortex'] < maxRental['vortex']) {
				lendSystemCurrent = 'vortex';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "Vortex Hurricaneは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在Vortex Hurricaneは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'haruspe':
			if (rental['haruspe'] < maxRental['haruspe']) {
				lendSystemCurrent = 'haruspe';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "Springスペランカーソードは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在Springスペランカーソードは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'moriDoll':
			if (rental['moriDoll'] < maxRental['moriDoll']) {
				lendSystemCurrent = 'moriDoll';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "幸運森ドール([復刻]BirthdayDoll~Mori01231~)は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在幸運森ドール([復刻]BirthdayDoll~Mori01231~)は全て__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'all_pic':
			if (rental['all_pic'] < maxRental['all_pic']) {
				lendSystemCurrent = 'all_pic';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "資源成長型ピッケルX AllCustomは貸し出しされていません。借りますか？",
        				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在資源成長型ピッケルX AllCustomは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'GR':
			if (rental['GR'] < maxRental['GR']) {
				lendSystemCurrent = 'GR';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "GOLD RUSH装備は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在GOLD RUSH装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'origin':
			if (rental['origin'] < maxRental['origin']) {
				lendSystemCurrent = 'origin';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "原初装備は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在原初装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'orichal':
			if (rental['orichal'] < maxRental['orichal']) {
				lendSystemCurrent = 'orichal';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "ΟριχαρόνIngot(オリハルコン)装備は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在ΟριχαρόνIngot(オリハルコン)装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'youtou':
			if (rental['youtou'] < maxRental['youtou']) {
				lendSystemCurrent = 'youtou';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "[復刻]妖刀「白狐」は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在[復刻]妖刀「白狐」は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'gokuen':
			if (rental['gokuen'] < maxRental['gokuen']) {
				lendSystemCurrent = 'gokuen';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "思念の獄炎は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在思念の獄炎は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'requiem':
			if (rental['requiem'] < maxRental['requiem']) {
				lendSystemCurrent = 'requiem';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "壊世錫杖レクイエムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在壊世錫杖レクイエムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'ffggr':
			if (rental['ffggr'] < maxRental['ffggr']) {
				lendSystemCurrent = 'ffggr';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "FFGGRロッド Rank4は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在FFGGRロッド Rank4は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case '枯れた心':
			if (rental['枯れた心'] < maxRental['枯れた心']) {
				lendSystemCurrent = '枯れた心';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "枯れた心は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在枯れた心は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'envenom':
			if (rental['envenom'] < maxRental['envenom']) {
				lendSystemCurrent = 'envenom';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "Envenom Mergeは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在Envenom Mergeは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'AZI':
			if (rental['AZI'] < maxRental['AZI']) {
				lendSystemCurrent = 'AZI';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "【AZI SAVIOR】は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在【AZI SAVIOR】は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'sac':
			if (rental['sac'] < maxRental['sac']) {
				lendSystemCurrent = 'sac';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "昇土龍拳サックは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在昇土龍拳サックは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'vega':
			if (rental['vega'] < maxRental['vega']) {
				lendSystemCurrent = 'vega';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "星龍の弓_Vega_は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在星龍の弓_Vega_は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'fulldora':
			if (rental['fulldora'] < maxRental['fulldora']) {
				lendSystemCurrent = 'fulldora';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "フルドラゴンアーマーチェストプレートは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在フルドラゴンアーマーチェストプレートは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case '炎廃業':
			if (rental['炎廃業'] < maxRental['炎廃業']) {
				lendSystemCurrent = '炎廃業';
				lendSystemMode = 'rental';
				interaction.reply({
					content: "炎廃業は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			} else {
				interaction.reply({
					content: "現在炎廃業は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		default:
			break;
        }*/
	if (rental[item_name] < maxRental[item_name]) {
		lendSystemCurrent = item_name;
		lendSystemMode = 'rental';
		interaction.reply({
			content: itemSearch(item_name) + "は貸し出しされていません。借りますか？",
			components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
			ephemeral: true
		})	
	} else {
		interaction.reply({
			content: "現在" + itemSearch(item_name) + "は__貸し出されています__。返却をお待ちください。",
			ephemeral: true
		})
	}
}

module.exports = rental_command;