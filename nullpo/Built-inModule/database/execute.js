const throw_webhook = require('../../../function/throw_webhook');
const try_reconnect = require('./tryReconnect');
const pool = require('./pool');
logger.info( '[postgreSQL] connecting...' );

async function execute(querySQL) {
    let connect = null;
    try {
    connect = await pool.connect();
    const res = await connect.query(querySQL);
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