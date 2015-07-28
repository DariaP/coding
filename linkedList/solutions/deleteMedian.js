
function deleteMedian(list, median) {
  var iterator1 = list.nodeIterator(),
      iterator2 = list.nodeIterator(median),
      lengthBefore = 0,
      lengthAfter = 0;

  if (!iterator1.hasNext()) {
    throw "Empty list";
  }

  iterator2.next();

  if (!iterator2.hasNext()) {
    var node1 = iterator1.next();
    if(node1.next() === median) {
      // two elements list, second median
      list.deleteNext(node1);
    } else if (node1 === median) {
      // one element list
      list.deleteHead();
    } else {
      throw "Not a median";
    }
  } else {
    iterator2.next();

    var node1 = null;
    while(iterator2.hasNext()) {
      iterator2.next();
      node1 = iterator1.next();
    }

    var beforeMedian = iterator1.next();

    if (beforeMedian === median) {
      // even length, first median
      if (node1 === null) {
        list.deleteHead();
      } else {
        list.deleteNext(node1);
      }
    } else if (beforeMedian.next() === median) {
      // or odd length
      list.deleteNext(beforeMedian);
    } else if (beforeMedian.next().next() === median) {
      // even length, second median
      list.deleteNext(beforeMedian.next());
    } else {
      throw "Not a median";
    }
  }
}

module.exports = deleteMedian;