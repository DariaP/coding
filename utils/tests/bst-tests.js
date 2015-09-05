var test = require('tap').test,
    createTree = require('../../utils/bst.js');

test('find', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  t.equals(tree.find(8), null);
  t.equals(tree.find(4).value, 4);
  t.equals(tree.find(3).value, 3);
  t.equals(tree.find(7).value, 7);

  t.end();
});

test('delete with 2 children', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  tree.delete(4);
  t.deepEquals(tree.inOrderValues(),[1,2,3,5,6,7]);

  t.end();
});

test('delete with left child', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  tree.delete(2);
  t.deepEquals(tree.inOrderValues(),[1,4,5,6,7]);

  t.end();
});

test('delete with right child', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  tree.delete(2);
  t.deepEquals(tree.inOrderValues(),[3,4,5,6,7]);

  t.end();
});

test('delete leaf', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  tree.delete(3);
  t.deepEquals(tree.inOrderValues(),[2,4,5,6,7]);

  t.end();
});

test('delete node, whose right child is min of right subtree', function(t) {
  var tree = createTree();
  tree.add(9);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(4);
  tree.add(5);

  tree.delete(2);
  t.deepEquals(tree.inOrderValues(),[1,3,4,5,9]);

  t.end();
});

test('delete root of a long branch', function(t) {
  var tree = createTree();
  tree.add(9);
  tree.add(11);
  tree.add(3);
  tree.add(2);
  tree.add(4);
  tree.add(1);
  tree.add(7);
  tree.add(8);

  tree.delete(3);
  t.deepEquals(tree.inOrderValues(),[1,2,4,7,8,9,11]);

  t.end();
});

test('random', function(t) {
  var tree = createTree();
  tree.add(2);
  tree.add(1);
  tree.add(0);
  tree.add(4);
  tree.add(3);
  tree.add(5);

  var result = [0,0,0,0,0,0];

  for (var i = 0 ; i < 6000 ; ++i) {
    var value = tree.random();
    result[value]++;
  }

  for (i = 0 ; i < result.length ; ++i) {
    t.equals(Math.abs(1000 - result[i]) < 50, true);
  }

  t.end();
});

