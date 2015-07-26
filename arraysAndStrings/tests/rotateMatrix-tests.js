var rotateMatrix = require('../solutions/rotateMatrix.js'),
    test = require('tap').test;

function getMatrix() {
  return [
    [1,  2,  3,  4,  5],
    [6,  7,  8,  9,  10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ];
}

test('it rotates four elements in a layer', function(t) {
  var matrix = getMatrix();

  rotateMatrix.rotateElement(matrix, 1, 1);
  t.deepEquals(matrix, 
  [
    [1,  2,  3,  4,  5],
    [6,  7,  12, 9,  10],
    [11, 18, 13, 8,  15],
    [16, 17, 14, 19, 20],
    [21, 22, 23, 24, 25]
  ]);

  rotateMatrix.rotateElement(matrix, 0, 2);
  t.deepEquals(matrix, 
  [
    [1,  2,  11,  4,  5],
    [6,  7,  12,  9, 10],
    [23, 18, 13,  8,  3],
    [16, 17, 14, 19, 20],
    [21, 22, 15, 24, 25]
  ]);

  rotateMatrix.rotateElement(matrix, 2, 0);
  t.deepEquals(matrix, 
  [
    [1,  2,  11,  4,  5],
    [6,  7,  12,  9, 10],
    [23, 18, 13,  8,  3],
    [16, 17, 14, 19, 20],
    [21, 22, 15, 24, 25]
  ]);

  rotateMatrix.rotateElement(matrix, 0, 1);
  t.deepEquals(matrix, 
  [
    [1,  16, 11,  4,  5],
    [6,  7,  12,  9,  2],
    [23, 18, 13,  8,  3],
    [24, 17, 14, 19, 20],
    [21, 22, 15, 10, 25]
  ]);

  rotateMatrix.rotateElement(matrix, 0, 0);
  t.deepEquals(matrix, 
  [
    [21, 16, 11,  4,  1],
    [6,  7,  12,  9,  2],
    [23, 18, 13,  8,  3],
    [24, 17, 14, 19, 20],
    [25, 22, 15, 10,  5]
  ]);

  rotateMatrix.rotateElement(matrix, 0, 3);
  t.deepEquals(matrix, 
  [
    [21, 16, 11,  6,  1],
    [22, 7,  12,  9,  2],
    [23, 18, 13,  8,  3],
    [24, 17, 14, 19,  4],
    [25, 20, 15, 10,  5]
  ]);

  t.end();
});

test('it rotates layer', function(t) {
  var matrix = getMatrix();

  rotateMatrix.rotateLayer(matrix, 0);
  t.deepEquals(matrix, 
  [
    [21, 16, 11, 6,  1],
    [22, 7,  8,  9,  2],
    [23, 12, 13, 14, 3],
    [24, 17, 18, 19, 4],
    [25, 20, 15, 10, 5]
  ]);

  rotateMatrix.rotateLayer(matrix, 1);
  t.deepEquals(matrix, 
  [
    [21, 16, 11, 6,  1],
    [22, 17, 12, 7,  2],
    [23, 18, 13, 8,  3],
    [24, 19, 14, 9,  4],
    [25, 20, 15, 10, 5]
  ]);

  rotateMatrix.rotateLayer(matrix, 2);
  t.deepEquals(matrix, 
  [
    [21, 16, 11, 6,  1],
    [22, 17, 12, 7,  2],
    [23, 18, 13, 8,  3],
    [24, 19, 14, 9,  4],
    [25, 20, 15, 10, 5]
  ]);
});

test('it rotates matrix with odd size', function(t) {
  var matrix = getMatrix();
  rotateMatrix.rotate(matrix);
  t.deepEquals(matrix,  
  [
    [21, 16, 11, 6,  1],
    [22, 17, 12, 7,  2],
    [23, 18, 13, 8,  3],
    [24, 19, 14, 9,  4],
    [25, 20, 15, 10, 5]
  ]);
});

test('it rotates matrix with even size', function(t) {
  var matrix = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9,  10, 11, 12],
    [13, 14, 15, 16]
  ];
  rotateMatrix.rotate(matrix);
  t.deepEquals(matrix,  
  [
    [13, 9,  5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [16, 12, 8, 4]
  ]);
});

test('it rotates matrix with single element', function(t) {
  var matrix = [[1]];
  rotateMatrix.rotate(matrix);
  t.deepEquals(matrix,[[1]]);
});

test('it rotates empty matrix', function(t) {
  var matrix = [[]];
  rotateMatrix.rotate(matrix);
  t.deepEquals(matrix,[[]]);
});