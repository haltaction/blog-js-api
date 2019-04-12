#!/usr/bin/env node

require('dotenv').config();
require('./../database/connection');
const User = require('../auth/user.model');
const utils = require('../utils');

const seedData = {
  name: 'test-admin',
  email: 'admin@mail.xyz',
  passwordHash: utils.getHash('Qwerty2019'),
  role: 'admin'
};

let user = new User(seedData);

user.save().then((data) => {
  console.log('Admin saved');
  return process.exit(0);
}).catch((error) => {
  console.error('An error while saving Admin');
  return process.exit(0);
});


