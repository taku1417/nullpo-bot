const throw_webhook = require('../../../function/throw_webhook');
const try_reconnect = require('./tryReconnect');
const pool = require('./pool');
console.log( '[postgreSQL] connecting...' );

async function execute(querySQL) {
    let connect = null;
    try {
    connect = await pool.connect();
    const res = await connect.query(querySQL);
    return res.rows;
    } catch (e) {
        console.error(e);
        throw_webhook("error", "postgreSQL: error.", e);
    } finally {
        if( connect ){
            connect.release();//dbをプールに戻す
        }
    }
}

// pg.on( 'error', function( err ){
//     console.log( "[postgreSQL] db connection error on starting. retry connect every" + retry_ms + "ms.\n" + 
//                     "[postgreSQL] データベースへの接続に失敗しました。" + retry_ms + "ミリ秒ごとに再接続を試みます。", err );
//     throw_webhook("error", "postgreSQL: db connection error. retry connect every" + retry_ms + "ms.", err);
//     if( err.code && err.code.startsWith( '5' ) ){
//         //. terminated by admin?
//         try_reconnect(pg, null);
//     }
// });

module.exports = execute;