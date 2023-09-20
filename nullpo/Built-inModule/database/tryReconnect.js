const Retry_ms_initial = 5000;  //. retry every 5 sec

/**
 * 接続に成功するまで再接続を試みる 一度実行すると止まらないので注意 retry_msをnullにすると5000にする
 * @param {Pool} pg
 * @param {number|null} retry_ms
 * @return {undefined}
 */
function try_reconnect(pg, retry_ms){
    retry_ms ?? Retry_ms_initial;
        setTimeout( function(){
        console.log( '[postgreSQL] reconnecting...' );
        pg.on( 'error', function( err ){
            console.log( '[postgreSQL] db connection error on working. retry connect after' + retry_ms + "ms.\n" + "[postgreSQL] データベースへの接続に失敗しました。" + retry_ms + "ミリ秒後に再接続を試みます。", err );
            if( err.code && err.code.startsWith( '5' ) ){
                //. terminated by admin?
                try_reconnect( pg, retry_ms );
            }
        });
    }, ts );
}


module.exports = try_reconnect;