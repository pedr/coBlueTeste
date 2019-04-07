
const contatosService = require('./contatosService.js');
const validateContatos = require('./contatosSanitize.js');

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

    const { validateData, error } = await validateContatos(data);
    if (error) {
      console.error(error);
      res.sendStatus(400);
      return;
    }

    const result = await contatosService.update(validateData, id);
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
      res.json([]);
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

    const { validateData, error } = await validateContatos(data);
    if (error) {
      console.error(error);
      res.status(400).json(error);
      return;
    }

    const result = await contatosService.add(validateData);
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
