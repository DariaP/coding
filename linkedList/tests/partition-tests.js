var singlyLinkedList = require('../../utils/linkedList').singlyLinkedList,
    test = require('tap').test,
    partition = require('../solutions/partition.js');

test('it partitions some list', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 4);
  t.equals(list.toString(), '1,3,9,7,6');
  t.end();
})

test('it partitions list if all the values are greater then middle value', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 12);
  t.equals(list.toString(), '1,9,3,7,6');
  t.end();
})

test('it partitions list if all the values are smaller then middle value', function(t) {
  var list = singlyLinkedList([2, 9, 3, 7, 6]);
  partition(list, 1);
  t.equals(list.toString(), '2,9,3,7,6');
  t.end();
})

test('it partitions list if all the values but one are greater then middle value', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 8);
  t.equals(list.toString(), '1,3,7,6,9');
  t.end();
})

test('it partitions list if all the values are smaller then middle value', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 2);
  t.equals(list.toString(), '1,9,3,7,6');
  t.end();
})

test('it partitions list if contains middle value', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 3);
  t.equals(list.toString(), '1,3,9,7,6');
  t.end();
})

test('it partitions list if contains several middle values', function(t) {
  var list = singlyLinkedList([1, 3, 9, 3, 7, 3, 3, 6]);
  partition(list, 3);
  t.equals(list.toString(), '1,3,3,3,3,9,7,6');
  t.end();
})

test('it partitions list if contains middle value at the beggining', function(t) {
  var list = singlyLinkedList([3, 9, 1, 7, 6]);
  partition(list, 3);
  t.equals(list.toString(), '1,3,9,7,6');
  t.end();
})

test('it partitions list if contains middle value at the end', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 6);
  t.equals(list.toString(), '1,3,6,9,7');
  t.end();
})

test('it partitions list if contains middle value at the beggining of result', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 1);
  t.equals(list.toString(), '1,9,3,7,6');
  t.end();
})

test('it partitions list if contains middle value at the end of result', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 9);
  t.equals(list.toString(), '1,3,7,6,9');
  t.end();
})
