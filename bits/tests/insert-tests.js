var test = require('tap').test,
  insert = require('../solutions/insert.js');

function dec(str) {
  return parseInt(str, 2);
}

test('it inserts in the middle', function(t) {
  var result = insert(dec('1001011010'), dec('01110'), 7, 3);
  t.equals(result, dec('1001110010'));
  t.end();
})

test('it inserts at the beginning', function(t) {
  var result = insert(dec('1001011010'), dec('01110'), 9, 5);
  t.equals(result, dec('0111011010'));
  t.end();
})

test('it inserts at the ent', function(t) {
  var result = insert(dec('1001011010'), dec('01110'), 4, 0);
  t.equals(result, dec('1001001110'));
  t.end();
})

test('it inserts if all bits are the same', function(t) {
  var result = insert(dec('1001011010'), dec('10010'), 9, 5);
  t.equals(result, dec('1001011010'));
  t.end();
})

test('it inserts if all bits are different', function(t) {
  var result = insert(dec('1001011010'), dec('01101'), 9, 5);
  t.equals(result, dec('0110111010'));
  t.end();
})

test('it inserts if all bits are zeros', function(t) {
  var result = insert(dec('1001011010'), dec('00000'), 9, 5);
  t.equals(result, dec('0000011010'));
  t.end();
})

test('it inserts if all bits are ones', function(t) {
  var result = insert(dec('1001011010'), dec('11111'), 9, 5);
  t.equals(result, dec('1111111010'));
  t.end();
})

test('it inserts if numbers are the same lenght', function(t) {
  var result = insert(dec('10010'), dec('01111'), 4, 0);
  t.equals(result, dec('01111'));
  t.end();
})

test('it inserts if both are zeros', function(t) {
  var result = insert(dec('0'), dec('0'), 0, 0);
  t.equals(result, dec('0'));
  t.end();
})

test('it inserts if second is zero', function(t) {
  var result = insert(dec('10001'), dec('0'), 0, 0);
  t.equals(result, dec('10000'));
  t.end();
})
