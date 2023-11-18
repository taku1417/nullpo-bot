const { AutocompleteInteraction, Client, PermissionFlagsBits } = require('discord.js');
const { isConfigured } = require('log4js');

/**
 * autocomplete
 * @param {AutocompleteInteraction} interaction 
 * @param {Client} client 
 */
async function delete_(interaction, client){
  const focusedOption = interaction.options.getFocused(true);
  let choices = [];
  const lang = interaction.locale;
  if(focusedOption.name == 'name') {
    choices = visual_timer_parent.map(object => ({name: `${object.name}    (Message ID:${object.message_id})`, value: object.message_id}));
  }
  let filteredChoices = [];
  if(interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
    filteredChoices = choices.filter(choice => (choice.name).startsWith(focusedOption.value));
  } else {
    const can_delete_choices = await Promise.all(visual_timer_parent.map(async timer => {
      const channel = await client.channels.fetch(timer.channel_id);
      if(interaction.member.permissionsIn(channel).has(PermissionFlagsBits.ManageMessages)) {
        return {name: `${timer.name}    (Message ID:${timer.message_id})`, value: timer.message_id};
      } else {
        return null;
      }
    }));
    filteredChoices = can_delete_choices.filter(choice => choice != null).filter(choice => (choice.name).startsWith(focusedOption.value));
  }
  if(filteredChoices.length == 0) {
    switch(lang) {
      case 'ja':
        interaction.respond([{name: '有効なタイマーが見つかりませんでした。後でもう一度お試しください。', value: 'none'}].map(choice => choice));
        break;
      default:
        interaction.respond([{name: 'No results found. Try again later.', value: 'none'}].map(choice => choice));
        break;
    }
    return;
  }
  await interaction.respond(
    filteredChoices.map(choice => choice)
  );
}

module.exports = delete_;