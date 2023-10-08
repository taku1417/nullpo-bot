const cron = require('node-cron');

function cronjob() {
    cron.schedule('0 0 * * *', () => {
    });
}

module.exports = cronjob;