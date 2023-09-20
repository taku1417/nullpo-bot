const throw_webhook = require('../../../function/throw_webhook');
const try_reconnect = require('./tryReconnect');
const pool = require('./pool');
const express = require('express');
const app = express();
console.log( '[postgreSQL] connecting...' );

app.get('/', async function(req, res, next) {
    const connect = await pool.connect();
    const result = await connect.query('SELECT * FROM coins');
    connect.release();
    res.send(result.rows);
});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});

// pg.on( 'error', function( err ){
//     console.log( "[postgreSQL] db connection error on starting. retry connect every" + retry_ms + "ms.\n" + 
//                     "[postgreSQL] データベースへの接続に失敗しました。" + retry_ms + "ミリ秒ごとに再接続を試みます。", err );
//     throw_webhook("error", "postgreSQL: db connection error. retry connect every" + retry_ms + "ms.", err);
//     if( err.code && err.code.startsWith( '5' ) ){
//         //. terminated by admin?
//         try_reconnect(pg, null);
//     }
// });

