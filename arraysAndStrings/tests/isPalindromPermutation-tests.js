var isPalindromPermutation = require('../solutions/isPalindromPermutation.js'),
    test = require('tap').test;

test('is works with palindroms', function(t) {
  var result = isPalindromPermutation('acddca');
  t.equals(result, true);
  t.end();
});

test('is works with empty string', function(t) {
  var result = isPalindromPermutation('');
  t.equals(result, true);
  t.end();
});

test('is works with palindrom permutation with even length', function(t) {
  var result = isPalindromPermutation('adffsads');
  t.equals(result, true);
  t.end();
});

test('is works with palindrom permutation with odd length', function(t) {
  var result = isPalindromPermutation('adffsadsn');
  t.equals(result, true);
  t.end();
});

test('is works with random string', function(t) {
  var result = isPalindromPermutation('adffsadnf');
  t.equals(result, false);
  t.end();
});

test('is throws exception for invalid input', function(t) {
  var callWithInvalidInput = function() {
    isPalindromPermutation(22);
  }
  t.throws(callWithInvalidInput, 'Invalid input (string required)');
  t.end();
});