var isRotation = require('../solutions/isRotation.js'),
    test = require('tap').test;

test('wirks with rotated string', function(t) {
  var result = isRotation('abcde', 'cdeab');
  t.equals(result, true);
  t.end();
})

test('wirks with the same string', function(t) {
  var result = isRotation('abcde', 'abcde');
  t.equals(result, true);
  t.end();
})

test('wirks with some other string', function(t) {
  var result = isRotation('abcde', 'abcdef');
  t.equals(result, false);
  t.end();
})

test('wirks with empty strings', function(t) {
  var result = isRotation('', '');
  t.equals(result, true);
  t.end();
})

test('wirks with one empty string', function(t) {
  var result = isRotation('', 's');
  t.equals(result, false);
  t.end();
})

test('it throws exception if the first one is not a string', function(t) {
  function call() {
    isRotation(1, 'abc');
  }
  t.throws(call, 'Invalid input (strings expected)');
  t.end();
})

test('it throws exception if the second one is not a string', function(t) {
  function call() {
    isRotation('abc', [1, 2, 3]);
  }
  t.throws(call, 'Invalid input (strings expected)');
  t.end();
})