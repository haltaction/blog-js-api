const express = require('express');
const router = express.Router();
const joi = require('joi');
const User = require('./user.model');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signupValidator = (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confPassword: joi.string().valid(joi.ref('password')),
  });

  const errors = utils.validate(req.body, schema);

  if (errors) {
    return res.status(400).json({ errors });
  }

  return next();
};

const signinValidator = (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  const errors = utils.validate(req.body, schema);

  if (errors) {
    return res.status(400).json({ errors });
  }

  return next();
};

router.post('/signup', [signupValidator, (req, res, next) => {
  const userData = req.body;

  userData.passwordHash = utils.getHash(userData.password);
  userData.role = 'user';

  let user = new User(userData);

  return user.save().then((data) => {
    console.log(data);
    return res.send({ message: 'ok' });
  }).catch((error) => {
    console.error(error);
    return res.status(500).send({ message: 'error saving data' });
  });
}]);

router.post('/signin', [signinValidator, async (req, res, next) => {
  const userData = req.body;
  userData.passwordHash = utils.getHash(userData.password);

  const user = await User.findOne({
    email: userData.email,
    passwordHash: userData.passwordHash
  }).exec();

  if (user === null) {
    return res.status(400).send({ message: 'User not found' })
  }

  const token = jwt.sign({ email: user.email }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  return res.send({
    token: token
  });
}]);

module.exports = router;