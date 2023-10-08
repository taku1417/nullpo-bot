const config = require('config');
var connectionString = (process.env.NODE_ENV === 'heroku') ? process.env.DATABASE_URL : config.get('DATABASE_URL');
var { Pool } = require('pg');

const pool = new Pool({
    connectionString: connectionString,
    port: 5432,
    max: 6,
    idleTimeoutMillis: 600000,
    ssl: {sslmode: 'require', rejectUnauthorized: false}
});

pool.on('error', (err, client) => {
    logger.error('[DB] Unexpected error on idle client', err);
    throw_webhook("error", "postgreSQL(DB): query error.", err);
});

pool.on('connect', (client) => {
    logger.debug('[DB] pool connected.');
});

pool.on('remove', (client) => {
    logger.debug('[DB] pool removed.');
});

pool.on('acquire', (client) => {
    logger.trace('[DB] client acquired. total: ' + pool.totalCount + ', idle: ' + pool.idleCount + ', waiting: ' + pool.waitingCount);
});

pool.on('release', (client) => {
    logger.trace('[DB] client released. total: ' + pool.totalCount + ', idle: ' + pool.idleCount + ', waiting: ' + pool.waitingCount);
});


module.exports = pool;