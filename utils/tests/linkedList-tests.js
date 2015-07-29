var linkedLists = require('../linkedList'),
    test = require('tap').test;

test('init from array, toString and add', function(t) {
  var list = linkedLists.singlyLinkedList([1, 2, 3, 4, 5]);

  t.equals('1,2,3,4,5', list.toString());
  list.add(6);
  t.equals('1,2,3,4,5,6', list.toString());

  t.end();
});

test('for each', function(t) {
  var list = linkedLists.singlyLinkedList([1, 2, 3, 4, 5, 6]);

  var i = 1;
  list.forEach(function(value) {
    t.equals(i, value);
    i++;
  });
  t.equals(i, 7);

  t.end();
});

test('iterator', function(t) {
  var list = linkedLists.singlyLinkedList([1, 2, 3, 4, 5, 6]);

  var iterator = list.iterator(),
      nextValue,
      i = 1;

  while (iterator.hasNext()) {
    nextValue = iterator.next();
    t.equals(nextValue, i);
    i++;
  }
  t.equals(i, 7);

  t.end();
});

test('node iterator', function(t) {
  var list = linkedLists.singlyLinkedList([1, 2, 3, 4, 5, 6]);

  var nodeIterator = list.nodeIterator(),
      nextNode,
      i = 1;

  while (nodeIterator.hasNext()) {
    nextNode = nodeIterator.next();
    t.equals(nextNode.value(), i);
    i++;
  }
  t.equals(i, 7);

  t.end();
});

test('init and add', function(t) {

  var list = linkedLists.singlyLinkedList();
  list.add(1);
  list.add(2);
  list.add(3);
  t.equals('1,2,3', list.toString());

  t.end();
});

test('init with empty array and add node', function(t) {

  var list = linkedLists.singlyLinkedList([]);
  list.addNode(linkedLists.singlyLinkedList.node(1));
  list.addNode(linkedLists.singlyLinkedList.node(2));
  list.addNode(linkedLists.singlyLinkedList.node(3));
  t.equals('1,2,3', list.toString());

  t.end();
});

test('delete node', function(t) {

  var list = linkedLists.singlyLinkedList(),
      node1 = linkedLists.singlyLinkedList.node(1),
      node2 = linkedLists.singlyLinkedList.node(2),
      node3 = linkedLists.singlyLinkedList.node(3),
      node4 = linkedLists.singlyLinkedList.node(4),
      node5 = linkedLists.singlyLinkedList.node(5);

  list.deleteHead();
  list.deleteNext(node1);

  list.addNode(node1);
  list.addNode(node2);
  list.addNode(node3);
  list.addNode(node4);
  list.addNode(node5);

  t.equals('1,2,3,4,5', list.toString());

  list.deleteHead();

  t.equals('2,3,4,5', list.toString());

  list.deleteNext(node2);

  t.equals('2,4,5', list.toString());

  list.deleteNext(node4);

  t.equals('2,4', list.toString());

  list.deleteNext(node4);

  t.equals('2,4', list.toString());

  t.end();
});

test('append list', function(t) {

  var list = linkedLists.singlyLinkedList([1, 2, 3]),
      list2 = linkedLists.singlyLinkedList([4, 5, 6]),
      list3 = linkedLists.singlyLinkedList([7, 8, 9]),
      list4 = linkedLists.singlyLinkedList();
  list.append(list2);
  t.equals('1,2,3,4,5,6', list.toString());
  list.append(list4);
  t.equals('1,2,3,4,5,6', list.toString());
  list.append(list3);
  t.equals('1,2,3,4,5,6,7,8,9', list.toString());

  list = linkedLists.singlyLinkedList([]);
  list2 = linkedLists.singlyLinkedList([1, 2, 3])

  list.append(list);
  t.equals('', list.toString());
  list.append(list2)
  t.equals('1,2,3', list.toString());

  t.end();
});