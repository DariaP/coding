var threeStacks = require('../solutions/threeStacks.js'),
    test = require('tap').test;

test('it works with the same load', function(t) {
  var stacks = threeStacks(9);
  stacks.push(0, 1);
  stacks.push(0, 2);
  stacks.push(0, 3);
  stacks.push(1, 4);
  stacks.push(1, 5);
  stacks.push(1, 6);
  stacks.push(2, 7);
  stacks.push(2, 8);
  stacks.push(2, 9);

  t.equals(stacks.pop(0),3);
  t.equals(stacks.pop(0),2);
  t.equals(stacks.pop(0),1);
  t.equals(stacks.pop(1),6);
  t.equals(stacks.pop(1),5);
  t.equals(stacks.pop(1),4);
  t.equals(stacks.pop(2),9);
  t.equals(stacks.pop(2),8);
  t.equals(stacks.pop(2),7);

  t.end();
})

test('it works with only first stack used', function(t) {
  var stacks = threeStacks(9);
  stacks.push(0, 1);
  stacks.push(0, 2);
  stacks.push(0, 3);
  stacks.push(0, 4);
  stacks.push(0, 5);
  stacks.push(0, 6);
  stacks.push(0, 7);
  stacks.push(0, 8);
  stacks.push(0, 9);

  t.equals(stacks.pop(0),9);
  t.equals(stacks.pop(0),8);
  t.equals(stacks.pop(0),7);
  t.equals(stacks.pop(0),6);
  t.equals(stacks.pop(0),5);
  t.equals(stacks.pop(0),4);
  t.equals(stacks.pop(0),3);
  t.equals(stacks.pop(0),2);
  t.equals(stacks.pop(0),1);

  t.end();
})

test('it works with only second stack used', function(t) {
  var stacks = threeStacks(9);
  stacks.push(1, 1);
  stacks.push(1, 2);
  stacks.push(1, 3);
  stacks.push(1, 4);
  stacks.push(1, 5);
  stacks.push(1, 6);
  stacks.push(1, 7);
  stacks.push(1, 8);
  stacks.push(1, 9);

  t.equals(stacks.pop(1),9);
  t.equals(stacks.pop(1),8);
  t.equals(stacks.pop(1),7);
  t.equals(stacks.pop(1),6);
  t.equals(stacks.pop(1),5);
  t.equals(stacks.pop(1),4);
  t.equals(stacks.pop(1),3);
  t.equals(stacks.pop(1),2);
  t.equals(stacks.pop(1),1);

  t.end();
})

test('it works with only third stack used', function(t) {
  var stacks = threeStacks(9);
  stacks.push(2, 1);
  stacks.push(2, 2);
  stacks.push(2, 3);
  stacks.push(2, 4);
  stacks.push(2, 5);
  stacks.push(2, 6);
  stacks.push(2, 7);
  stacks.push(2, 8);
  stacks.push(2, 9);

  t.equals(stacks.pop(2),9);
  t.equals(stacks.pop(2),8);
  t.equals(stacks.pop(2),7);
  t.equals(stacks.pop(2),6);
  t.equals(stacks.pop(2),5);
  t.equals(stacks.pop(2),4);
  t.equals(stacks.pop(2),3);
  t.equals(stacks.pop(2),2);
  t.equals(stacks.pop(2),1);

  t.end();
})

test('it works with mixed stacks usage', function(t) {
  var stacks = threeStacks(9);
  stacks.push(2, 1);
  stacks.push(2, 2);
  stacks.push(2, 3);
  stacks.push(2, 4);
  stacks.push(0, 5);
  stacks.push(1, 6);
  stacks.push(0, 7);
  stacks.push(1, 8);
  stacks.push(2, 9);

  t.equals(stacks.pop(2),9);
  t.equals(stacks.pop(2),4);
  t.equals(stacks.pop(2),3);
  t.equals(stacks.pop(2),2);
  t.equals(stacks.pop(2),1);
  t.equals(stacks.pop(0),7);
  t.equals(stacks.pop(0),5);
  t.equals(stacks.pop(1),8);
  t.equals(stacks.pop(1),6);

  t.end();
})

test('it works with mixed stacks usage', function(t) {
  var stacks = threeStacks(9);
  stacks.push(1, 1);
  stacks.push(1, 2);
  stacks.push(1, 3);
  stacks.push(2, 4);
  stacks.push(2, 5);
  stacks.push(2, 6);
  stacks.push(0, 7);
  stacks.push(1, 8);
  stacks.push(1, 9);

  t.equals(stacks.pop(2),6);
  t.equals(stacks.pop(2),5);
  t.equals(stacks.pop(2),4);
  t.equals(stacks.pop(1),9);
  t.equals(stacks.pop(1),8);
  t.equals(stacks.pop(0),7);
  t.equals(stacks.pop(1),3);
  t.equals(stacks.pop(1),2);
  t.equals(stacks.pop(1),1);

  t.end();
})

test('it works with mixed push and pop', function(t) {
  var stacks = threeStacks(9);
  stacks.push(2, 1);
  stacks.push(2, 2);

  t.equals(stacks.pop(2),2);

  stacks.push(2, 2);
  stacks.push(2, 3);
  stacks.push(2, 4);
  stacks.push(0, 5);

  t.equals(stacks.pop(2),4);
  t.equals(stacks.pop(0),5);

  stacks.push(1, 6);
  stacks.push(0, 5);
  stacks.push(0, 7);
  stacks.push(1, 8);
  stacks.push(2, 4);

  t.equals(stacks.pop(1),8);

  stacks.push(2, 9);
  stacks.push(1, 8);

  t.equals(stacks.pop(2),9);
  t.equals(stacks.pop(2),4);
  t.equals(stacks.pop(2),3);
  t.equals(stacks.pop(2),2);
  t.equals(stacks.pop(2),1);
  t.equals(stacks.pop(0),7);
  t.equals(stacks.pop(0),5);
  t.equals(stacks.pop(1),8);
  t.equals(stacks.pop(1),6);

  t.end();
})
