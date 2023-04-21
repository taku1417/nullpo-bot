const config = require('config');
process.env.NODE_ENV === 'default';
var retry_ms = 5000;  //. retry every 5 sec
var connectionString = (process.env.NODE_ENV === 'heroku') ? process.env.DATABASE_URL : config.get('DATABASE_URL');
var PG = require('pg');


function sql_connect() {
    console.log( '[postgreSQL] connecting...' );
    var pg = new PG.Pool({
        connectionString: connectionString,
        port: 5432,
        ssl: {rejectUnauthorized: false}
    });
    pg.on( 'error', function( err ){
        console.log( "[postgreSQL] db connection error on starting. retry connect every" + retry_ms + "ms.\n" + 
                     "[postgreSQL] データベースへの接続に失敗しました。" + retry_ms + "ミリ秒ごとに再接続を試みます。", err );
        if( err.code && err.code.startsWith( '5' ) ){
            //. terminated by admin?
            try_reconnect( retry_ms );
        }
    });
}

function try_reconnect( ts ){
  setTimeout( function(){
    console.log( '[postgreSQL] reconnecting...' );
    pg = new PG.Pool({
        connectionString: connectionString,
        port: 5432,
        ssl: {rejectUnauthorized: false}

    });
    pg.on( 'error', function( err ){
      console.log( '[postgreSQL] db connection error on working. retry connect after' + retry_ms + "ms.\n" + 
                   "[postgreSQL] データベースへの接続に失敗しました。" + retry_ms + "ミリ秒後に再接続を試みます。", err );
      if( err.code && err.code.startsWith( '5' ) ){
        //. terminated by admin?
        try_reconnect( ts );
      }
    });
  }, ts );
}

async function query_execute(query_sql) {
    var connection = null;
    try {
        connection = await pg.connect();
        var query = { text: query_sql, values: [] };
        connection.query( query, function( err, result ){
            if ( err ){//クエリ実行のエラー時
                console.error("[postgreSQL] query error occurred.\n[postgreSQL] クエリ実行時にエラーが発生しました。\n\n" + { err } );
            } else {//実行成功時
        
            }
        });
    } catch ( e ){//エラー時
        console.error("[postgreSQL] error occurred.\n[postgreSQL] エラーが発生しました。\n\n" + e);
    } finally {
        if( connection ){
            connection.release();//dbをプールに戻す
        }
    }
}

module.exports = sql_connect, query_execute, try_reconnect;