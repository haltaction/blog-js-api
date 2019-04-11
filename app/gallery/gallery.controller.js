const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/gallery/images', async (req, res, next) => {
  const filesPath = './app/data/gallery-img';

  try {
    const files = fs.readdirSync(filesPath);
    const imagesPaths = files.map(fileName => {
      return '/public/' + fileName;
    });

    return res.send(imagesPaths);
  } catch (error) {
    console.error('gallery', error);
    return res.status(500).send();
  }
});

module.exports = router;