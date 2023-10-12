const logger = require('../../../log/logger.js');
const { ContextMenuCommandBuilder, PermissionsBitField, ApplicationCommandType, UserContextMenuCommandInteraction, Client, Interaction } = require('discord.js');
const dbclient = require('../../../Built-inModule/database/index.js');
const throw_webhook = require('../../../../function/throw_webhook.js');
const monsterCards = require('../../../Built-inModule/monsterCards_rateBattle/index.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('MonsterCardsの情報を見る')
        .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {Interaction<UserContextMenuCommandInteraction>} interaction 
     * @param {Client} client 
     * @returns {void}
     * @private
     */
    async execute(interaction, client) {
        logger('command');
        monsterCards.info('context', interaction, client);
    }
};
