var find = require('./findDuplicates.js');
var test = require('tap').test;

function arraysEqual(t, a1, a2) {
	t.deepEquals(a1.sort(), a2.sort());
}

test('works with one duplicate', function(t) {
  var result = find([1,2,3,1,4]);
  arraysEqual(t, result, [1]);
  t.end();
});

test('works with no duplicates', function(t) {
  var result = find([1,2,3,4]);
  arraysEqual(t, result, []);
  t.end();
});

test('works with multiple duplicates', function(t) {
  var result = find([1,2,1,2,3,3,3,4,1,5]);
  arraysEqual(t, result, [1,2,3,3,1]);
  t.end();
});

test('works with one element array', function(t) {
  var result = find([1]);
  arraysEqual(t, result, []);
  t.end();
});

test('works with two elements array with duplicates', function(t) {
  var result = find([5,5]);
  arraysEqual(t, result, [5]);
  t.end();
});

test('works with array that has elements > 8', function(t) {
  var result = find([10, 11, 26, 11, 198, 25000]);
  arraysEqual(t, result, [11]);
  t.end();
});