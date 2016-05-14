var find = require('./findInMatrix.js');
var test = require('tap').test;

test('it works with elements of 5*5 matrix', function(t) {
  var matrix = [
  	[ 1, 2, 3, 4, 5],
  	[ 6, 7, 8, 9,10],
  	[11,12,13,14,15],
  	[16,17,18,19,20],
  	[21,22,23,24,25]
  ];

  t.deepEquals(find(matrix, 1), {x: 0, y: 0});
  t.deepEquals(find(matrix, 2), {x: 0, y: 1});
  t.deepEquals(find(matrix, 3), {x: 0, y: 2});
  t.deepEquals(find(matrix, 4), {x: 0, y: 3});
  t.deepEquals(find(matrix, 5), {x: 0, y: 4});

  t.deepEquals(find(matrix, 6), {x: 1, y: 0});
  t.deepEquals(find(matrix, 7), {x: 1, y: 1});
  t.deepEquals(find(matrix, 8), {x: 1, y: 2});
  t.deepEquals(find(matrix, 9), {x: 1, y: 3});
  t.deepEquals(find(matrix, 10), {x: 1, y: 4});

  t.deepEquals(find(matrix, 11), {x: 2, y: 0});
  t.deepEquals(find(matrix, 12), {x: 2, y: 1});
  t.deepEquals(find(matrix, 13), {x: 2, y: 2});
  t.deepEquals(find(matrix, 14), {x: 2, y: 3});
  t.deepEquals(find(matrix, 15), {x: 2, y: 4});

  t.deepEquals(find(matrix, 16), {x: 3, y: 0});
  t.deepEquals(find(matrix, 17), {x: 3, y: 1});
  t.deepEquals(find(matrix, 18), {x: 3, y: 2});
  t.deepEquals(find(matrix, 19), {x: 3, y: 3});
  t.deepEquals(find(matrix, 20), {x: 3, y: 4});

  t.deepEquals(find(matrix, 21), {x: 4, y: 0});
  t.deepEquals(find(matrix, 22), {x: 4, y: 1});
  t.deepEquals(find(matrix, 23), {x: 4, y: 2});
  t.deepEquals(find(matrix, 24), {x: 4, y: 3});
  t.deepEquals(find(matrix, 25), {x: 4, y: 4});

  for (var i = 0.5 ; i <= 25.5 ; ++i) {
  	  t.equals(find(matrix, i), null);
  }
  t.end();
});