var detectLoop = require('../solutions/detectLoop.js'),
    singlyLinkedList = require('../../utils/linkedList').singlyLinkedList,
    test = require('tap').test;


test('it works with valid list', function(t) {
  var list = singlyLinkedList([1, 2, 3]);

  t.equals(detectLoop(list), null);
  t.end();
})

test('it works with empty list', function(t) {
  var list = singlyLinkedList();

  t.equals(detectLoop(list), null);
  t.end();
})

test('it detects a loop', function(t) {
  var list = singlyLinkedList([1, 2, 3]),
      loopStart = singlyLinkedList.node(4),
      loopEnd = singlyLinkedList.node(7);

  loopEnd.setNext(loopStart);

  list.addNode(loopStart);
  list.add(5);
  list.add(6);
  list.addNode(loopEnd);

  t.equals(detectLoop(list), loopStart);
  t.end();
})

test('it detects a loop of one element', function(t) {
  var list = singlyLinkedList([1, 2, 3]),
      loopStart = singlyLinkedList.node(4),
      loopEnd = singlyLinkedList.node(7);

  loopEnd.setNext(loopStart);

  list.addNode(loopStart);
  list.addNode(loopEnd);

  t.equals(detectLoop(list), loopStart);
  t.end();
})

test('it detects a loop of one elemnt in list of one element', function(t) {
  var list = singlyLinkedList(),
      loopStart = singlyLinkedList.node(4),
      loopEnd = singlyLinkedList.node(7);

  loopEnd.setNext(loopStart);

  list.addNode(loopStart);
  list.addNode(loopEnd);

  t.equals(detectLoop(list), loopStart);
  t.end();
})

test('it detects a loop if all list is a loop', function(t) {
  var list = singlyLinkedList(),
      loopStart = singlyLinkedList.node(4),
      loopEnd = singlyLinkedList.node(7);

  loopEnd.setNext(loopStart);

  list.addNode(loopStart);
  list.add(5);
  list.add(6);
  list.add(6);
  list.add(7);
  list.addNode(loopEnd);

  t.equals(detectLoop(list), loopStart);
  t.end();
})

