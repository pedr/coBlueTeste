
const database = require('./db.js');

const service = {};

service.add = async (data) => {
  try {
    const {
      nomeVendedor,
      nomeEmpresa,
      nomeContato,
      email,
      telefone,
      dataContato,
      dataValidade,
    } = data;
    const statement = 'INSERT INTO contato (nome_vendedor, nome_empresa, nome_contato, email, telefone, data_contato, data_validade) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    const result = await database.customQuery(statement, [
      nomeVendedor,
      nomeEmpresa,
      nomeContato,
      email,
      telefone,
      dataContato,
      dataValidade,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

service.getAll = async () => {
  try {
    const statement = 'SELECT id, nome_vendedor AS "nomeVendedor", nome_empresa AS "nomeEmpresa", nome_contato AS "nomeContato", email, telefone, data_contato AS "dataContato", data_validade AS "dataValidade" FROM contato ORDER BY data_contato DESC';
    const result = await database.customQuery(statement);

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};


module.exports = service;
