var parens = require('./parens.js');
var test = require('tap').test;

function arraysEqual(t, a1, a2) {
	t.deepEquals(a1.sort(), a2.sort());
}

test('works with n = 3', function(t) {
  var result = parens(3);
  arraysEqual(t, result, ['((()))', '(()())', '(())()', '()(())', '()()()']);
  t.end();
});

test('works with n = 0', function(t) {
  var result = parens(0);
  arraysEqual(t, result, ['']);
  t.end();
});

test('works with n = 1', function(t) {
  var result = parens(1);
  arraysEqual(t, result, ['()']);
  t.end();
});

test('works with n = 2', function(t) {
  var result = parens(2);
  arraysEqual(t, result, ['(())', '()()']);
  t.end();
});
