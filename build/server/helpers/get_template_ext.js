// Generated by CoffeeScript 1.8.0
var fs, path;

fs = require('fs');

path = require('path');

module.exports = function() {
  var e, ext, t;
  ext = 'js';
  try {
    t = path.resolve(__dirname, "..", "views/login." + ext);
    console.log(t);
    fs.lstatSync(path.resolve(__dirname, "..", "views/login." + ext));
  } catch (_error) {
    e = _error;
    console.log(e);
    ext = 'jade';
  }
  return ext;
};
