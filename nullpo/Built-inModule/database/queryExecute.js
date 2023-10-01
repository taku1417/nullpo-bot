var PG = require('pg');
const throw_webhook = require('../../../function/throw_webhook');

/**
 * クエリ処理を実行する。エラーになるとコンソールとwebhookにエラーを投げる。
 * @param {PG.Pool} pg
 * @param {PG.Query} query_sql
 * @return {boolean} query_result
 * @throws {Error} query_error
 */
async function query_execute(pg, query_sql) {
    let connection = null;
    try {
        connection = await pg.connect();
        var query = { text: query_sql, values: [] };
        connection.query( query, function( err, result ){
            if ( err ){//クエリ実行のエラー時
                console.error("[postgreSQL] query error occurred.\n[postgreSQL] クエリ実行時にエラーが発生しました。\n\n" + { err } );
                throw_webhook("error", "postgreSQL: query error.", err);
            } else {//実行成功時
        
            }
        });
    } catch ( e ){//クエリ接続等のエラー時
        console.error("[postgreSQL] error occurred.\n[postgreSQL] エラーが発生しました。\n\n" + e);
        throw_webhook("error", "postgreSQL: error.", e);
    } finally {
        if( connection ){
            connection.release();//dbをプールに戻す
        }
    }
}

module.exports = query_execute;