var intersectionStart = require('../solutions/intersect.js'),
    singlyLinkedList = require('../../utils/linkedList').singlyLinkedList,
    test = require('tap').test;

test('it works with two different lists', function(t) {
  var list1 = singlyLinkedList([1,2,3]),
      list2 = singlyLinkedList([4,5,6]);

  t.equals(intersectionStart(list1, list2), null);
  t.end();
})

test('it works with two different lists with same values', function(t) {
  var list1 = singlyLinkedList([1,2,3]),
      list2 = singlyLinkedList([1,2,3]);

  t.equals(intersectionStart(list1, list2), null);
  t.end();
})

test('it works with two empty lists', function(t) {
  var list1 = singlyLinkedList([]),
      list2 = singlyLinkedList([]);

  t.equals(intersectionStart(list1, list2), null);
  t.end();
})

test('it works if one list is empty', function(t) {
  var list1 = singlyLinkedList([]),
      list2 = singlyLinkedList([1,2,3]);

  t.equals(intersectionStart(list1, list2), null);
  t.end();
})

test('it works with two lists with the same single element', function(t) {
  var list1 = singlyLinkedList([]),
      list2 = singlyLinkedList([]),
      node = singlyLinkedList.node(1);

  list1.addNode(node);
  list2.addNode(node);

  t.equals(intersectionStart(list1, list2), node);
  t.end();
})

test('it works with two lists with the same elements', function(t) {
  var list1 = singlyLinkedList([]),
      list2 = singlyLinkedList([]),
      node1 = singlyLinkedList.node(1),
      node2 = singlyLinkedList.node(2),
      node3 = singlyLinkedList.node(3);

  list1.addNode(node1);
  list1.addNode(node2);
  list1.addNode(node3);
  
  list2.addNode(node1);
  list2.addNode(node2);
  list2.addNode(node3);

  t.equals(intersectionStart(list1, list2), node1);
  t.end();
})

test('it works with two lists with the same tail', function(t) {
  var list1 = singlyLinkedList([]),
      list2 = singlyLinkedList([]),
      node1 = singlyLinkedList.node(1),
      node2 = singlyLinkedList.node(2),
      node3 = singlyLinkedList.node(3),
      node4 = singlyLinkedList.node(4),
      node5 = singlyLinkedList.node(5);

  list1.addNode(node1);
  list1.addNode(node2);
  list1.addNode(node3);
  list1.addNode(node4);
  list1.addNode(node5);

  list2.addNode(node3);
  list2.addNode(node4);
  list2.addNode(node5);

  t.equals(intersectionStart(list1, list2), node3);
  t.end();
})
