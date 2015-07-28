
function deleteMedian(list, median) {
  var iterator1 = list.nodeIterator(),
      iterator2 = list.nodeIterator(median);

  if (!iterator1.hasNext()) {
    throw "Empty list";
  }

  iterator2.next();

  if (!iterator2.hasNext()) {
    list.deleteHead();
  } else {
    iterator2.next();

    while(iterator2.hasNext()) {
      iterator2.next();
      iterator1.next()
    }

    var beforeMedian = iterator1.next();
    if(beforeMedian.next() !== median) {
      throw "Not a median";
    }

    list.deleteNext(beforeMedian);
  }
}

module.exports = deleteMedian;