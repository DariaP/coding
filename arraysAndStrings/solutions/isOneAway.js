
function isOneAway(string1, string2) {

  if (typeof(string1) !== 'string' || typeof(string2) !== 'string')
    throw "Invalid input (strings expected)";
  
  if (string1.length > string2.length + 1 || string2.length > string1.length + 1)
    return false;

  var length;
  if (string1.length >= string2.length)
    length = string2.length;
  else if (string1.length < string2.length)
    length = string1.length;

  for (var i = 0 ; i < length ; ++i) {
    var char1 = string1.charAt(i),
        char2 = string2.charAt(i);
    if (char1 !== char2) {
      var isInsertion = string1.substring(i, string1.length) === string2.substring(i + 1, string2.length),
          isRemoval = string1.substring(i + 1, string1.length) == string2.substring(i, string2.length),
          isReplacement = string1.substring(i + 1, string1.length) == string2.substring(i + 1, string2.length);
      return  isInsertion || isRemoval || isReplacement;
    }
  }

  return true;
}

module.exports = isOneAway;