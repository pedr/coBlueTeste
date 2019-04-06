
const contatosService = require('./contatosService.js');
const contatos = {};

contatos.getAll = async (req, res) => {
  try {
    const result = await contatosService.getAll();
    if (!result) {
      res.sendStatus(400);
      return;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

contatos.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contatosService.getOne(id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

contatos.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await contatosService.update(data, id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

contatos.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contatosService.delete(id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

contatos.create = async (req, res) => {
  try {
    const data = req.body;
    const result = await contatosService.add(data);
    if (!result) {
      res.sendStatus(400);
      return;
    }
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports = contatos;
