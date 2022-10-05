const { createPool } = require('mysql2/promise');

const pool = createPool({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb",
    connectionLimit: 10
});

module.exports = pool;