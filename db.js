const Pool = require('pg-pool');

const pool = new Pool({
      user: "postgres",
      password: "",
      database: "postgres",
      host: "localhost",
      port: 5432
  })


exports.pool = pool;
