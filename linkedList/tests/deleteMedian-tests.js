var singlyLinkedList = require('../../utils/linkedList').singlyLinkedList,
    test = require('tap').test,
    deleteMedian = require('../solutions/deleteMedian.js');

test('it deletes median from simple list with odd lemgth', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.add(1);
  list.add(2);
  list.addNode(median);
  list.add(4);
  list.add(5);
  deleteMedian(list, median)
  t.equals(list.toString(), '1,2,4,5');
  t.end();
})

test('it deletes median from single element list', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.addNode(median);
  deleteMedian(list, median)
  t.equals(list.toString(), '');
  t.end();
})

test('it deletes median from three elements list', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.add(1);
  list.addNode(median);
  list.add(5);
  deleteMedian(list, median)
  t.equals(list.toString(), '1,5');
  t.end();
})

test('it deletes second median from two elements list', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.add(1);
  list.addNode(median);
  deleteMedian(list, median)
  t.equals(list.toString(), '1');
  t.end();
})

test('it deletes first median from two elements list', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.addNode(median);
  list.add(1);
  deleteMedian(list, median)
  t.equals(list.toString(), '1');
  t.end();
})

test('it deletes first median from simple list with even lemgth', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.add(1);
  list.addNode(median);
  list.add(4);
  list.add(5);
  deleteMedian(list, median)
  t.equals(list.toString(), '1,4,5');
  t.end();
})

test('it deletes second median from simple list with even lemgth', function(t) {
  var list = singlyLinkedList(),
      median = singlyLinkedList.node(3);
  list.add(1);
  list.add(4);
  list.addNode(median);
  list.add(5);
  deleteMedian(list, median)
  t.equals(list.toString(), '1,4,5');
  t.end();
})

test('it throws an exception if not a median', function(t) {
  function call() {
    var list = singlyLinkedList(),
        median = singlyLinkedList.node(3);
    list.addNode(median);
    list.add(1);
    list.add(5);
    deleteMedian(list, median)    
  }
  t.throws(call, "Not a median");
  t.end();
})

test('it throws an exception if not a median', function(t) {
  function call() {
    var list = singlyLinkedList(),
        median = singlyLinkedList.node(3);
    list.add(1);
    list.add(5);
    list.addNode(median);
    deleteMedian(list, median)    
  }
  t.throws(call, "Not a median");
  t.end();
})

test('it throws an exception if not a median', function(t) {
  function call() {
    var list = singlyLinkedList(),
        median = singlyLinkedList.node(3);
    list.add(1);
    list.add(5);
    list.add(6);
    list.addNode(median);
    list.add(5);
    deleteMedian(list, median)    
  }
  t.throws(call, "Not a median");
  t.end();
})

test('it throws an exception if not a median', function(t) {
  function call() {
    var list = singlyLinkedList(),
        median = singlyLinkedList.node(3);
    deleteMedian(list, median)    
  }
  t.throws(call, "Empty list");
  t.end();
})
