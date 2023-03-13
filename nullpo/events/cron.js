const cron = require('node-cron');
const dailyReset = require('./dailyReset.js');

function cronjob() {
    cron.schedule('0 0 * * *', () => {
        dailyReset;
    });
}

module.exports = cronjob;