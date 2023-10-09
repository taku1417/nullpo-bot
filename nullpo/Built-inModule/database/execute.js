const throw_webhook = require('../../../function/throw_webhook');
const try_reconnect = require('./tryReconnect');
const pool = require('./pool');
logger.info( '[postgreSQL] connecting...' );

async function execute(querySQL) {
    logger.trace("[db] execute.js");
    let connect = null;
    try {
        logger.trace("[db] execute.js: try query");
        connect = await pool.connect();
        const res = await connect.query(querySQL);
        logger.trace("[db] execute.js: query executed");
        return res.rows;
    } catch (e) {
        logger.error(e);
        throw_webhook("error", "postgreSQL: error.", e);
    } finally {
        if( connect ){
            connect.release();//dbをプールに戻す
        }
    }
}

module.exports = execute;