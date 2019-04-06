
const database = require('../db.js');

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

service.update = async (data, id) => {
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
    const statement = 'UPDATE contato SET nome_vendedor= $1, nome_empresa = $2, nome_contato = $3, email = $4, telefone = $5, data_contato = $6, data_validade = $7 WHERE id = $8 RETURNING id, nome_vendedor AS "nomeVendedor", nome_empresa AS "nomeEmpresa", nome_contato AS "nomeContato", email, telefone, data_contato AS "dataContato", data_validade AS "dataValidade"';
    const result = await database.customQuery(statement, [
      nomeVendedor,
      nomeEmpresa,
      nomeContato,
      email,
      telefone,
      dataContato,
      dataValidade,
      id,
    ]);

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

service.delete = async (id) => {
  try {
    const statement = 'DELETE FROM contato WHERE id = $1 RETURNING id';
    const result = await database.customQuery(statement, [id]);

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

service.getOne = async (id) => {
  try {
    const statement = 'SELECT id, nome_vendedor AS "nomeVendedor", nome_empresa AS "nomeEmpresa", nome_contato AS "nomeContato", email, telefone, data_contato AS "dataContato", data_validade AS "dataValidade" FROM contato WHERE id = $1';
    const result = await database.customQuery(statement, [id]);

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};


module.exports = service;
