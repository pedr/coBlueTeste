
const router = require('express').Router();
const contatos = require('./contatos/contatos.js');

router.get('/contatos', contatos.getAll);
router.get('/contatos/:id', contatos.getOne);
router.put('/contatos/:id', contatos.update);
router.delete('/contatos/:id', contatos.delete);
router.post('/contatos', contatos.create);

module.exports = router;
