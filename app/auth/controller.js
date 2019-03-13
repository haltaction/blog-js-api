const express = require('express');
const router = express.Router();
const joi = require('joi');
const User = require('./user.model');

const signupValidator = (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
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

router.post('/signup', [signupValidator, (req, res, next) => {
  const userData = req.body;

  let user = new User(userData);
  user.save().then((data) => {
    console.log(data);
  }).catch((error) => {
    console.error(err);
  });


  res.send('ok');
}]);

module.exports = router;