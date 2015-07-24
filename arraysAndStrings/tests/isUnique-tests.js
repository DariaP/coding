var isUnique = require('../solutions/isUnique.js');
var test = require('tap').test;

test('works with unique string', function(t) {
  var result = isUnique('abcde');
  t.equals(result, true);
});

test('works with empty string', function(t) {
  var result = isUnique('');
  t.equals(result, true);
});

test('works with not unique string', function(t) {
  var result = isUnique('abcdea');
  t.equals(result, false);
});