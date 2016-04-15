var test = require('tap').test,
  nextNumber = require('../solutions/nextNumber.js');

function dec(str) {
  return parseInt(str, 2);
}

test('it finds next numbers for ...01', function(t) {
  var num = dec('1001011001'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '1001011010');
  t.equals(nextSmallest.toString(2), '1001010011');
  t.end();
})

test('it finds next numbers for ...011', function(t) {
  var num = dec('10010110011'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '10010110101');
  t.equals(nextSmallest.toString(2), '10010100111');
  t.end();
})

test('it finds next numbers for ...0111', function(t) {
  var num = dec('1100111'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '1101011');
  t.equals(nextSmallest.toString(2), '1001111');
  t.end();
})

test('it finds next numbers for 1', function(t) {
  var num = 1,
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '10');
  t.equals(nextSmallest.toString(2), null);
  t.end();
})

test('it finds next numbers for ...010', function(t) {
  var num = dec('110010'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '110100');
  t.equals(nextSmallest.toString(2), '110001');
  t.end();
})

test('it finds next numbers for ...0100', function(t) {
  var num = dec('1100100'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '1101000');
  t.equals(nextSmallest.toString(2), '1100001');
  t.end();
})

test('it finds next numbers for ...0110', function(t) {
  var num = dec('1100110'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '1101001');
  t.equals(nextSmallest.toString(2), '1100101');
  t.end();
})

test('it finds next numbers for ...011100', function(t) {
  var num = dec('110011100'),
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest.toString(2), '110100011');
  t.equals(nextSmallest.toString(2), '110011001');
  t.end();
})

test('it finds next numbers for 0', function(t) {
  var num = 0,
      nextLargest = nextNumber.nextLargest(num),
  	  nextSmallest = nextNumber.nextSmallest(num);
  t.equals(nextLargest, null);
  t.equals(nextSmallest, null);
  t.end();
})
