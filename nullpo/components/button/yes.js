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