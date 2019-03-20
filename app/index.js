const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

require('./database/connection');
require('dotenv').config();
const port = process.env.PORT || 9000;

const authController = require('./auth/user.controller');

app.get('/', (req, res) => res.send('test'));

app.use(cors());
app.use(bodyParser.json());
app.use(authController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));