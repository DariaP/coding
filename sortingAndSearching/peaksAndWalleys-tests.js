var sort = require('./peaksAndWalleys.js');
var test = require('tap').test;

function checkPeaks(t, a) {
	for (var i = 1 ; i < (a.length - 1) ; ++i) {
		if (i % 2 === 0) {
			t.equals(a[i] > a[i - 1], true);
			t.equals(a[i] > a[i + 1], true);
		} else {
			t.equals(a[i] < a[i - 1], true);
			t.equals(a[i] < a[i + 1], true);
		}
	}
}

test('works with sorted array', function(t) {
  var array = [1,2,3,4,5];
  sort(array);
  checkPeaks(t, array);
  t.end();
});

test('works with unsorted array', function(t) {
  var array = [1,2,5,4,8,9,0,3,7,6];
  sort(array);
  checkPeaks(t, array);
  t.end();
});

test('works with peaks and walleys - sorted array', function(t) {
  var array = [12,1,5,3,8,4,9,2,11];
  sort(array);
  checkPeaks(t, array);
  t.end();
});
