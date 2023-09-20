const config = require('config');
var connectionString = (process.env.NODE_ENV === 'heroku') ? process.env.DATABASE_URL : config.get('DATABASE_URL');
var { Pool } = require('pg');

const pool = new Pool({
    connectionString: connectionString,
    port: 5432,
    max: 5,
    ssl: {
        sslmode: 'require',
        rejectUnauthorized: false
    }
});

module.exports = pool;