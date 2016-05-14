var rankTracker = require('./rankFromStream.js');
var test = require('tap').test;

function arraysEqual(t, a1, a2) {
	t.deepEquals(a1.sort(), a2.sort());
}

test('works with sorted array, no duplicates', function(t) {
  var tracker = rankTracker();
  tracker.trackAll([1,3,5,7,9]);
  t.equals(tracker.rank(0), 0);
  t.equals(tracker.rank(1), 0);
  t.equals(tracker.rank(2), 1);
  t.equals(tracker.rank(3), 1);
  t.equals(tracker.rank(4), 2);
  t.equals(tracker.rank(5), 2);
  t.equals(tracker.rank(6), 3);
  t.equals(tracker.rank(7), 3);
  t.equals(tracker.rank(8), 4);
  t.equals(tracker.rank(9), 4);
  t.equals(tracker.rank(10), 5);
  t.end();
});

test('works with unsorted array, no duplicates', function(t) {
  var tracker = rankTracker();
  tracker.trackAll([3,1,9,7,5]);
  t.equals(tracker.rank(0), 0);
  t.equals(tracker.rank(1), 0);
  t.equals(tracker.rank(2), 1);
  t.equals(tracker.rank(3), 1);
  t.equals(tracker.rank(4), 2);
  t.equals(tracker.rank(5), 2);
  t.equals(tracker.rank(6), 3);
  t.equals(tracker.rank(7), 3);
  t.equals(tracker.rank(8), 4);
  t.equals(tracker.rank(9), 4);
  t.equals(tracker.rank(10), 5);
  t.end();
});

test('works with array that has duplicates', function(t) {
  var tracker = rankTracker();
  tracker.trackAll([5,7,1,3,7,5,1,1,1,3,9]);

  t.equals(tracker.rank(0), 0);
  t.equals(tracker.rank(1), 3);
  t.equals(tracker.rank(2), 4);
  t.equals(tracker.rank(3), 5);
  t.equals(tracker.rank(4), 6);
  t.equals(tracker.rank(5), 7);
  t.equals(tracker.rank(6), 8);
  t.equals(tracker.rank(7), 9);
  t.equals(tracker.rank(8), 10);
  t.equals(tracker.rank(9), 10);
  t.equals(tracker.rank(10), 11);

  t.end();
});

