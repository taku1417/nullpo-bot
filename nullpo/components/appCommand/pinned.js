const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
            .setName('ピン留めをする/解除する')
            .setType(ApplicationCommandType.Message),
    async execute(interaction) {
		logger.trace("[appCmd] pinned.js");
		const message = interaction.options.getMessage('message');
		if (message.system) {
			logger.trace("[appCmd] pinned.js: system message detected. returning...");
			return interaction.reply({ content: "システムメッセージはピン留めできません", ephemeral: true });
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