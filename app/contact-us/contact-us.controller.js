const express = require('express');
const router = express.Router();
const joi = require('joi');
const utils = require('../utils');
const mailer = require("nodemailer");

const smtpTransport = mailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  secure: false,
  auth: {
    user: "8c8f7cf41ca3a3e72d8da3797a7c9e5e",
    pass: "62b45131692ae41ebacd4e97b1b71f96"
  }
});

const contactUsValidator = (req, res, next) => {
  const schema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    subject: joi.string().required(),
    message: joi.string().required(),
  });

  const errors = utils.validate(req.body, schema);

  if (errors) {
    return res.status(400).json({ errors });
  }

  return next();
};

router.post('/contact-us', [contactUsValidator, (req, res, next) => {
  const adminEmail = 'marinakorsyn@gmail.com';

  smtpTransport.sendMail(
    { // todo move to config
      from: "haltaction@ex.ua",
      to: adminEmail,
      subject: "New contact form message",
      text: `You got a new message via contact form:
      from "${req.body.name}",
      email "${req.body.email}",
      subject: "${req.body.subject}",
      message: "${req.body.message}"`,
    },
    (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).send({
          massage: 'Something wrong'
        });
      }

      console.log(data);
      return res.send({
        massage: 'Success'
      });
    }
  );
}]);



module.exports = router;