const knex = require('knex')({
    client: 'pg',
    version: '^8.7.3',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: false
    }
})

module.exports = knex;