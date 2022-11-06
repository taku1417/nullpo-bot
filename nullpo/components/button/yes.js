const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

function yes_button(interaction) {
		if (rental_current['mjc_pic'] === 1) {
			rental['mjc_pic'] = 1;
			interaction.reply({
				content: "マジカトロンピッケルを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンピッケルを借りました。`);
			rental_current['mjc_pic'] = 0;
		} 
		if (rental_current['mjc_sho'] === 1) {
			rental['mjc_sho'] = 1;
			interaction.reply({
				content: "マジカトロンシャベルを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンシャベルを借りました。`);
			rental_current['mjc_sho'] = 0;
		} 
		if (rental_current['mjc_swo'] === 1) {
			rental['mjc_swo'] = 1;
			interaction.reply({
				content: "マジカトロンソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンソードを借りました。`);
			rental_current['mjc_swo'] = 0;
		}
		if (rental_current['star_guide'] === 1) {
			rental['star_guide'] = 1;
			interaction.reply({
				content: "星の導きを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが星の導きを借りました。`);
			rental_current['star_guide'] = 0;
		}
		if (rental_current['ravan'] === 1) {
			rental['ravan'] = 1;
			interaction.reply({
				content: "赫灼大斧ラヴァンを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが赫灼大斧ラヴァンを借りました。`);
			rental_current['ravan'] = 0;
		}
		if (rental_current['beer'] === 1) {
			rental['beer'] = rental['beer'] + 1;
			interaction.reply({
				content: "ビール装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがビール装備を借りました。`);
			rental_current['beer'] = 0;
		}
		if (rental_current['MGF'] === 1) {
			rental['MGF'] = rental['MGF'] + 1;
			interaction.reply({
				content: "Master of Gold Fishing装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Gold Fishing装備を借りました。`);
			rental_current['MGF'] = 0;
		}
		if (rental_current['MTF'] === 1) {
			rental['MTF'] = rental['MTF'] + 1;
			interaction.reply({
				content: "Master of Treasure Fishing装備を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Treasure Fishing装備を借りました。`);
			rental_current['MTF'] = 0;
		}
		if (rental_current['mrz_iron'] === 1) {
			rental['mrz_iron'] = rental['mrz_iron'] + 1;
			interaction.reply({
				content: "マスターロッドZアイアンカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZアイアンカスタムを借りました。`);
			rental_current['mrz_iron'] = 0;
		}
		if (rental_current['mrz_gold'] === 1) {
			rental['mrz_gold'] = rental['mrz_gold'] + 1;
			interaction.reply({
				content: "マスターロッドZゴールドカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZゴールドカスタムを借りました。`);
			rental_current['mrz_gold'] = 0;
		}
		if (rental_current['mrz_dia'] === 1) {
			rental['mrz_dia'] = rental['mrz_dia'] + 1;
			interaction.reply({
				content: "マスターロッドZダイヤカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZダイヤカスタムを借りました。`);
			rental_current['mrz_dia'] = 0;
		}
		if (rental_current['mrz_eme'] === 1) {
			rental['mrz_eme'] = rental['mrz_eme'] + 1;
			interaction.reply({
				content: "マスターロッドZエメラルドカスタムを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZエメラルドカスタムを借りました。`);
			rental_current['mrz_eme'] = 0;
		}
		if (rental_current['soul_protection'] === 1) {
			rental['soul_protection'] = rental['soul_protection'] + 1;
			interaction.reply({
				content: "精霊の加護を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが精霊の加護を借りました。`);
			rental_current['soul_protection'] = 0;
		}
		if (rental_current['vortex'] === 1) {
			rental['vortex'] = rental['vortex'] + 1;
			interaction.reply({
				content: "Vortex Harricaneを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがVortex Harricaneを借りました。`);
			rental_current['vortex'] = 0;
		}
		if (rental_current['haruspe'] === 1) {
			rental['haruspe'] = rental['haruspe'] + 1;
			interaction.reply({
				content: "Springスペランカーソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがSpringスペランカーソードを借りました。`);
			rental_current['haruspe'] = 0;
		}
		if (rental_current['re_haruspe'] === 1) {
			rental['re_haruspe'] = rental['re_haruspe'] + 1;
			interaction.reply({
				content: "[復刻]Springスペランカーソードを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが[復刻]Springスペランカーソードを借りました。`);
			rental_current['re_haruspe'] = 0;
		}
		if (rental_current['luck'] === 1) {
			rental['luck'] = rental['luck'] + 1;
			interaction.reply({
				content: "運上昇Lv5を借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが運上昇Lv5を借りました。`);
			rental_current['luck'] = 0;
		}
		if (rental_current['all_pic'] === 1) {
			rental['all_pic'] = rental['all_pic'] + 1;
			interaction.reply({
				content: "資源成長型ピッケルX AllCustomを借りました。ぬるぽ倉庫から取り出してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが資源成長型ピッケルX AllCustomを借りました。`);
			rental_current['all_pic'] = 0;
		}
		//ここから返却
		if (return_current['mjc_pic'] === 1) {
			rental['mjc_pic'] = 0;
			interaction.reply({
				content: "マジカトロンピッケルを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンピッケルを返却しました。`);
			return_current['mjc_pic'] = 0;
		}
		if (return_current['mjc_sho'] === 1) {
			rental['mjc_sho'] = 0;
			interaction.reply({
				content: "マジカトロンショベルを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンショベルを返却しました。`);
			return_current['mjc_sho'] = 0;
		}
		if (return_current['mjc_swo'] === 1) {
			rental['mjc_swo'] = 0;
			interaction.reply({
				content: "マジカトロンソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマジカトロンソードを返却しました。`);
			return_current['mjc_swo'] = 0;
		}
		if (return_current['star_guide'] === 1) {
			rental['star_guide'] = 0;
			interaction.reply({
				content: "星の導きを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが星の導きを返却しました。`);
			return_current['star_guide'] = 0;
		}
		if (return_current['ravan'] === 1) {
			rental['ravan'] = 0;
			interaction.reply({
				content: "赫灼大斧ラヴァンを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが赫灼大斧ラヴァンを返却しました。`);
			return_current['ravan'] = 0;
		}
		if (return_current['beer'] === 1) {
			rental['beer'] = rental['beer'] - 1;
			interaction.reply({
				content: "ビール装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがビール装備を返却しました。`);
			return_current['beer'] = 0;
		}
		if (return_current['MGF'] === 1) {
			rental['MGF'] = rental['MGF'] - 1;
			interaction.reply({
				content: "Master of Gold Fishing装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Gold Fishing装備を返却しました。`);
			return_current['MGF'] = 0;
		}
		if (return_current['MTF'] === 1) {
			rental['MTF'] = rental['MTF'] - 1;
			interaction.reply({
				content: "Master of Treasure Fishing装備を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがMaster of Treasure Fishing装備を返却しました。`);
			return_current['MTF'] = 0;
		}
		if (return_current['mrz_iron'] === 1) {
			rental['mrz_iron'] = rental['mrz_iron'] - 1;
			interaction.reply({
				content: "マスターロッドZアイアンカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZアイアンカスタムを返却しました。`);
			return_current['mrz_iron'] = 0;
		}
		if (return_current['mrz_gold'] === 1) {
			rental['mrz_gold'] = rental['mrz_gold'] - 1;
			interaction.reply({
				content: "マスターロッドZゴールドカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZゴールドカスタムを返却しました。`);
			return_current['mrz_gold'] = 0;
		}
		if (return_current['mrz_eme'] === 1) {
			rental['mrz_eme'] = rental['mrz_eme'] - 1;
			interaction.reply({
				content: "マスターロッドZエメラルドカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZエメラルドカスタムを返却しました。`);
			return_current['mrz_eme'] = 0;
		}
		if (return_current['mrz_dia'] === 1) {
			rental['mrz_dia'] = rental['mrz_dia'] - 1;
			interaction.reply({
				content: "マスターロッドZダイヤカスタムを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがマスターロッドZダイヤカスタムを返却しました。`);
			return_current['mrz_dia'] = 0;
		}
		if (return_current['soul_protection'] === 1) {
			rental['soul_protection'] = rental['soul_protection'] - 1;
			interaction.reply({
				content: "精霊の加護を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが精霊の加護を返却しました。`);
			return_current['soul_protection'] = 0;
		}
		if (return_current['vortex'] === 1) {
			rental['vortex'] = rental['vortex'] - 1;
			interaction.reply({
				content: "Vortex Harricaneを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがVortex Harricaneを返却しました。`);
			return_current['vortex'] = 0;
		}
		if (return_current['haruspe'] === 1) {
			rental['haruspe'] = rental['haruspe'] - 1;
			interaction.reply({
				content: "Springスペランカーソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんがSpringスペランカーソードを返却しました。`);
			return_current['haruspe'] = 0;
		}
		if (return_current['re_haruspe'] === 1) {
			rental['re_haruspe'] = rental['re_haruspe'] - 1;
			interaction.reply({
				content: "[復刻]Springスペランカーソードを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが[復刻]Springスペランカーソードを返却しました。`);
			return_current['re_haruspe'] = 0;
		}
		if (return_current['luck'] === 1) {
			rental['luck'] = rental['luck'] - 1;
			interaction.reply({
				content: "運上昇Lv5を返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが運上昇Lv5を返却しました。`);
			return_current['luck'] = 0;
		}
		if (return_current['all_pic'] === 1) {
			rental['all_pic'] = rental['all_pic'] - 1;
			interaction.reply({
				content: "資源成長型ピッケルX AllCustomを返却しました。あった場所に戻してください。",
				ephemeral: true,
				fetchReply: true
			});
			channelrental.send(`${interaction.member.displayName}さんが資源成長型ピッケルX AllCustomを返却しました。`);
			return_current['all_pic'] = 0;
		}
        }

module.exports = yes_button;