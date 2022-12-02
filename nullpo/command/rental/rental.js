const logger = require('../../log/logger.js');
const { Client, MessageActionRow, MessageButton, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

function rental_command(interaction) {
        logger("command");
	//update_from_db("rental");
	const buttonyes = new MessageButton().setCustomId('yes').setStyle("SUCCESS").setLabel('はい');
	const buttonno = new MessageButton().setCustomId('no').setStyle("DANGER").setLabel('いいえ');
	switch (interaction.options.getString('item_name')) {
		case 'mjc_pickaxe':
			if (rental['mjc_pic'] < maxRental['mjc_pic']) {
				lendSystemCurrent = mjc_pic;
				lendSystemMode = rental;
				interaction.reply({
					content: "マジカトロンピッケルは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})	
			} 
			if (rental['mjc_pic'] >= maxRental['mjc_pic']) {
				interaction.reply({
					content: "現在マジカトロンピッケルは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mjc_shovel':
			if (rental['mjc_sho'] <= 0) {
				rental_current['mjc_sho'] = 1;
				interaction.reply({
					content: "マジカトロンショベルは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['mjc_sho'] >= 1) {
				interaction.reply({
					content: "現在マジカトロンショベルは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mjc_sword':
			if (rental['mjc_swo'] <= 0) {
				rental_current['mjc_swo'] = 1;
				interaction.reply({
					content: "マジカトロンソードは貸し出しされていません。借りますか？",
	        			components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['mjc_swo'] >= 1) {
				interaction.reply({
					content: "現在マジカトロンソードは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'star_guide':
			if (rental['star_guide'] <= 0) {
				rental_current['star_guide'] = 1;
				interaction.reply({
					content: "星の導きは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
        		if (rental['star_guide'] >= 1) {
				interaction.reply({
					content: "現在星の導きは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'ravan':
			if (rental['ravan'] <= 0) {
				rental_current['ravan'] = 1;
        			interaction.reply({
					content: "赫灼大斧ラヴァンは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['ravan'] >= 1) {
				interaction.reply({
					content: "現在赫灼大斧ラヴァンは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'beer':
			if (rental['beer'] <= 1) {
				rental_current['beer'] = 1;
				interaction.reply({
					content: "ビール装備は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
			})
			}
			if (rental['beer'] >= 2) {
				interaction.reply({
					content: "現在ビール装備は全て__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'MGF':
			if (rental['MGF'] <= 0) {
				rental_current['MGF'] = 1;
				interaction.reply({
					content: "Master of Gold Fishing装備は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['MGF'] >= 1) {
				interaction.reply({
					content: "現在Master of Gold Fishing装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'MTF':
			if (rental['MTF'] <= 1) {
				rental_current['MTF'] = 1;
				interaction.reply({
					content: "Master of Treasure Fishing装備は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['MTF'] >= 2) {
				interaction.reply({
					content: "現在Master of Treasure Fishing装備は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mrz_iron':
			if (rental['mrz_iron'] <= 0) {
				rental_current['mrz_iron'] = 1;
				interaction.reply({
					content: "マスターロッドZアイアンカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['mrz_iron'] >= 1) {
				interaction.reply({
					content: "現在マスターロッドZアイアンカスタムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mrz_gold':
			if (rental['mrz_gold'] <= 0) {
				rental_current['mrz_gold'] = 1;
				interaction.reply({
					content: "マスターロッドZゴールドカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['mrz_gold'] >= 1) {
				interaction.reply({
					content: "現在マスターロッドZゴールドカスタムは__貸し出されています__。返却をお待ちください。",
			        	ephemeral: true
					})
				}
			break;
		case 'mrz_dia':
			if (rental['mrz_dia'] <= 0) {
				rental_current['mrz_dia'] = 1;
				interaction.reply({
					content: "マスターロッドZダイヤカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['mrz_dia'] >= 1) {
				interaction.reply({
					content: "現在マスターロッドZダイヤカスタムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'mrz_eme':
			if (rental['mrz_eme'] <= 0) {
				rental_current['mrz_eme'] = 1;
				interaction.reply({
					content: "マスターロッドZエメラルドカスタムは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['mrz_eme'] >= 1) {
				interaction.reply({
					content: "現在マスターロッドZエメラルドカスタムは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'soul_protection':
			if (rental['soul_protection'] <= 0) {
				rental_current['soul_protection'] = 1;
				interaction.reply({
					content: "精霊の加護は貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['soul_protection'] >= 1) {
				interaction.reply({
					content: "現在精霊の加護は__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'vortex':
			if (rental['vortex'] <= 0) {
				rental_current['vortex'] = 1;
				interaction.reply({
					content: "Vortex Hurricaneは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
                        if (rental['vortex'] >= 1) {
				interaction.reply({
					content: "現在Vortex Hurricaneは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'haruspe':
			if (rental['haruspe'] <= 0) {
				rental_current['haruspe'] = 1;
				interaction.reply({
					content: "Springスペランカーソードは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['haruspe'] >= 1) {
				interaction.reply({
					content: "現在Springスペランカーソードは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 're_haruspe':
			if (rental['re_haruspe'] <= 0) {
				rental_current['re_haruspe'] = 1;
				interaction.reply({
					content: "[復刻]Springスペランカーソードは貸し出しされていません。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['re_haruspe'] >= 1) {
				interaction.reply({
					content: "現在[復刻]Springスペランカーソードは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'luck':
			if (rental['luck'] <= 3) {
				rental_current['luck'] = 1;
				interaction.reply({
					content: "運上昇Lv5は在庫があります。借りますか？",
					components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['luck'] >= 4) {
				interaction.reply({
					content: "現在運上昇Lv5は全て__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		case 'all_pic':
			if (rental['all_pic'] <= 0) {
				rental_current['all_pic'] = 1;
				interaction.reply({
					content: "資源成長型ピッケルX AllCustomは貸し出しされていません。借りますか？",
        				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
					ephemeral: true
				})
			}
			if (rental['all_pic'] >= 1) {
				interaction.reply({
					content: "現在資源成長型ピッケルX AllCustomは__貸し出されています__。返却をお待ちください。",
					ephemeral: true
				})
			}
			break;
		default:
			break;
        }
}

module.exports = rental_command;