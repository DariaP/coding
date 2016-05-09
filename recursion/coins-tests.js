var count = require('./coins.js');
var test = require('tap').test;

test('works with value = 1', function(t) {
  var result = count(1);
  t.equals(result, 1);
  t.end();
});

test('works with value < 5', function(t) {
  var result = count(3);
  t.equals(result, 1);
  t.end();
});

test('works with 5 <= value < 10', function(t) {
  var result = count(5);
  t.equals(result, 2);
  t.end();
});

test('works with value = 10', function(t) {
  var result = count(10);
  t.equals(result, 4);
  t.end();
});

test('works with value < 25', function(t) {
  var result = count(11);
  t.equals(result, 4);
  t.end();
});

test('works with value = 0', function(t) {
  var result = count(0);
  t.equals(result, 1);
  t.end();
});

test('works with value > 25', function(t) {
  var result = count(41);
  t.equals(result, 31);
  t.end();
});