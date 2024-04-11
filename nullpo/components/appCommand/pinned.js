const { ContextMenuCommandBuilder, ApplicationCommandType, Message, ContextMenuCommandInteraction, Interaction } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
            .setName('ピン留め切替')
            .setType(ApplicationCommandType.Message),
	/**
	 * 
	 * @param {ContextMenuCommandInteraction} interaction 
	 * @returns 
	 */
    async execute(interaction) {
			logger.trace("[appCmd] pinned.js");
			const message = interaction.options.getMessage('message');
			if (message.system) {
				logger.trace("[appCmd] pinned.js: system message detected. returning...");
				return interaction.reply({ content: "システムメッセージはピン留めできません", ephemeral: true });
			}
			if (message.channel.type == ( 2/*GUILD_VOICE*/ || 4/*GUILD_CATEGORY*/ || 13/*GUILD_STAGE_VOICE*/ || 14/*GUILD_DIRECTORY*/ )) {
			//15/*GUILD_FORUM*/はコンテキスト自体が出ないのでスルー 16/*GUILD_MEDIA*/は詳細が分からないため一旦スルー
				logger.trace("[appCmd] pinned.js: cannot pin message channeltype. returning...");
				return interaction.reply({ content: "VC内チャットやステージ内チャットなど、ピン留めが出来ないチャンネルです。", ephemeral: true });
			}
			if (message.pinned) {
				logger.trace("[appCmd] pinned.js: message is already pinned. unpinning...");
				await message.unpin()
					.then(() => interaction.reply({content: "ピン止めを解除しました", ephemeral: true}))
					.catch(logger.error)
				await logger.debug(interaction.member.user.tag + "がメッセージをピン止めを解除しました  メッセージID: " + message.id)
			} else {
				logger.trace("[appCmd] pinned.js: message is not pinned. pinning...");
					await message.pin()
					.then(() => interaction.reply({content: "ピン止めしました", ephemeral: true}))
					.catch(logger.error)
				await logger.debug(interaction.member.user.tag + "がメッセージをピン止めしました  メッセージID: " + message.id)
			}
    },
};