const logger = require('../../log/logger.js');
//const { Client, MessageActionRow, MessageButton, Intents } = require('discord.js');
//const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});

function return_command(interaction){
        logger("command");
	const buttonyes = new MessageButton().setCustomId('yes').setStyle("SUCCESS").setLabel('はい');
	const buttonno = new MessageButton().setCustomId('no').setStyle("DANGER").setLabel('いいえ');
	switch (interaction.options.getString('item_name')) {
	case 'mjc_pickaxe': 
		if (rental['mjc_pic'] <= 1) {
                     		return_current['mjc_pic'] = 1;
                       	interaction.reply({
                       		content: "マジカトロンピッケルを返却しますか？",
                          	    	components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
                          	   	ephemeral: true
                       	})
               	}
             		if (rental['mjc_pic'] === 0) {
                       	interaction.reply({
                               	content: "現在マジカトロンピッケルは貸し出されていません。借りる場合は/rentalを使用してください。",
                               	ephemeral: true
                       	})
               	}
		break;
	case 'mjc_shovel':
		if (rental['mjc_sho'] <= 1) {
			return_current['mjc_sho'] = 1;
			interaction.reply({
				content: "マジカトロンショベルを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['mjc_sho'] === 0) {
			interaction.reply({
				content: "現在マジカトロンショベルは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'mjc_sword':
		if (rental['mjc_swo'] <= 1) {
			return_current['mjc_swo'] = 1;
			interaction.reply({
				content: "マジカトロンソードを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['mjc_swo'] === 0) {
			interaction.reply({
				content: "現在マジカトロンソードは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'star_guide':
		if (rental['star_guide'] <= 1) {
			return_current['star_guide'] = 1;
			interaction.reply({
				content: "星の導きを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['star_guide'] === 0) {
			interaction.reply({
				content: "現在星の導きは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'ravan':
		if (rental['ravan'] <= 1) {
			return_current['ravan'] = 1;
			interaction.reply({
				content: "赫灼大斧ラヴァンを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['ravan'] === 0) {
			interaction.reply({
				content: "現在赫灼大斧ラヴァンは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'beer':
		if (rental['beer'] >= 1) {
			return_current['beer'] = 1;
			interaction.reply({
				content: "ビール装備を返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['beer'] === 0) {
			interaction.reply({
				content: "現在ビール装備は貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'MGF':
		if (rental['MGF'] >= 1) {
			return_current['MGF'] = 1;
			interaction.reply({
				content: "Master of Gold Fishing装備を返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['MGF'] === 0) {
			interaction.reply({
				content: "現在Master of Gold Fishing装備は貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'MTF':
		if (rental['MTF'] >= 1) {
			return_current['MTF'] = 1;
			interaction.reply({
				content: "Master of Treasure Fishing装備を返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['MTF'] === 0) {
			interaction.reply({
				content: "現在Master of Treasure Fishing装備は貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'mrz_iron':
		if (rental['mrz_iron'] >= 1) {
			return_current['mrz_iron'] = 1;
			interaction.reply({
				content: "マスターロッドZアイアンカスタムを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['mrz_iron'] === 0) {
			interaction.reply({
				content: "現在マスターロッドZアイアンカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'mrz_gold':
		if (rental['mrz_gold'] >= 1) {
			return_current['mrz_gold'] = 1;
			interaction.reply({
				content: "マスターロッドZゴールドカスタムを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['mrz_gold'] === 0) {
			interaction.reply({
				content: "現在マスターロッドZゴールドカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'mrz_dia':
		if (rental['mrz_dia'] >= 1) {
			return_current['mrz_dia'] = 1;
			interaction.reply({
				content: "マスターロッドZダイヤカスタムを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['mrz_dia'] === 0) {
			interaction.reply({
				content: "現在マスターロッドZダイヤカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'mrz_eme':
		if (rental['mrz_eme'] >= 1) {
			return_current['mrz_eme'] = 1;
			interaction.reply({
				content: "マスターロッドZエメラルドカスタムを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['mrz_eme'] === 0) {
			interaction.reply({
				content: "現在マスターロッドZエメラルドカスタムは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'soul_protection':
		if (rental['soul_protection'] >= 1) {
			return_current['soul_protection'] = 1;
			interaction.reply({
				content: "精霊の加護を返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['soul_protection'] === 0) {
			interaction.reply({
				content: "現在精霊の加護は貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'vortex':
		if (rental['vortex'] >= 1) {
			return_current['vortex'] = 1;
			interaction.reply({
				content: "Vortex Hurricaneを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['vortex'] === 0) {
			interaction.reply({
				content: "現在Vortex Hurricaneは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'haruspe':
		if (rental['haruspe'] >= 1) {
			return_current['haruspe'] = 1;
			interaction.reply({
				content: "Springスペランカーソードを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['haruspe'] === 0) {
			interaction.reply({
				content: "現在Springスペランカーソードは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 're_haruspe':
		if (rental['re_haruspe'] >= 1) {
			return_current['re_haruspe'] = 1;
			interaction.reply({
				content: "[復刻]Springスペランカーソードを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['re_haruspe'] === 0) {
			interaction.reply({
				content: "現在[復刻]Springスペランカーソードは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'luck':
		if (rental['luck'] >= 1) {
			return_current['luck'] = 1;
			interaction.reply({
				content: "運上昇Lv5を返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['luck'] === 0) {
			interaction.reply({
				content: "現在運上昇Lv5は貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
		break;
	case 'all_pic':
		if (rental['all_pic'] >= 1) {
			return_current['all_pic'] = 1;
			interaction.reply({
				content: "資源成長型ピッケルX AllCustomを返却しますか？",
				components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
				ephemeral: true
			})
		}
		if (rental['all_pic'] === 0) {
			interaction.reply({
				content: "現在資源成長型ピッケルX AllCustomは貸し出されていません。借りる場合は/rentalを使用してください。",
				ephemeral: true
			})
		}
	}
}

module.exports = return_command;