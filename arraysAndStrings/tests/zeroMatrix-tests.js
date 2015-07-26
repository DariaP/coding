var zeroMatrix = require('../solutions/zeroMatrix.js'),
    test = require('tap').test;

test('it works with simple matrix containing zero', function(t) {
  var matrix = [
    [1, 2, 3],
    [1, 0, 1],
    [2, 3, 4]
  ];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [
    [1, 0, 3],
    [0, 0, 0],
    [2, 0, 4]
  ]);
  t.end();
});

test('it works with simple matrix without zeros', function(t) {
  var matrix = [
    [1, 2, 3],
    [1, 3, 1],
    [2, 3, 4]
  ];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [
    [1, 2, 3],
    [1, 3, 1],
    [2, 3, 4]
  ]);
  t.end();
});

test('it works with single element (not zero) matrix', function(t) {
  var matrix = [[3]];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [[3]]);
  t.end();
});

test('it works with single element (zero) matrix', function(t) {
  var matrix = [[0]];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [[0]]);
  t.end();
});

test('it works with empty matrix', function(t) {
  var matrix = [[]];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [[]]);
  t.end();
});

test('it works with empty array', function(t) {
  var matrix = [];

  zeroMatrix(matrix);

  t.deepEquals(matrix, []);
  t.end();
});

test('it works with complex matrix containing several zeros', function(t) {
  var matrix = [
    [1, 2, 3, 4],
    [5, 0, 9, 1],
    [1, 2, 0, 7],
    [1, 2, 1, 1]
  ];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [
    [1, 0, 0, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1]
  ]);
  t.end();
});

test('it works with complex matrix not containing zero', function(t) {
  var matrix = [
    [1, 2, 3, 4],
    [5, 7, 9, 9],
    [1, 2, 9, 6],
    [1, 2, 1, 1]
  ];

  zeroMatrix(matrix);

  t.deepEquals(matrix, [
    [1, 2, 3, 4],
    [5, 7, 9, 9],
    [1, 2, 9, 6],
    [1, 2, 1, 1]
  ]);
  t.end();
});

test('it throws exception if not an array', function(t) {
  function call() {
    zeroMatrix(12);
  }
  t.throws(call, "Invalid input (array of arrays expected)");
  t.end();
});

test('it throws exception if not an array of arrays', function(t) {
  function call() {
    zeroMatrix([1, 2, 3]);
  }
  t.throws(call, "Invalid input (array of arrays expected)");
  t.end();
});

test('it throws exception if arrays are not of the same length', function(t) {
  function call() {
    zeroMatrix([[1, 2, 3], [4, 5, 6], [7, 8]]);
  }
  t.throws(call, "Invalid input (arrays of the same length expected)");
  t.end();
});