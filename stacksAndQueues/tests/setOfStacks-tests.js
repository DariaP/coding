var setOfStacks = require('../solutions/setOfStacks.js'),
    test = require('tap').test;

test('it works', function(t) {
  var stack = setOfStacks(4);
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  stack.push(5);
  stack.push(6);
  stack.push(7);
  stack.push(8);
  stack.push(9);
  stack.push(10);
  stack.push(11);
  stack.push(12);

  t.equals(stack.pop(), 12);
  t.equals(stack.popAt(1), 8);
  t.equals(stack.popAt(0), 4);
  t.equals(stack.popAt(1), 7);
  t.equals(stack.pop(), 11);
  t.equals(stack.pop(), 10);
  t.equals(stack.pop(), 9);
  t.equals(stack.pop(), 6);
  t.equals(stack.popAt(1), 5);
  t.equals(stack.popAt(0), 3);
  t.equals(stack.pop(), 2);
  t.equals(stack.pop(), 1);

  t.end();
});