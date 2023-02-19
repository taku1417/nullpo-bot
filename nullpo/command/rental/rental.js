const logger = require('../../log/logger.js');
const { Client, MessageActionRow, MessageButton, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
itemSearch = item_name => {
	const itemName = ItemList.find(item => item.id === item_name).name;
	return itemName;
}

function rental_command(interaction) {
	const id = interaction.options.getString('item_name');
        logger("command");
	//update_from_db("rental");
	const buttonyes = new MessageButton().setCustomId('yes').setStyle("SUCCESS").setLabel('はい');
	const buttonno = new MessageButton().setCustomId('no').setStyle("DANGER").setLabel('いいえ');
	//console.log(interaction.options.getString('item_name'));//test用
	if (rental[id] < maxRental[id]) {
		lendSystemCurrent = id;
		lendSystemMode = 'rental';
		interaction.reply({
			embeds: [{
				title: "貸出確認",
				description: itemSearch(id) + "を借りますか？",
				color: 0x00ff00,
				fields: [{
						name: "貸し出し可能数",
						value: (maxRental[id]-rental[id]) + "/" + maxRental[id],
				}]
			}],
			components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
			ephemeral : true,
		})	
	} else {
		interaction.reply({
			content: "現在" + itemSearch(id) + "は__貸し出されています__。返却をお待ちください。",
			ephemeral: true
		})
	}
}

module.exports = rental_command;
/*
{
			content: itemSearch(id) + "は貸し出しされていません。借りますか？",
			components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
			ephemeral: true
		}
*/