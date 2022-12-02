//const { Client, Intents } = require('discord.js');
//const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

function yes_button(interaction) {
	switch (lendSystemCurrent,lendSystemMode) {
		case 'mjc_pic','rental':		
			rental['mjc_pic']++;
			interaction.reply({
				content: "マジカトロンピッケルを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンピッケルを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mjc_pic','return':
			rental['mjc_pic']--;
			interaction.reply({
				content: "マジカトロンピッケルを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンピッケルを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mjc_sho','rental':
			rental['mjc_sho']++;
			interaction.reply({
				content: "マジカトロンシャベルを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンシャベルを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mjc_sho','return':
			rental['mjc_sho']--;
			interaction.reply({
				content: "マジカトロンショベルを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンショベルを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mjc_swo','rental':
			rental['mjc_swo']++;
			interaction.reply({
				content: "マジカトロンソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンソードを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mjc_swo','return':
			rental['mjc_swo']--;
			interaction.reply({
				content: "マジカトロンソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンソードを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'star_guide','rental':
			rental['star_guide']++;
			interaction.reply({
				content: "星の導きを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが星の導きを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'star_guide','return':
			rental['star_guide']--;
			interaction.reply({
				content: "星の導きを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが星の導きを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'ravan','rental':
			rental['ravan']++;
			interaction.reply({
				content: "赫灼大斧ラヴァンを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが赫灼大斧ラヴァンを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'ravan','return':
			rental['ravan']--;
			interaction.reply({
				content: "赫灼大斧ラヴァンを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが赫灼大斧ラヴァンを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'beer','rental':
			rental['beer']++;
			interaction.reply({
				content: "ビール装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがビール装備を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'beer','return':
			rental['beer']--;
			interaction.reply({
				content: "ビール装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがビール装備を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'MGF','rental':
			rental['MGF']++;
			interaction.reply({
				content: "Master of Gold Fishing装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Gold Fishing装備を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'MGF','return':
			rental['MGF']--;
			interaction.reply({
				content: "Master of Gold Fishing装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Gold Fishing装備を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'MTF','rental':
			rental['MTF']++;
			interaction.reply({
				content: "Master of Treasure Fishing装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Treasure Fishing装備を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'MTF','return':
			rental['MTF']--;
			interaction.reply({
				content: "Master of Treasure Fishing装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Treasure Fishing装備を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_iron','rental':
			rental['mrz_iron']++;
			interaction.reply({
				content: "マスターロッドZアイアンカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZアイアンカスタムを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_iron','return':
			rental['mrz_iron']--;
			interaction.reply({
				content: "マスターロッドZアイアンカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZアイアンカスタムを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_gold','rental':
			rental['mrz_gold']++;
			interaction.reply({
				content: "マスターロッドZゴールドカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZゴールドカスタムを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_gold','return':
			rental['mrz_gold']--;
			interaction.reply({
				content: "マスターロッドZゴールドカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZゴールドカスタムを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_dia','rental':
			rental['mrz_dia']++;
			interaction.reply({
				content: "マスターロッドZダイヤカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZダイヤカスタムを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_dia','return':
			rental['mrz_dia']--;
			interaction.reply({
				content: "マスターロッドZダイヤカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZダイヤカスタムを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_eme','rental':
			rental['mrz_eme']++;
			interaction.reply({
				content: "マスターロッドZエメラルドカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZエメラルドカスタムを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'mrz_eme','return':
			rental['mrz_eme']--;
			interaction.reply({
				content: "マスターロッドZエメラルドカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZエメラルドカスタムを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'soul_protection','rental':
			rental['soul_protection']++;
			interaction.reply({
				content: "精霊の加護を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが精霊の加護を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'soul_protection','return':
			rental['soul_protection']--;
			interaction.reply({
				content: "精霊の加護を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが精霊の加護を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'vortex','rental':
			rental['vortex']++;
			interaction.reply({
				content: "Vortex Harricaneを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがVortex Harricaneを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'vortex','return':
			rental['vortex']--;
			interaction.reply({
				content: "Vortex Harricaneを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがVortex Harricaneを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'haruspe','rental':
			rental['haruspe']++;
			interaction.reply({
				content: "Springスペランカーソードを借りました。ぬるぽ倉庫から取り出してください。本家・復刻は区別していません。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがSpringスペランカーソードを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'haruspe','return':
			rental['haruspe']--;
			interaction.reply({
				content: "Springスペランカーソードを返却しました。あった場所に戻してください。本家・復刻は区別していません。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがSpringスペランカーソードを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'moriDoll','rental':
			rental['moriDoll']++;
			interaction.reply({
				content: "幸運森ドール([復刻]BirthdayDoll~Mori01231~)を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが幸運森ドール([復刻]BirthdayDoll~Mori01231~)を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'moriDoll','return':
			rental['moriDoll']--;
			interaction.reply({
				content: "幸運森ドール([復刻]BirthdayDoll~Mori01231~)を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが幸運森ドール([復刻]BirthdayDoll~Mori01231~)を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'all_pic','rental':
			rental['all_pic']++;
			interaction.reply({
				content: "資源成長型ピッケルX AllCustomを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが資源成長型ピッケルX AllCustomを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'all_pic','return':
			rental['all_pic']--;
			interaction.reply({
				content: "資源成長型ピッケルX AllCustomを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが資源成長型ピッケルX AllCustomを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;	
	}
}

module.exports = yes_button;