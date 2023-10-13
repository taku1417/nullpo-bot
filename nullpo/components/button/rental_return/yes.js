const { ButtonBuilder, ButtonStyle } = require('discord.js');

function yes_button(interaction) {
	logger.trace("[button] yes.js");
	itemSearch = lendSystemCurrent => {
		const itemName = ItemList.find(item => item.id === lendSystemCurrent).name;
		return itemName;
	}
	switch (lendSystemMode) {
		case 'rental':
			logger.trace("[button] yes.js: rental");
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
			logger.trace("[button] yes.js: return");
			rental[lendSystemCurrent]--;
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

module.exports = {
	data: new ButtonBuilder()
		.setCustomId('yes')
		.setLabel('はい')
		.setStyle(ButtonStyle.Success),
	async execute(interaction, client) {
		yes_button(interaction);
	}
};