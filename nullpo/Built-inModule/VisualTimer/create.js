const { ChatInputCommandInteraction, Client, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const dbclient = require('../database/index.js');
const throw_webhook = require('../../../function/throw_webhook.js');
const start_stop = require('../../components/button/visual_timer/start_stop.js');

/**
 * ビジュアルタイマーの作成
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client
 * @returns 
 */
async function create(interaction, client) {
	await interaction.deferReply({ephemeral: true});//時間がかかる可能性がある為、deferしておく
	const name = interaction.options.getString('name');
	const description = interaction.options.getString('description');
	const time = interaction.options.getNumber('time');
	const channel = interaction.options.getChannel('channel') ?? interaction.channel;
	const User = interaction.user;
	const timer_message = await channel.send({content: `作成中...`});
	if(timer_message == null/* || res == null*/) {
		interaction.followUp({content: 'タイマーの作成に失敗しました。', ephemeral: true});
		throw_webhook('タイマーの作成に失敗しました。', interaction.user, client);
		return;
	}
	await dbclient.connection('BEGIN;');
	const res = await dbclient.connection(`INSERT INTO visual_timer (channel_id, message_id, name, description, time) VALUES ('${channel.id}', '${timer_message.id}', '${name}', '${description}', ${time})`);

	
	const embed = new EmbedBuilder()
		.setTitle(name)
		.setColor(0xFFCC00)
		.setDescription(description)
		.addFields(
			{ name: "このタイマーの時間", value: `${time}秒`},
			{ name: "残り時間", value: `誰も開始していません！`}
		)
		.setTimestamp(new Date())
		.setFooter({ text: "Visual Timer  Powered by ぬるぽbot"});
	let button = start_stop.data;
	button.setCustomId(`start_stop${timer_message.id}`);
	await timer_message.edit({content: "", embeds: [embed], components: [new ActionRowBuilder().addComponents(button)],}).catch(async err => {
		throw_webhook('タイマーの作成に失敗しました。', interaction.user, client);
		interaction.followUp({content: 'タイマーの作成に失敗しました。', ephemeral: true});
		await dbclient.connection('ROLLBACK;');
		return;
	});
	await dbclient.connection('COMMIT;');
	interaction.followUp({content: 'タイマーを作成しました。', ephemeral: true});
	return;
}

module.exports = create;