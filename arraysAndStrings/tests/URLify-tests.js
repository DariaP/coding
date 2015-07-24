var mutableString = require('../solutions/URLify.js'),
    test = require('tap').test;

test('it works with string containing spaces', function (t) {
  var s = mutableString("some string");
  s.URLify();
  t.equals(s.toString(), "some%20string", 'converted spaces to %20');
  t.end();
});

test('it works with empty string', function (t) {
  var s = mutableString("");
  s.URLify();
  t.equals(s.toString(), "");
  t.end();
});

test('it works with single char', function (t) {
  var s = mutableString("a");
  s.URLify();
  t.equals(s.toString(), "a");
  t.end();
});

test('it works with string that doesn\'t have spaces', function (t) {
  var s = mutableString("some123string");
  s.URLify();
  t.equals(s.toString(), "some123string");
  t.end();
});

test('it works with string that has more that one space', function (t) {
  var s = mutableString("some string with a few spaces");
  s.URLify();
  t.equals(s.toString(), "some%20string%20with%20a%20few%20spaces");
  t.end();
});

test('it works with string that has joined spaces', function (t) {
  var s = mutableString("some string with   spaces");
  s.URLify();
  t.equals(s.toString(), "some%20string%20with%20%20%20spaces");
  t.end();
});

test('it throws an exception if not a string', function ( t) {
  var callWithInvalidInput = function() {
      var s = mutableString([1, 2, 3]);
  }
  t.throws(callWithInvalidInput, 'Invalid input (string required)');
  t.end();
});
