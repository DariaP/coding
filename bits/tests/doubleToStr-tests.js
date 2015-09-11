var test = require('tap').test,
    doubleToStr = require('../solutions/doubleToStr.js');

test('it converts some number', function(t) {
  var result = doubleToStr(0.5);
  t.equals(result, '0.101');
  t.end();
})

test('it converts smaller number', function(t) {
  var result = doubleToStr(0.0000000000001);
  t.equals(result, '0.0000000000001');
  t.end();
})

test('it converts bigger number', function(t) {
  var result = doubleToStr(0.567322109);
  t.equals(result, '0.100001110100001010010111111101');
  t.end();
})

test('it converts zero', function(t) {
  var result = doubleToStr(0);
  t.equals(result, '0');
  t.end();
})

test('it returns null if > 1', function(t) {
  var result = doubleToStr(1.1);
  t.equals(result, null);
  t.end();
})

test('it returns null if < 0', function(t) {
  var result = doubleToStr(-0.1);
  t.equals(result, null);
  t.end();
})
