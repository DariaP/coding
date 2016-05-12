var search = require('./searchRotated.js');
var test = require('tap').test;

test('works with min value in the middle of the array', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], 1);
  t.equals(result, 4);
  t.end();
});

test('works with max value in the middle of the array', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], 9);
  t.equals(result, 3);
  t.end();
});

test('works with value at the beginning of the array', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], 6);
  t.equals(result, 0);
  t.end();
});

test('works with value at the end of the array', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], 5);
  t.equals(result, 8);
  t.end();
});

test('works with random value in the middle of the array', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], 8);
  t.equals(result, 2);
  t.end();
});

test('works with non-existing value grater that array max', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], 10);
  t.equals(result, -1);
  t.end();
});

test('works with non-existing value smaller that array min', function(t) {
  var result = search([6,7,8,9,1,2,3,4,5], -1);
  t.equals(result, -1);
  t.end();
});

test('works with non-existing value in the middle of the array range', function(t) {
  var result = search([6,7,8,9,1,2,4,5], 3);
  t.equals(result, -1);
  t.end();
});

test('works with sorted array', function(t) {
  t.equals(search([1,2,3,4,5,6,8], 1), 0);
  t.equals(search([1,2,3,4,5,6,8], 8), 6);
  t.equals(search([1,2,3,4,5,6,8], 3), 2);
  t.equals(search([1,2,3,4,5,6,8], 9), -1);
  t.equals(search([1,2,3,4,5,6,8], -1), -1);
  t.equals(search([1,2,3,4,5,6,8], 7), -1);
  t.end();
});

test('works with one element array', function(t) {
  t.equals(search([6], 6), 0);
  t.equals(search([6], 5), -1);
  t.equals(search([6], 7), -1);
  t.end();
});

test('works with empty array', function(t) {
  t.equals(search([], 6), -1);
  t.end();
});
