var permutations = require('./permutations.js');
var test = require('tap').test;

function arraysEqual(t, a1, a2) {
	t.deepEquals(a1.sort(), a2.sort());
}

test('works with string that has all unique characters', function(t) {
  var result = permutations('abc');
  arraysEqual(t, result, ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
  t.end();
});

test('works with string that has two characters that are the same', function(t) {
  var result = permutations('aa');
  arraysEqual(t, result, ['aa']);
  t.end();
});

test('works with string that has repeating characters', function(t) {
  var result = permutations('aab');
  arraysEqual(t, result, ['aab', 'aba', 'baa']);
  t.end();
});

test('works with string that has repeating characters', function(t) {
  var result = permutations('aabc');
  arraysEqual(t, result, ['aabc', 'abac', 'baac', 
  	'aacb', 'abca', 'baca', 
  	'acab', 'acba', 'bcaa', 
  	'caab', 'caba', 'cbaa']);
  t.end();
});

test('works with string that has more than one repeating character', function(t) {
  var result = permutations('aabb');
  arraysEqual(t, result, ['aabb', 'abab', 'baab', 'abba', 'baba', 'bbaa']);
  t.end();
});

test('works with string that has repeating character that repeats more than once', function(t) {
  var result = permutations('aaab');
  arraysEqual(t, result, ['aaab', 'aaba', 'abaa', 'baaa']);
  t.end();
});

test('works with empty string', function(t) {
  var result = permutations('');
  arraysEqual(t, result, ['']);
  t.end();
});

test('works with one character', function(t) {
  var result = permutations('a');
  arraysEqual(t, result, ['a']);
  t.end();
});
