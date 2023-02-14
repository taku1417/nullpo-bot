const logger = require('../../log/logger.js');
const { Client, MessageActionRow, MessageButton, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
itemSearch = item_name => {
	const itemName = ItemList.find(item => item.id === item_name).name;
	return itemName;
}

function return_command(interaction){
	const id = interaction.options.getString('item_name');
        logger("command");
	const buttonyes = new MessageButton().setCustomId('yes').setStyle("SUCCESS").setLabel('はい');
	const buttonno = new MessageButton().setCustomId('no').setStyle("DANGER").setLabel('いいえ');
	if (rental[id] >= 1) {
		lendSystemCurrent = id;
		lendSystemMode = 'return';
		interaction.reply({
			content: itemSearch(id) + "を返却しますか？",
			components: [new MessageActionRow().addComponents(buttonyes, buttonno)],
			ephemeral: true
		})	
	} else {
		interaction.reply({
			content: "現在" + itemSearch(id) + "は貸し出されていません。借りる場合は/rentalを使用してください。",
			ephemeral: true
		})
	}
}

module.exports = return_command;