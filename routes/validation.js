
const Joi = require('@hapi/joi');

const createUserValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  
});

const loginUserValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  
});


const masterDataValidation = Joi.object({
    tenant_name: Joi.string().required(),
    identity: Joi.string().required(),
    identity_key: Joi.string().required(),
    station: Joi.any().required()
});

  module.exports.createUserValidation = createUserValidation;
  module.exports.loginUserValidation = loginUserValidation;
  module.exports.masterDataValidation = masterDataValidation;