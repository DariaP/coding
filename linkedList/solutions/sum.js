var list = require('../../utils/linkedList').singlyLinkedList;

function sum(list1, list2) {
  var iterator1 = list1.iterator(),
      nextValue1 = null,
      iterator2 = list2.iterator(),
      nextValue2 = null,
      carry = 0,
      nextSum = 0,
      sumList = list();

  while (iterator1.hasNext() || iterator2.hasNext() || carry !== 0) {
    nextValue1 = (iterator1.hasNext()) ? iterator1.next() : 0;
    nextValue2 = (iterator2.hasNext()) ? iterator2.next() : 0;

    checkIfDigit(nextValue1);
    checkIfDigit(nextValue2);

    nextSum = nextValue1 + nextValue2 + carry;
    if (nextSum > 9) {
      carry = 1;
      nextSum = nextSum - 10;
    } else {
      carry = 0;
    }
    sumList.add(nextSum);
  }

  return sumList;


  function checkIfDigit(value) {
    if(typeof(value) !== 'number' || value < 0 || value > 9 ) {
      throw "Invalid input (list of digits expected)";
    }
  }
}

module.exports = sum;