singlyLinkedList = require('../../utils/linkedList').singlyLinkedList;

function isPalindrome(list) {
  var parts = split(list);
  var result = parts.first.equals(parts.second);
  restore(list, parts);
  return result;
}

function split(list) {

  var firstPart = singlyLinkedList(),
      median = null,
      size = list.size(),
      pairsNum = Math.floor(size / 2);

  for (var i = 0 ; i < pairsNum ; ++i) {
    firstPart.addHeadNode(list.deleteHead());
  }

  if (isOdd(size)) {
    median = list.deleteHead();
  }

  return {
    first: firstPart,
    median: median,
    second: list
  };
}

function areEqual(list1, list2) {
  var iterator1 = list1.iterator(),
      iterator2 = list2.iterator();

  while (iterator1.hasNext()) {
    if (iterator1.next() !== iterator2.next()) {
      return false;
    }
  }
  return true;
}

function restore(list, parts) {
  if (parts.median) {
    list.addHeadNode(parts.median);
  }
  while (parts.first.size() !== 0) {
    list.addHeadNode(parts.first.deleteHead())
  }
}

function isOdd(number) {
  return (number % 2 !== 0)
}

module.exports = isPalindrome;