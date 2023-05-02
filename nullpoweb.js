const config = require('config');
process.env.NODE_ENV === 'default';
var retry_ms = 5000;  //. retry every 5 sec
var connectionString = (process.env.NODE_ENV === 'heroku') ? process.env.DATABASE_URL : config.get('DATABASE_URL');
var PG = require('pg');
const { request } = require('undici');
const express = require('express');
const { stringify } = require('uuid');
const app = express();
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("listening server on port " + PORT);
})


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
                code = "1";
                return err;
            } else {//実行成功時
                code = "0";
                return result;
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

app.get( '/', async ({ query }, res ) => {
	const { code } = query;

	if (code) {
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: config.get('CLIENT_ID'),
					client_secret: config.get('CLIENT_SECRET'),
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${PORT}`,
					scope: 'identify',
			}).toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		const oauthData = await tokenResponseData.body.json();
		const UserResult = await request('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${oauthData.token_type} ${oauthData.access_token}`,
			},
		});
		console.log(await UserResult.body.json());
		} catch (error) {
			console.error(error);
		}
	}
	return res.sendFile( './nullpo/web/mainpage.html', { root: '.' });
});

app.get( '/ping', async function( req, res ){
	res.contentType( 'application/json; charset=utf-8' );
	var conn = null;
	try{
	    conn = await pg.connect();
	    var sql = 'SELECT 1';
	    var query = { text: sql, values: [] };
	    conn.query( query, function( err, result ){
		    if( err ){
		        console.log( { err } );
		        res.status( 400 );
		        res.write( JSON.stringify( { status: false, error: err }, null, 2 ) );
		        res.end();
		    }else{
		        //console.log( { result } );
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

app.get( '/coin', async function( req, res ){
	res.contentType( 'application/json; charset=utf-8' );
	var conn = null;
	try{
	    conn = await pg.connect();
	    var sql = 'SELECT * FROM coins';
	    var query = { text: sql, values: [] };
	    conn.query( query, function( err, result ){
		if( err ){
		    console.log( { err } );
		    res.status( 400 );
		    res.write( JSON.stringify( { status: false, error: err }, null, 2 ) );
		    res.end();
		}else{
		    //console.log( { result } );
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