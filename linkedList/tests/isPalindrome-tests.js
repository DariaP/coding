var isPalindrome = require('../solutions/isPalindrome.js'),
	singlyLinkedList = require('../../utils/linkedList').singlyLinkedList,
    test = require('tap').test;

test('it works with palindrome', function(t) {
  var list = singlyLinkedList([1,2,3,2,1]);
  t.equals(isPalindrome(list), true);
  t.equals(list.toString(), '1,2,3,2,1');
  t.end();
})

test('it works with list that is not a palindrome', function(t) {
  var list = singlyLinkedList([1,2,3,2]);
  t.equals(isPalindrome(list), false);
  t.equals(list.toString(), '1,2,3,2');
  t.end();
})

test('it works with one element list', function(t) {
  var list = singlyLinkedList([1]);
  t.equals(isPalindrome(list), true);
  t.equals(list.toString(), '1');
  t.end();
})

test('it works with two elements list', function(t) {
  var list = singlyLinkedList([1,2]);
  t.equals(isPalindrome(list), false);
  t.equals(list.toString(), '1,2');
  t.end();
})

test('it works with two elements palindrom', function(t) {
  var list = singlyLinkedList([1,1]);
  t.equals(isPalindrome(list), true);
  t.equals(list.toString(), '1,1');
  t.end();
})

test('it works with empty list', function(t) {
  var list = singlyLinkedList([]);
  t.equals(isPalindrome(list), true);
  t.equals(list.toString(), '');
  t.end();
})

test('it works with even length palindrom', function(t) {
  var list = singlyLinkedList([1,1,2,2,1,1]);
  t.equals(isPalindrome(list), true);
  t.equals(list.toString(), '1,1,2,2,1,1');
  t.end();
})

test('it works with odd length list (not a palindrom)', function(t) {
  var list = singlyLinkedList([1,1,2,2,1]);
  t.equals(isPalindrome(list), false);
  t.equals(list.toString(), '1,1,2,2,1');
  t.end();
})
