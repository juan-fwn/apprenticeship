const Joi = require('joi');

const create = Joi.object().keys({
  name: Joi.string().min(3).required(),
});

module.exports = {
  create,
};
