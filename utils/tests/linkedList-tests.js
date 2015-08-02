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

test('node iterator with step', function(t) {
  var list = linkedLists.singlyLinkedList([1, 2, 3, 4, 5, 6]);

  var nodeIterator = list.nodeIterator({
        step: 2
      }),
      nextNode,
      i = 2;

  while (nodeIterator.hasNext()) {
    nextNode = nodeIterator.next();
    t.equals(nextNode.value(), i);
    i += 2;
  }
  t.equals(i, 8);

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

test('size', function(t) {

  var list = linkedLists.singlyLinkedList();
  t.equals(list.size(), 0);

  list.deleteHead();
  t.equals(list.size(), 0);

  list = linkedLists.singlyLinkedList([]);  
  t.equals(list.size(), 0);

  list = linkedLists.singlyLinkedList([4]);
  t.equals(list.size(), 1);

  list.add(2);
  t.equals(list.size(), 2);

  list = linkedLists.singlyLinkedList([4, 5, 6]);
  t.equals(list.size(), 3);

  var node = linkedLists.singlyLinkedList.node(1);
  list.addNode(node);
  t.equals(list.size(), 4);

  list.deleteHead();
  t.equals(list.size(), 3);

  list.addNode(linkedLists.singlyLinkedList.node(1));
  t.equals(list.size(), 4);

  list.deleteNext(node);
  t.equals(list.size(), 3);

  list.append(linkedLists.singlyLinkedList([7, 8, 9]));
  t.equals(list.size(), 6);

  list.deleteNext(list.getTail());
  t.equals(list.size(), 6);

  var someNode = linkedLists.singlyLinkedList.node(1);
  someNode.setNext(linkedLists.singlyLinkedList.node(2));
  list.deleteNext(someNode);
  t.equals(list.size(), 6);

  list.addHeadNode(linkedLists.singlyLinkedList.node(1));
  t.equals(list.size(), 7);

  t.end();
})

test('add head', function(t) {
  var list = linkedLists.singlyLinkedList();

  list.addHeadNode(linkedLists.singlyLinkedList.node(1))
  t.equals(list.toString(), '1');

  list.addHeadNode(linkedLists.singlyLinkedList.node(2))
  t.equals(list.toString(), '2,1');

  list.addHeadNode(linkedLists.singlyLinkedList.node(3))
  t.equals(list.toString(), '3,2,1');
})

test('equals', function(t) {

  t.equals(linkedLists.singlyLinkedList().equals(
           linkedLists.singlyLinkedList()), true);

  t.equals(linkedLists.singlyLinkedList().equals(
           linkedLists.singlyLinkedList([])), true);

  t.equals(linkedLists.singlyLinkedList([1]).equals(
           linkedLists.singlyLinkedList([1])), true);

  t.equals(linkedLists.singlyLinkedList([1]).equals(
           linkedLists.singlyLinkedList([2])), false);

  t.equals(linkedLists.singlyLinkedList([1,2]).equals(
           linkedLists.singlyLinkedList([2,1])), false);

  t.equals(linkedLists.singlyLinkedList([1,2,3]).equals(
           linkedLists.singlyLinkedList([1,2,3])), true);

  t.equals(linkedLists.singlyLinkedList([1,2,3]).equals(
           linkedLists.singlyLinkedList([1,2,3,4])), false);

})