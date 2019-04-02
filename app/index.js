const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');

require('./database/connection');
require('dotenv').config();
const port = process.env.PORT || 9000;

const authController = require('./auth/user.controller');
const galleryController = require('./gallery/gallery.controller');
const contactUsController = require('./contact-us/contact-us.controller');

app.get('/', (req, res) => res.send('test'));

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '/data/gallery-img')));

app.use(authController);
app.use(galleryController);
app.use(contactUsController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));