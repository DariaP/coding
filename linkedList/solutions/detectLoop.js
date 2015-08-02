function detectLoop(list) {

  var node = findNodeInLoop(list);

  if (!node) {
    return null;
  }

  var length = findLoopLength(list, node);
  return findLoopStart(list, length);
}

function findNodeInLoop(list) {
  var iterator1 = list.nodeIterator(),
      iterator2 = list.nodeIterator({step : 2});

  while (iterator2.hasNext() && 
         iterator1.next() !== iterator2.next()) {
    ; // just skip
  }

  if (iterator2.hasNext()) {
    return iterator2.next();
  } else {
    return null;
  }
}

function findLoopLength(list, nodeInLoop) {
  var length = 1,
      iterator = list.nodeIterator({startNode :nodeInLoop.next()});

  while (iterator.next() !== nodeInLoop) {
    length++;
  }

  return length;
}

function findLoopStart(list, loopLength) {
  var iterator1 = list.nodeIterator(),
      iterator2 = list.nodeIterator();

  skip(iterator1, loopLength);
  return firstSameNode(iterator1, iterator2);
}

function skip(iterator, steps) {
  for (var i = 0 ; i < steps ; ++i) {
    iterator.next();
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

module.exports = detectLoop;