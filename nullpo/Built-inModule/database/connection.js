//const execute = require('./execute.js');
const config = require('config');
const mysql = require('mysql2');
const throw_webhook = require('../../../function/throw_webhook.js');

function connectionfunc(querySQL) {
    logger.trace("[db] connection.js")
    // const res = await execute(querySQL);
    // return res;
    const connection = mysql.createConnection({
        host: process.env.NODE_ENV === 'heroku' ? process.env.MYSQL_HOST : config.get('MYSQL.HOST'),
        user: process.env.NODE_ENV === 'heroku' ? process.env.MYSQL_USER : config.get('MYSQL.USER'),
        password: process.env.NODE_ENV === 'heroku' ? process.env.MYSQL_PASSWORD : config.get('MYSQL.PASSWORD'),
        database: process.env.NODE_ENV === 'heroku' ? process.env.MYSQL_DATABASE_PRODUCTION : config.get('MYSQL.DATABASE.PRODUCTION'),
        port: 4000,
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    });
    
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err);
            logger.error(err);
            process.exit(1);
        }
    });
    return new Promise((resolve, reject) => {
        connection.query(querySQL, (err, res) => {
            if (err) {
                logger.error(err);
                throw_webhook("error", "MySQL(DB): query error.", err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = connectionfunc;