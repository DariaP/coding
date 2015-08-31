var test = require('tap').test,
    arrays = require('../solutions/arrays.js'),
    binTree = require('../../utils/binTree.js');

function node(value) {
  return {
    value: value,
    left: null,
    right: null
  }
}

function compareArraysOfArrays(t, array1, array2) {

  t.equals(array1.length, array2.length);

  for (var i = 0 ; i < array1.length ; ++i) {
    t.deepEquals(array1[i], array2[i]);
  }
}

test('it works with a small tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.right = node(6);

  var result = arrays(root);

  compareArraysOfArrays(t, result, [
    [4,2,6],
    [4,6,2]
  ])

  t.end();
});

test('it works with a bigger tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);

  var result = arrays(root);

  compareArraysOfArrays(t, result, [
    [4,2,6,1,3],
    [4,2,6,3,1],
    [4,2,1,6,3],
    [4,2,1,3,6],
    [4,2,3,6,1],
    [4,2,3,1,6],
    [4,6,2,1,3],
    [4,6,2,3,1]
  ]);

  t.end();
});

test('it works with a two nodes tree', function(t) {
  var root = node(4);
  root.left = node(2);

  var result = arrays(root);

  compareArraysOfArrays(t, result, [
    [4,2]
  ])

  t.end();
});

test('it works with a single node tree', function(t) {
  var root = node(4);

  var result = arrays(root);

  compareArraysOfArrays(t, result, [
    [4]
  ])

  t.end();
});

test('it works with an empty tree', function(t) {

  var result = arrays(null);

  compareArraysOfArrays(t, result, [
  ]);

  t.end();
});
