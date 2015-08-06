var queueViaStacks = require('../solutions/queueViaStacks.js'),
    test = require('tap').test;

test('it works', function(t) {
  var queue = queueViaStacks();

  queue.enqueue(1);
  t.equals(queue.dequeue(), 1);

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.enqueue(4);
  t.equals(queue.dequeue(), 1);
  t.equals(queue.dequeue(), 2);
  t.equals(queue.dequeue(), 3);
  t.equals(queue.dequeue(), 4);

  t.assert(queue.dequeue() == null);

  t.end();
});