var linkedLists = require('../linkedList'),
    test = require('tap').test;

test('singly linked list', function(t) {
  var list = linkedLists.singlyLinkedList([1, 2, 3, 4, 5]);

  t.equals('1,2,3,4,5', list.toString());
  list.add(6);
  t.equals('1,2,3,4,5,6', list.toString());

  var i = 1;
  list.forEach(function(value) {
    t.equals(i, value);
    i++;
  });
  t.equals(i, 7);

  var iterator = list.iterator(),
      nextValue;

  i = 1;
  while (iterator.hasNext()) {
    nextValue = iterator.next();
    t.equals(nextValue, i);
    i++;
  }
  t.equals(i, 7);

  var nodeIterator = list.nodeIterator(),
      nextNode;

  i = 1;
  while (nodeIterator.hasNext()) {
    nextNode = nodeIterator.next();
    t.equals(nextNode.value(), i);
    i++;
  }
  t.equals(i, 7);

  var list2 = linkedLists.singlyLinkedList();
  list2.add(1);
  list2.add(2);
  list2.add(3);
  t.equals('1,2,3', list2.toString());

  var list3 = linkedLists.singlyLinkedList([]);
  list3.addNode(linkedLists.singlyLinkedList.node(1));
  list3.addNode(linkedLists.singlyLinkedList.node(2));
  list3.addNode(linkedLists.singlyLinkedList.node(3));
  t.equals('1,2,3', list3.toString());

  var list4 = linkedLists.singlyLinkedList([1, 2, 3]),
      list5 = linkedLists.singlyLinkedList([4, 5, 6]);
  list4.append(list5);
  t.equals('1,2,3,4,5,6', list4.toString());

  t.end();
});