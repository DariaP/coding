var list = require('../../utils/linkedList').singlyLinkedList,
    kToLast = require('../solutions/kToLast.js'),
    test = require('tap').test;

test('it works with simple linked list', function(t) {
  var input = list([1, 2, 3, 4, 5]);
  var result = kToLast(input, 2);
  t.equals(result, 4);
  t.end();
});

test('it works when the first element requested', function(t) {
  var input = list([1, 2, 3, 4, 5]);
  var result = kToLast(input, 5);
  t.equals(result, 1);
  t.end();
});

test('it works when the last element requested', function(t) {
  var input = list([1, 2, 3, 4, 5]);
  var result = kToLast(input, 1);
  t.equals(result, 5);
  t.end();
});

test('it returns null when k is outside the range', function(t) {
  var input = list([1, 2, 3, 4, 5]);
  var result = kToLast(input, 6);
  t.equals(result, null);
  t.end();
});

test('it returns null when k is outside the range', function(t) {
  var input = list([1, 2, 3, 4, 5]);
  var result = kToLast(input, 0);
  t.equals(result, null);
  t.end();
});

test('it returns null when k is outside the range', function(t) {
  var input = list([1, 2, 3, 4, 5]);
  var result = kToLast(input, -1);
  t.equals(result, null);
  t.end();
});

test('it throws an exception when k is not a number', function(t) {
  function call() {
    var input = list([1, 2, 3, 4, 5]);
    var result = kToLast(input, 'abc');    
  }
  t.throws(call, "Invalid input (number expected)");
  t.end();
});