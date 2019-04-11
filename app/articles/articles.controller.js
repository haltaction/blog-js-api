const express = require('express');
const router = express.Router();
const joi = require('joi');
const Article = require('./article.model');
const User = require('./../auth/user.model');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');

const articlesValidator = (req, res, next) => {
  const schema = joi.object().keys({
    title: joi.string().min(3).max(200).required(),
    description: joi.string().required(),
    shortDescription: joi.string().required(),
    imagesUrls: joi.array().items(joi.string().uri()).max(5).required(),
    location: joi.string(),
  });

  const errors = utils.validate(req.body, schema);

  if (errors) {
    return res.status(400).json({ errors });
  }

  return next();
};

const authChecker = async (req, res, next) => {
  const token = req.get('X-Auth-Token');
  const hasRole = await hasUserRole(token, 'admin');

  if (!hasRole) {
    return res.status(401).send({ message: 'Unauthorized user' });
  }

  return next();
};

router.post('/articles', [authChecker, articlesValidator, (req, res, next) => {
  const data = req.body;

  let article = new Article(data);

  return article.save().then((data) => {
    console.log(data);
    return res.send({ message: 'ok' });
  }).catch((error) => {
    console.error(error);
    return res.status(500).send({ message: 'error saving data' });
  });
}]);

router.get('/articles', async (req, res, next) => {
  const articles = await Article.find({}, '-updatedAt -__v').exec();

  return res.send(articles);
});

router.get('/articles/:id', async (req, res, next) => {
  const id = req.params.id;
  let article;

  if (!id) {
    return res.status(404);
  }

  try {
    article = await Article.findById(id, '-updatedAt -__v').exec();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(404).send();
    }
    return res.status(500).send();
  }

  return res.send(article);
});

async function hasUserRole(token, roleName) {
  if (!token || !roleName) {
    return false
  }
  let payload;

  try {
    payload = jwt.verify(token, config.secret)
  } catch (error) {
    return false
  }

  const user = await User.findOne(
    {
      email: payload.email
    },
    '-_id role'
  ).exec();

  if (!user) {
    return false;
  }

  return user.role === roleName;
}

module.exports = router;
