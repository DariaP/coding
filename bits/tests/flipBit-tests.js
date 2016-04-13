var test = require('tap').test,
  findLength = require('../solutions/flipBit.js');

function dec(str) {
  return parseInt(str, 2);
}

test('it counts if sequence is in the middle', function(t) {
  var result = findLength(dec('1001011010'));
  t.equals(result, 4);
  t.end();
})

test('it counts if sequence is at the beginning', function(t) {
  var result = findLength(dec('10111110010'));
  t.equals(result, 7);
  t.end();
})

test('it counts if sequence is at the end', function(t) {
  var result = findLength(dec('10110011110'));
  t.equals(result, 5);
  t.end();
})

test('it counts if number has several zeroes in a row', function(t) {
  var result = findLength(dec('100100011010'));
  t.equals(result, 4);
  t.end();
})

test('it counts if number has several zeroes in a row and only one one in a row', function(t) {
  var result = findLength(dec('100100100100'));
  t.equals(result, 2);
  t.end();
})

test('it counts if number has only one one', function(t) {
  var result = findLength(dec('100000000'));
  t.equals(result, 2);
  t.end();
})

test('it counts if number is all ones', function(t) {
  var result = findLength(dec('1111111'));
  t.equals(result, 7);
  t.end();
})

test('it counts if number is one', function(t) {
  var result = findLength(dec('1'));
  t.equals(result, 1);
  t.end();
})

test('it counts if number is zero', function(t) {
  var result = findLength(dec('0'));
  t.equals(result, 1);
  t.end();
})
