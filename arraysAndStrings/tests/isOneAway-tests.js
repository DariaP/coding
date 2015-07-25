var isOneAway = require('../solutions/isOneAway.js'),
    test = require('tap').test;

test ('works with empty strings', function (t) {
  var result = isOneAway('', '');
  t.equals(result, true);
  t.end();
});

test ('works with the same strings', function (t) {
  var result = isOneAway('abc', 'abc');
  t.equals(result, true);
  t.end();
});

test ('works with insertion', function (t) {
  var result = isOneAway('abc', 'ab3c');
  t.equals(result, true);
  t.end();
});

test ('works with insertion at the end', function (t) {
  var result = isOneAway('abc', 'abc4');
  t.equals(result, true);
  t.end();
});

test ('works with removal', function (t) {
  var result = isOneAway('abdc', 'abc');
  t.equals(result, true);
  t.end();
});

test ('works with removal at the end', function (t) {
  var result = isOneAway('abcf', 'abc');
  t.equals(result, true);
  t.end();
});

test ('works with replacement', function (t) {
  var result = isOneAway('abcd', 'abfd');
  t.equals(result, true);
  t.end();
});

test ('works with replacement at the end', function (t) {
  var result = isOneAway('abcf', 'abcd');
  t.equals(result, true);
  t.end();
});

test ('works with different strings', function (t) {
  var result = isOneAway('abcfa', 'abcd');
  t.equals(result, false);
  t.end();
});

test ('works with different strings', function (t) {
  var result = isOneAway('abcfa6666ddd', 'abcd');
  t.equals(result, false);
  t.end();
});

test ('works with different strings', function (t) {
  var result = isOneAway('sffa6666ddd', 'abcd');
  t.equals(result, false);
  t.end();
});

test ('works with different strings', function (t) {
  var result = isOneAway('bcdf', 'abcd');
  t.equals(result, false);
  t.end();
});

test ('throws exception if the second argument is not a string', function (t) {
  var call = function() {
    isOneAway('bcdf', 22); 
  }
  t.throws(call, "Invalid input (strings expected)");
  t.end();
});

test ('throws exception if the first argument is not a string', function (t) {
  var call = function() {
    isOneAway([1, 2, 3], 'abd'); 
  }
  t.throws(call, "Invalid input (strings expected)");
  t.end();
});