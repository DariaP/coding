var test = require('tap').test,
  pairwiseSwap = require('../solutions/pairwiseSwap.js');

function dec(str) {
  return parseInt(str, 2);
}

test('it works with arbitrary number', function(t) {
  var result = pairwiseSwap(dec('1001011001'));
  t.equals(result.toString(2),   '110100110');
  t.end();
})

test('it works with number with all ones and even number of ones', function(t) {
  var result = pairwiseSwap(dec('111111'));
  t.equals(result.toString(2),  '111111');
  t.end();
})

test('it works with number with all ones and odd number of ones', function(t) {
  var result = pairwiseSwap(dec( '11111'));
  t.equals(result.toString(2),  '101111');
  t.end();
})

test('it works with zero', function(t) {
  var result = pairwiseSwap(0);
  t.equals(result, 0);
  t.end();
})

test('it works with one', function(t) {
  var result = pairwiseSwap(1);
  t.equals(result.toString(2),  '10');
  t.end();
})
