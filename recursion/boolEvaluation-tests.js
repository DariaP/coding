var count = require('./boolEvaluation.js');
var test = require('tap').test;

test('works with string that has all unique characters', function(t) {
  var result = count('1^0|0|1', false);
  t.equals(result, 3);
  t.end();
});