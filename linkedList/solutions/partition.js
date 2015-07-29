var singlyLinkedList = require('../../utils/linkedList').singlyLinkedList;

function partition(list, middleValue) {
  var equalNodes = singlyLinkedList(),
      biggerNodes = singlyLinkedList(),
      nextNode = list.nodeIterator().next(),
      prevNode = null,
      removed = null;

  while(nextNode != null) {
    if (nextNode.value() >= middleValue ) {
      removed = removeNode();
      resetPointersPositions();
      if (removed.value() > middleValue ) {
        biggerNodes.addNode(removed);
      } else {
        equalNodes.addNode(removed);
      }
    } else {
      incPointersPositions();
    }
  }
  list.append(equalNodes);
  list.append(biggerNodes);

  function incPointersPositions() {
    prevNode = nextNode;
    nextNode = nextNode.next();  
  }

  function resetPointersPositions() {
    if (prevNode === null) {
      nextNode = list.nodeIterator().next();
    } else {
      nextNode = prevNode.next();
    }
  }

  function removeNode() {
    if (prevNode === null) {
      return list.deleteHead();
    } else {
      return list.deleteNext(prevNode);
    }
  }

}
module.exports = partition;