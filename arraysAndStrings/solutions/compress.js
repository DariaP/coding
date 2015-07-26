function compress(string) {

  if (typeof(string) !== 'string') {
    throw "Invalid input (string expected)";
  }

  var lastChar = null,
      nextChar = null,
      chars = [];
  for (var i = 0 ; i < string.length ; ++i) {
    nextChar = string.charAt(i);

    if (!nextChar.match(/[a-z]/i)) {
      throw "Invalid input (string of chars a-zA-Z expected)";
    }

    if (nextChar === lastChar) {
      chars[chars.length - 1].num++;
    } else {
      lastChar = nextChar;
      chars.push({
        nextChar: nextChar,
        num: 1
      });
    }
  }

  var compressedString = chars.map(function(charObj) {
    return "" + charObj.nextChar + charObj.num;
  }).join("");

  if (compressedString.length < string.length) {
    return compressedString;
  } else {
    return string;
  }
}

module.exports = compress;