
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('./db.js');
const router = require('./router.js');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('public'));

// teste database
app.get('/teste', async (req, res) => {
  try {
    const statement = 'SELECT NOW()';
    const result = await database.customQuery(statement);

    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);// eslint-disable-line no-console
});
