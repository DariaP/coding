var sum = require('../solutions/sum.js'),
    test = require('tap').test,
    list = require('../../utils/linkedList').singlyLinkedList;

test('it sums two lists with the same length', function(t) {
  var list1 = list([1, 2, 3]),
      list2 = list([4, 5, 6]);

  var result = sum(list1, list2);
  t.equals(result.toString(), "5,7,9");
  t.end();
});

test('it sums two lists with different length', function(t) {
  var list1 = list([1, 2, 3, 4]),
      list2 = list([4, 5, 6]);

  var result = sum(list1, list2);
  t.equals(result.toString(), "5,7,9,4");
  t.end();
});

test('it sums two lists with the same length with carry', function(t) {
  var list1 = list([1, 2, 4]),
      list2 = list([4, 5, 6]);

  var result = sum(list1, list2);
  t.equals(result.toString(), "5,7,0,1");
  t.end();
});

test('it sums two lists with the same length with carry', function(t) {
  var list1 = list([9, 9, 9]),
      list2 = list([4, 5, 6]);

  var result = sum(list1, list2);
  t.equals(result.toString(), "3,5,6,1");
  t.end();
});

test('it sums two lists with different length with carry', function(t) {
  var list1 = list([9, 9, 3, 2]),
      list2 = list([1, 5, 6]);

  var result = sum(list1, list2);
  t.equals(result.toString(), "0,5,0,3");
  t.end();
});

test('it sums two lists with different length with carry', function(t) {
  var list1 = list([9, 9, 3, 9, 9, 9, 9]),
      list2 = list([1, 5, 6]);

  var result = sum(list1, list2);
  t.equals(result.toString(), "0,5,0,0,0,0,0,1");
  t.end();
});

test('it throws an exception if list1 has an element that is not a digits', function(t) {
  function call() {
    var list1 = list([9, 9, 3, 9, 9, 'a', 9]),
        list2 = list([1, 5, 6]);

    var result = sum(list1, list2);    
  }
  t.throws(call);
  t.end();
});

test('it throws an exception if list2 has an element that is not a digits', function(t) {
  function call() {
    var list1 = list([9, 9, 3, 9, 9, 9, 9]),
        list2 = list([1, [1, 2], 6]);

    var result = sum(list1, list2);    
  }
  t.throws(call);
  t.end();
});