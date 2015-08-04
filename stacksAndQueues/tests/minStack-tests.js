var minStack = require('../solutions/minStack.js'),
    test = require('tap').test;

test('it works', function(t) {
  var stack = minStack();
  stack.push(1);
  t.equals(stack.min(), 1);
  stack.push(2);
  t.equals(stack.min(), 1);
  stack.push(3);
  t.equals(stack.min(), 1);
  stack.push(-1);
  t.equals(stack.min(), -1);
  stack.push(-2);
  t.equals(stack.min(), -2);
  stack.pop();
  t.equals(stack.min(), -1);
  stack.pop();
  t.equals(stack.min(), 1);
  stack.pop();
  t.equals(stack.min(), 1);
  stack.pop();
  t.equals(stack.min(), 1);
  t.end();
});

test('it throws an exception if stack is empty', function(t) {
  function callPop() {
    var stack = minStack();
    stack.pop();
  }
  t.throws(callPop);
  function callMin() {
    var stack = minStack();
    stack.min();
  }
  t.throws(callMin);
})