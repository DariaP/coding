
function isPermutation(string1, string2) {

  if (typeof(string1) !== 'string' && typeof(string2) != 'string') {
    throw "invalid input (strings required)";
  }

  if (string1.length != string2.length) {
    return false;
  }

  var chars = {},
      nextChar, i, charNum;

  for (i = 0 ; i < string1.length ; ++i) {
    nextChar = string1.charAt(i);
    charNum = chars[nextChar];
    if ( charNum ) {
      chars[nextChar] = charNum + 1;
    } else {
      chars[nextChar] = 1;
    }
  }

  for (i = 0 ; i < string2.length ; ++i) {
    nextChar = string2.charAt(i);
    charNum = chars[nextChar];
    if ( charNum ) {
      if (charNum > 1) {
        chars[nextChar] = charNum - 1;
      } else {
        delete chars[nextChar];
      }
    } else {
      return false;
    }
  }

  if (Object.keys(chars).length === 0)
    return true;
  else
    return false;
}

module.exports = isPermutation;