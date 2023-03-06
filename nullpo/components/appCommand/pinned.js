const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
            .setName('ピン留め')
            .setType(ApplicationCommandType.Message),
    async execute(interaction) {
		const message = interaction.options.getMessage('message');
	if (message.system) return interaction.reply({ content: "システムメッセージはピン留めできません", ephemeral: true });
	if (message.pinned) {
			await message.unpin()
   			.then(() => interaction.reply({content: "ピン止めを解除しました", ephemeral: true}))
   			.catch(console.error)
			await console.log(interaction.member.user.tag + "がメッセージをピン止めを解除しました  メッセージID: " + message.id)
		} else {
  			await message.pin()
    		.then(() => interaction.reply({content: "ピン止めしました", ephemeral: true}))
    		.catch(console.error)
			await console.log(interaction.member.user.tag + "がメッセージをピン止めしました  メッセージID: " + message.id)
		}
    },
};