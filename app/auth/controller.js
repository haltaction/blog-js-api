const express = require('express');
const router = express.Router();
const joi = require('joi');

const signupValidatior = (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().required()
  });

  const { error } = joi.validate(req.body, schema);
  if (error) {
    const errors = error.details.map(error => {
      return {
        message: error.message,
        field: error.context.key
      }
    });

    return res.status(400).json({ errors });
  }

  return next();
};

router.post('/signup', [signupValidatior, (req, res, next) => {
  const userData = req.body;

  res.send('ok');
}]);

module.exports = router;