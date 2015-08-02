function intersect(list1, list2) {
  return (list1.getTail() === list2.getTail());
}

function intersectionStart(list1, list2) {
  if (!intersect(list1, list2)) {
    return null;
  }

  iterators = skipLengthDifference(list1, list2);

  return firstSameNode(iterators.first, iterators.second);
}

function skipLengthDifference(list1, list2) {
  var longerListIterator, 
      shorterListIterator,
      sizeDifference;

  if (list1.size() > list2.size()) {
    longerListIterator = list1.nodeIterator();
    shorterListIterator = list2.nodeIterator(); 
    sizeDifference = list1.size() - list2.size();   
  } else {
    longerListIterator = list2.nodeIterator();
    shorterListIterator = list1.nodeIterator();
    sizeDifference = list2.size() - list1.size();  
  }

  for (var i = 0 ; i < sizeDifference ; ++i) {
    longerListIterator.next();
  }

  return {
    first: longerListIterator,
    second: shorterListIterator
  }
}

function firstSameNode(iterator1, iterator2) {
  while (iterator1.hasNext() && iterator2.hasNext()) {
    var nextNode = iterator1.next();
    if (nextNode === iterator2.next()) {
      return nextNode;
    }
  }
  return null;
}

module.exports = intersectionStart;