
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
    client.release();
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

async function createTableIfDoesNotExist() {
  try {
    const statment = `CREATE TABLE IF NOT EXISTS contato (
  id SERIAL,
  nome_vendedor VARCHAR(128) NOT NULL,
  nome_empresa VARCHAR(128),
  nome_contato VARCHAR(128) NOT NULL,
  email VARCHAR(64) NOT NULL,
  telefone VARCHAR(11) NOT NULL,
  data_contato DATE DEFAULT NOW()::DATE,
  data_validade DATE,
  PRIMARY KEY (id)
  );`;

    console.log('Criando tabela se não existir...');
    await customQuery(statment);
    return true;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { customQuery, createTableIfDoesNotExist };
