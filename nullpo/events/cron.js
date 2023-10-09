const cron = require('node-cron');

function cronjob() {
    logger.trace("[Events] cron.js");
    cron.schedule('0 0 * * *', () => {
    });
}

module.exports = cronjob;