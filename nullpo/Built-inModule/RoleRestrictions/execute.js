const { GuildMember, Collection } = require('discord.js');

/**
 * 
 * @param {GuildMember} oldMember 
 * @param {GuildMember} newMember 
 */
function execute(oldMember, newMember) {
  logger.trace('[RoleRestrictions] execute.js');
  const restrictRoleId = Restriction_Role[oldMember.guild.id];
  if(newMember.roles.cache.has(restrictRoleId) && newMember.roles.cache.size <= 2) {
    logger.trace("[RoleRestrictions] exit.");
    return true;
  }
    try {
      if(oldMember.roles.cache.get(restrictRoleId)) {
        newMember.roles.cache.forEach(role => {
          if(newMember.guild.id != role.id && restrictRoleId != role.id) {
            newMember.roles.remove(role.id);
            logger.trace("[RoleRestrictions] remove: " + role.id);
          } else {
            logger.trace("[RoleRestrictions] skip: " + role.id)
          }
        });//該当ロール以外を削除
      logger.trace("[RoleRestrictions] execution completed.");
      }
    } catch (err) {
      logger.error('[RoleRestrictions] error occurred.', err);
    }
  }

module.exports = execute;
