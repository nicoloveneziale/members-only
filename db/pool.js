const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: String(process.env.DATABASE_URL),
});

module.exports = pool;
