function insert(num1, num2, i, j) {
  return setToNulls(num1, i, j) | (num2 << j);
}

function setToNulls(num, start, end) {

  var ones = ~(1 << 31);
  
  var mask = ~((ones >> (30 - start)) ^ (ones >> (31 - end)));

  return num & mask;
}

module.exports = insert;