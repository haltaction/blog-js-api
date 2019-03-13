const md5 = require('md5');

function getHash(stringData = '') {
  return md5(stringData);
}