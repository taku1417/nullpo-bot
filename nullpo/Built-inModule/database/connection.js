const execute = require('./execute.js');

async function connection(querySQL) {
    logger.trace("[db] connection.js")
    const res = await execute(querySQL);
    return res;
}

module.exports = connection;