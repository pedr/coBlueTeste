
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('./db.js');
const contatos = require('./contatos.js');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const statement = 'SELECT NOW()';
    const result = await database.customQuery(statement);

    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

app.use('/contatos', contatos);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);// eslint-disable-line no-console
});
