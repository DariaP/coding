
function kToLast(list, k) {
  var iterator1 = list.iterator(),
      iterator2 = list.iterator();

  if (typeof(k) !== 'number') {
    throw "Invalid input (number expected)"
  }

  for (var i = 0 ; i < k ; ++i) {
    if(iterator1.hasNext()) {
      iterator1.next();
    } else {
      return null;
    }
  }

  while(iterator1.hasNext()) {
    iterator1.next();
    iterator2.next();
  }

  return iterator2.next();
}

module.exports = kToLast;