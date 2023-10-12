const config = require('config');
var connectionString = (process.env.NODE_ENV === 'heroku') ? process.env.DATABASE_URL : config.get('DATABASE_URL');
var { Pool } = require('pg');

const pool = new Pool({
    connectionString: connectionString,
    port: 5432,
    max: 6,
    idleTimeoutMillis: 60000,
    ssl: {sslmode: 'require', rejectUnauthorized: false},
    connectionTimeoutMillis: 60000,
    application_name: 'nullpo-bot (discord.js)'
});

pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client', err);
    throw_webhook("error", "postgreSQL(DB): query error.", err);
});

pool.on('connect', () => {
    console.log('[DB] connected.');
});

pool.on('remove', () => {
    console.log('[DB] client removed.');
});

pool.on('acquire', () => {
    console.log('[DB] client acquired. total: ' + pool.totalCount + ', idle: ' + pool.idleCount + ', waiting: ' + pool.waitingCount);
});

pool.on('release', () => {
    console.log('[DB] client released. total: ' + pool.totalCount + ', idle: ' + pool.idleCount + ', waiting: ' + pool.waitingCount);
});


module.exports = pool;