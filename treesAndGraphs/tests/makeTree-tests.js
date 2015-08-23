var makeTree = require('../solutions/makeTree.js'),
    test = require('tap').test;

test('it works with 7 elements tree', function(t) {
  var tree = makeTree([1,2,3,4,5,6,7]);
  t.deepEquals(tree.inOrderValues(), [1,2,3,4,5,6,7]);
  t.equals(tree.getHeigth(), 3);
  t.end();
});

test('it works with 8 elements tree', function(t) {
  var tree = makeTree([1,2,3,4,5,6,7,8]);
  t.deepEquals(tree.inOrderValues(), [1,2,3,4,5,6,7,8]);
  t.equals(tree.getHeigth(), 4);
  t.end();
});

test('it works with 9 elements tree', function(t) {
  var tree = makeTree([1,2,3,4,5,6,7,8,9]);
  t.deepEquals(tree.inOrderValues(), [1,2,3,4,5,6,7,8,9]);
  t.equals(tree.getHeigth(), 4);
  t.end();
});

test('it works with 15 elements tree', function(t) {
  var tree = makeTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  t.deepEquals(tree.inOrderValues(), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  t.equals(tree.getHeigth(), 4);
  t.end();
});

test('it works with 1 element tree', function(t) {
  var tree = makeTree([1]);
  t.deepEquals(tree.inOrderValues(), [1]);
  t.equals(tree.getHeigth(), 1);
  t.end();
});

test('it works with 2 elements tree', function(t) {
  var tree = makeTree([1,2]);
  t.deepEquals(tree.inOrderValues(), [1,2]);
  t.equals(tree.getHeigth(), 2);
  t.end();
});

test('it works with empty tree', function(t) {
  var tree = makeTree([]);
  t.deepEquals(tree.inOrderValues(), []);
  t.equals(tree.getHeigth(), 0);
  t.end();
});
