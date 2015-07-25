

function isPalindromPermutation(string) {

  if (typeof(string) !== 'string') {
    throw "Invalid input (string expected)";
  }

  var chars = {};
  fillHashTable();
  return checkHashTable();


  function fillHashTable() {
    var nextChar, charNum;

    for (var i = 0 ; i < string.length ; ++i) {
      nextChar = string.charAt(i);
      charNum = chars[nextChar];
      if (charNum) {
        chars[nextChar]++;
      } else {
        chars[nextChar] = 1;
      }
    }
  }
  
  function checkHashTable() {
    var nextChar = null,
        oneOddCharNumber = false,
        allChars = Object.keys(chars);
    for (var i = 0 ; i < allChars.length ; ++i ) {
      nextChar = allChars[i];
      if (isOdd(chars[nextChar])) {
        if (isOdd(string.length) && !oneOddCharNumber) {
          oneOddCharNumber = true;
        } else {
          return false;
        }
      }
    }

    return true;
  }

  function isOdd(number) {
    return number % 2;
  }
}

module.exports = isPalindromPermutation;