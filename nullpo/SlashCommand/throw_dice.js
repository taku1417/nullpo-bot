const { SlashCommandBuilder } = require('discord.js');
const tintiro = require('./throw_dice/tintiro.js');
const dice_custom = require('./throw_dice/custom.js');
const nplogger = require('../log/logger.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('throw_dice')
		.setDescription('ダイスを振ります。')
		.addSubcommand(subcommand =>
			subcommand
				.setName('tintiro')
				.setDescription('チンチロリンの形式でダイスを振ります。'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('100')
				.setDescription('100面ダイスを振ります。'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('custom')
				.setDescription('任意の面数・個数のダイスを振ります。')
				.addIntegerOption(option =>
					option.setName('個数')
						.setDescription('振るダイスの個数')
						.setRequired(true))
				.addIntegerOption(option =>
					option.setName('最大値')
						.setDescription('ダイスの面数(最大値)')
						.setRequired(true))),
	async execute(interaction) {
		nplogger("command");
		if(interaction.options.getSubcommand() === 'tintiro') {
			const dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
			await interaction.reply({ content: "チンチロリンの結果\n"+dice[0]+"\n"+dice[1]+"\n"+dice[2]+"\n"+tintiro(dice)+"です。", ephemeral: false});
		}
		if(interaction.options.getSubcommand() === '100') {
			const dice = Math.floor(Math.random() * 100) + 1;
			await interaction.reply({ content: "100式の結果\n"+dice+"が出ました。", ephemeral: false});
		}
		if(interaction.options.getSubcommand() === 'custom') {
			const dice = [];//ダイスが複数になるため空配列
			const amount = interaction.options.getInteger('個数');
			const max = interaction.options.getInteger('最大値');
			dice_custom(amount, max, dice);
			if(amount < 1 || max < 1) {
				await interaction.reply({ content: "個数または最大値が0以下になっています。正の整数を指定してください。", ephemeral: true});
			} else {
				try {
					await interaction.reply({ content: amount+"d"+max+"の結果\n"+dice+"\nが出ました。", ephemeral: false});
				} catch (error) {
					await interaction.reply({ content: "なんらかの要因でエラーが発生しました。ほとんどの場合discord側の文字数制限によるものです。個数等を減らして再度試してください。", ephemeral: true});
					logger.warn(error);
				}
			}
		}
	},
};