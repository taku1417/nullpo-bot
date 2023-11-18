const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const dbclient = require('../../Built-inModule/database/index.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('admin_settings')
    .setDescription('Settings for Admins')
    .setDescriptionLocalizations({
      ja: '管理者向けの設定を行います。'
    })
    .addSubcommand(subcommand =>
      subcommand
        .setName('logger_level')
        .setDescription('Change console logger level')
        .setDescriptionLocalizations({
          ja: 'コンソールに表示されるログレベルを変更します。'
        })
        .addStringOption(option =>
          option
            .setName('level')
            .setNameLocalizations({
              ja: 'レベル'
            })
            .setDescription('Log level')
            .setDescriptionLocalizations({
              ja: 'ログレベル'
            })
            .setRequired(true)
            .addChoices(
              {name: 'trace', value: 'trace'},
              {name: 'debug', value: 'debug'},
              {name: 'info', value: 'info'},
              {name: 'warn', value: 'warn'},
              {name: 'error', value: 'error'},
              {name: 'fatal', value: 'fatal'},
            )
        )
    ),
  /**
   * execute
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    await interaction.deferReply({ephemeral: true});
    switch(interaction.options.getSubcommand()) {
      case 'logger_level':
        const level = interaction.options.getString('level');
        await dbclient.connection(`UPDATE global_settings SET log_level = '${level}'`);
        logger.level = level;
        logger[level](`Set logger level to ${level}`);
        await interaction.followUp({
          content: `Set logger level to ${level}\nログレベルを${level}に設定しました。`,
          ephemeral: true
        });
        break;
      default:
        break;
    }
  }
}
