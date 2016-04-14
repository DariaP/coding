var test = require('tap').test,
  nextNumber = require('../solutions/nextNumber.js');

function dec(str) {
  return parseInt(str, 2);
}

test('it finds next numbers for ...01', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('1001011001'));
  t.equals(nextLargest.toString(2), '1001011010');
  t.end();
})

test('it finds next numbers for ...011', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('10010110011'));
  t.equals(nextLargest.toString(2), '10010110101');
  t.end();
})

test('it finds next numbers for ...0111', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('1100111'));
  t.equals(nextLargest.toString(2), '1101011');
  t.end();
})

test('it finds next numbers for 1', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('1'));
  t.equals(nextLargest.toString(2), '10');
  t.end();
})

test('it finds next numbers for ...010', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('110010'));
  t.equals(nextLargest.toString(2), '110100');
  t.end();
})

test('it finds next numbers for ...0100', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('1100100'));
  t.equals(nextLargest.toString(2), '1101000');
  t.end();
})

test('it finds next numbers for ...0110', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('1100110'));
  t.equals(nextLargest.toString(2), '1101001');
  t.end();
})

test('it finds next numbers for ...011100', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('110011100'));
  t.equals(nextLargest.toString(2), '110100011');
  t.end();
})

test('it finds next numbers for 0', function(t) {
  var nextLargest = nextNumber.nextLargest(dec('0'));
  t.equals(nextLargest, null);
  t.end();
})
