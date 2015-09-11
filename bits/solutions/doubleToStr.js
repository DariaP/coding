function doubleToStr(number) {

  if (number < 0 || number >= 1) {
    return null;
  }

  var result = "0",
      digits = 0,
      zeros = 0,
      integer = number,
      mul = 10; 

  while (Math.floor(integer) !== integer) {
    integer = number * mul;
    mul = mul * 10;
    if (integer < 1) {
      zeros++;
    }
    if (digits++ === 32) {
      return null;
    }
  }

  if (digits !== 0) {
    result = "0.";
    for (var i = 0 ; i < zeros ; i++) {
      result = result + "0";
    }
    result = result + integer.toString(2);
  }

  return result;
}

module.exports = doubleToStr;