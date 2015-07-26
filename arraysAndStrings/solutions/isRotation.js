
function isSubstring(string, substring) {
  return string.indexOf(substring) > -1;  
}

function isRotation(string1, string2) {
  if (typeof(string1) !== 'string' || typeof(string2) !== 'string') {
    throw 'Invalid input (strings expected)';
  }
  return isSubstring(string1.concat(string1), string2);
}

module.exports = isRotation;