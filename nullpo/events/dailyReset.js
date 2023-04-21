const config = require('config');
const query_execute = require('./database_connection.js');

function dailyReset() {
    let query = 'SELECT * FROM coins;';
}

module.exports = dailyReset;