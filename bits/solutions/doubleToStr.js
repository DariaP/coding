function doubleToStr(number) {

  if (number < 0 || number >= 1) {
    return null;
  }

  var result = "0",
      digits = 0;
      integer = number; 

  do {
    integer = integer * 10;
    digits++;
  } while (Math.floor(integer) !== integer);

  if (digits === 0) {
    return "0";
  } else {
    return "0." + integer.toString(2);
  }
}