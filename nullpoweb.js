const config = require('config');
process.env.NODE_ENV === 'default';
var retry_ms = 5000;  //. retry every 5 sec
var connectionString = (process.env.NODE_ENV === 'heroku') ? process.env.DATABASE_URL : config.get('DATABASE_URL');
var PG = require('pg');
const express = require('express');
const throw_webhook = require('./function/throw_webhook');
const app = express();
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    logger.log("listening server on port " + PORT);
})

logger.info( '[postgreSQL] connecting...' );
var pg = new PG.Pool({
    connectionString: connectionString,
    port: 5432,
    ssl: {rejectUnauthorized: false}
});
pg.on( 'error', function( err ){
    logger.error( "[postgreSQL] db connection error on starting. retry connect every" + retry_ms + "ms.\n" + 
                    "[postgreSQL] データベースへの接続に失敗しました。" + retry_ms + "ミリ秒ごとに再接続を試みます。", err );
    throw_webhook("error", "postgreSQL: db connection error. retry connect every" + retry_ms + "ms.", err);
    if( err.code && err.code.startsWith( '5' ) ){
        //. terminated by admin?
        try_reconnect( retry_ms );
    }
});


function try_reconnect( ts ){
  setTimeout( function(){
    logger.info( '[postgreSQL] reconnecting...' );
    pg = new PG.Pool({
        connectionString: connectionString,
        port: 5432,
        ssl: {rejectUnauthorized: false}

    });
    pg.on( 'error', function( err ){
        logger.error( '[postgreSQL] db connection error on working. retry connect after' + retry_ms + "ms.\n" + 
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
                logger.error("[postgreSQL] query error occurred.\n[postgreSQL] クエリ実行時にエラーが発生しました。\n\n" + { err } );
                throw_webhook("error", "postgreSQL: query error.", err);
            } else {//実行成功時
        
            }
        });
    } catch ( e ){//エラー時
        logger.error("[postgreSQL] error occurred.\n[postgreSQL] エラーが発生しました。\n\n" + e);
        throw_webhook("error", "postgreSQL: error.", e);
    } finally {
        if( connection ){
            connection.release();//dbをプールに戻す
        }
    }
}

app.get( '/', function( req, res ){
	res.contentType( 'application/json; charset=utf-8' );
	res.write( JSON.stringify( { status: true }, null, 2 ) );
	res.write( "準備中...");
	res.end();
  });

app.get( '/ping', async function( req, res ){
	res.contentType( 'application/json; charset=utf-8' );
	var conn = null;
	try{
	    conn = await pg.connect();
	    var sql = 'select 1';
	    var query = { text: sql, values: [] };
	    conn.query( query, function( err, result ){
		if( err ){
		    logger.error( { err } );
		    res.status( 400 );
		    res.write( JSON.stringify( { status: false, error: err }, null, 2 ) );
		    res.end();
		}else{
		    //logger.debug( { result } );
		    res.write( JSON.stringify( { status: true, result: result }, null, 2 ) );
		    res.end();
		}
	    });
	}catch( e ){
	    res.status( 400 );
	    res.write( JSON.stringify( { status: false, error: e }, null, 2 ) );
	    res.end();
	}finally{
	    if( conn ){
		    conn.release();
	    }
	}
});

module.exports = query_execute;