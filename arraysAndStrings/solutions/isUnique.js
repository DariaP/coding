var Set = require('collections/set');

function isUnique(string) {
  var characters = new Set();
  for (var i = 0 ; i < string.length ; ++i) {
    if (characters.has(string.charAt(i))) return false;
    else characters.add(string.charAt(i));
  }
  return true;
}

module.exports = isUnique;