/* replace all spaces with %20 in place */

var mutableString = function(string) {

  if (typeof(string) !== "string") {
    throw "Invalid input (string required)";
  }

  var chars = [];
  for (var i = 0 ; i < string.length ; ++i) {
    chars[i] = string.charAt(i);
  }

  return {
    URLify : function() {
      var offset = 0, i,
          spaceReplacement = "%20",
          offsetForSpace = spaceReplacement.length - 1;// - 1 because we also remove spaces
      for (i = 0 ; i < chars.length ; ++i) {
        if (chars[i] == " ") {
          offset += offsetForSpace;
        }
      }

      for (i = chars.length - 1 ; i >= 0 ; --i) {
        if (chars[i] == " ") {
          replaceSpaceAt(i);
          offset -= offsetForSpace;
        } else {
          chars[i + offset] = chars[i];
        }
      }

      function replaceSpaceAt(pos) {
        // copy space replacement from end to beginning
        for (var i = 0 ; i < spaceReplacement.length ; ++i) {
          chars[pos + offset - i] = spaceReplacement[spaceReplacement.length - 1 - i];
        }
      }
    },
    toString : function() {
      return chars.join("");
    }
  }
}

module.exports = mutableString;