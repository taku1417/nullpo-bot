const execute = require('./execute.js');

async function connection(querySQL) {
    const res = await execute(querySQL);
    return res;
}

module.exports = connection;