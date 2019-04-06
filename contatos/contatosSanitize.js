
const Joi = require('joi');

const ONLY_ALPHA_AND_SPACE = new RegExp(/^[0-9a-zA-Z\u00C0-\u00FF ]+$/);
const NUMBERS = new RegExp(/^[0-9]+$/);

function validateContatos(data) {
  const contatosSchema = Joi.object().keys({
    nomeVendedor: Joi.string().regex(ONLY_ALPHA_AND_SPACE).max(128).required(),
    nomeEmpresa: Joi.string().regex(ONLY_ALPHA_AND_SPACE).max(128),
    nomeContato: Joi.string().regex(ONLY_ALPHA_AND_SPACE).max(128).required(),
    email: Joi.string().max(64).email().required(),
    telefone: Joi.string().regex(NUMBERS).max(11).required(),
    dataContato: Joi.date().max('now').iso(),
    dataValidade: Joi.date().iso(),
  });

  const validate = Joi.validate(data, contatosSchema);
  if (validate.error !== null) {
    const err = validate.error.details[0].message;
    console.error(err);
    return { error: err, validateData: null };
  }

  return { error: null, validateData: validate.value };
}

module.exports = validateContatos;
