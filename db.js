
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function customQuery(statement, args) {
  try {
    const client = await pool.connect();
    const result = await client.query(statement, args);
    if (result.rowCount < 1) {
      return null;
    }

    if (result.rowCount === 1) {
      return result.rows[0];
    }

    return result.rows;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { customQuery };
