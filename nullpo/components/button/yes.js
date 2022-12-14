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
		case 'GR','rental':
			rental['GR']++;
			interaction.reply({
				content: "GOLD RUSH装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがGOLD RUSH装備を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'GR','return':
			rental['GR']--;
			interaction.reply({
				content: "GOLD RUSH装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがGOLD RUSH装備を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'origin','rental':
			rental['origin']++;
			interaction.reply({
				content: "原初装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが原初装備を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'origin','return':
			rental['origin']--;
			interaction.reply({
				content: "原初装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが原初装備を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'orichal','rental':
			rental['orichal']++;
			interaction.reply({
				content: "ΟριχαρόνIngot(オリハルコン)装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがΟριχαρόνIngot(オリハルコン)装備を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'orichal','return':
			rental['orichal']--;
			interaction.reply({
				content: "ΟριχαρόνIngot(オリハルコン)装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがΟριχαρόνIngot(オリハルコン)装備を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'youtou','rental':
			rental['youtou']++;
			interaction.reply({
				content: "[復刻]妖刀「白狐」を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが[復刻]妖刀「白狐」を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'youtou','return':
			rental['youtou']--;
			interaction.reply({
				content: "[復刻]妖刀「白狐」を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが[復刻]妖刀「白狐」を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'gokuen','rental':
			rental['gokuen']++;
			interaction.reply({
				content: "思念の獄炎を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが思念の獄炎を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'gokuen','return':
			rental['gokuen']--;
			interaction.reply({
				content: "思念の獄炎を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが思念の獄炎を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'requiem','rental':
			rental['requiem']++;
			interaction.reply({
				content: "壊世錫杖レクイエムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが壊世錫杖レクイエムを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'requiem','return':
			rental['requiem']--;
			interaction.reply({
				content: "壊世錫杖レクイエムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが壊世錫杖レクイエムを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'ffggr','rental':
			rental['ffggr']++;
			interaction.reply({
				content: "ffggrロッド Rank4を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがffggrロッド Rank4を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'ffggr','return':
			rental['ffggr']--;
			interaction.reply({
				content: "ffggrロッド Rank4を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがffggrロッド Rank4を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case '枯れた心','rental':
			rental['枯れた心']++;
			interaction.reply({
				content: "枯れた心を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが枯れた心を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case '枯れた心','return':
			rental['枯れた心']--;
			interaction.reply({
				content: "枯れた心を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが枯れた心を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'envenom','rental':
			rental['envenom']++;
			interaction.reply({
				content: "Envenom Mergeを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがEnvenom Mergeを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'envenom','return':
			rental['envenom']--;
			interaction.reply({
				content: "Envenom Mergeを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがEnvenom Mergeを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'AZI','rental':
			rental['AZI']++;
			interaction.reply({
				content: "【AZI SAVIOR】を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが【AZI SAVIOR】を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'AZI','return':
			rental['AZI']--;
			interaction.reply({
				content: "【AZI SAVIOR】を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが【AZI SAVIOR】を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'sac','rental':
			rental['sac']++;
			interaction.reply({
				content: "昇土龍拳サックを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが昇土龍拳サックを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'sac','return':
			rental['sac']--;
			interaction.reply({
				content: "昇土龍拳サックを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが昇土龍拳サックを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'vega','rental':
			rental['vega']++;
			interaction.reply({
				content: "星龍の弓_Vega_を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが星龍の弓_Vega_を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'vega','return':
			rental['vega']--;
			interaction.reply({
				content: "星龍の弓_Vega_を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが星龍の弓_Vega_を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'fulldora','rental':
			rental['fulldora']++;
			interaction.reply({
				content: "フルドラゴンアーマーチェストプレートを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがフルドラゴンアーマーチェストプレートを借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case 'fulldora','return':
			rental['fulldora']--;
			interaction.reply({
				content: "フルドラゴンアーマーチェストプレートを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがフルドラゴンアーマーチェストプレートを返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case '炎廃業','rental':
			rental['炎廃業']++;
			interaction.reply({
				content: "炎廃業を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが炎廃業を借りました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
		case '炎廃業','return':
			rental['炎廃業']--;
			interaction.reply({
				content: "炎廃業を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが炎廃業を返却しました。`);
			lendSystemCurrent = '';
			lendSystemMode = '';
			break;
	}
}

module.exports = yes_button;