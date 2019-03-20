const md5 = require('md5');
const joi = require('joi');

getHash = (stringData = '') => {
  return md5(stringData);
};

validate = (body, schema) => {
  const { error } = joi.validate(body, schema);
  if (error) {
    return error.details.map(error => {
      return {
        message: error.message,
        field: error.context.key
      }
    });
  }

  return false;
};

//todo method for creating Admin

module.exports = {
  getHash: getHash,
  validate: validate
};