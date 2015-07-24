var isPermutation = require("../solutions/isPermutation.js"),
    test = require('tap').test;

test('works with permutations', function(t) {
  var result = isPermutation("abcd", "bcda");
  t.equals(result, true);
  t.end();
});

test('works with different strings', function(t) {
  var result = isPermutation("abcd", "bcdar");
  t.equals(result, false);
  t.end();
});

test('works with empty strings', function(t) {
  var result = isPermutation("", "");
  t.equals(result, true);
  t.end();
});

test('works with same strings', function(t) {
  var result = isPermutation("abc", "abc");
  t.equals(result, true);
  t.end();
});

test('works with different strings with same length', function(t) {
  var result = isPermutation("abc", "cde");
  t.equals(result, false);
  t.end();
});