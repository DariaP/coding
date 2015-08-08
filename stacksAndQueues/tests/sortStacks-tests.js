Array.prototype.isEmpty = function() {return this.length === 0;};
Array.prototype.peek = function() {return this[this.length - 1];};


var sort = require('../solutions/sortStack.js'),
    test = require('tap').test;

test('it works with small stack', function(t) {
  var stack = [2, 3, 1 ,4];
  sort(stack);
  t.deepEquals(stack, [4, 3, 2, 1]);
  t.end();
});

test('it works with empty stack', function(t) {
  var stack = [];
  sort(stack);
  t.deepEquals(stack, []);
  t.end();
});

test('it works with one element stack', function(t) {
  var stack = [1];
  sort(stack);
  t.deepEquals(stack, [1]);
  t.end();
});

test('it works with longer stack with repeating values', function(t) {
  var stack = [7, 8, 5, 1, 3, 5, 1, 6, 6, 7, 11, -3, 0];
  sort(stack);
  t.deepEquals(stack, [11, 8, 7, 7, 6, 6, 5, 5, 3, 1, 1, 0, -3]);
  t.end();
});
