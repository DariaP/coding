var test = require('tap').test,
    createTree = require('../../utils/tree.js');

test('it works with perfectly balanced tree', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);
  t.equals(tree.isBalanced(), true);
  t.end();
});

test('it works with tree two nodes away from perfectly balanced', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);
  tree.add(8);
  tree.add(9);
  t.equals(tree.isBalanced(), false);
  t.end();
});

test('it works with balanced tree', function(t) {
  var tree = createTree();
  tree.add(5);
  tree.add(3);
  tree.add(6);
  tree.add(2);
  tree.add(1);
  tree.add(4);
  tree.add(7);
  t.equals(tree.isBalanced(), true);
  t.end();
});

test('it works with balanced tree one node away from balanced', function(t) {
  var tree = createTree();
  tree.add(5);
  tree.add(3);
  tree.add(6);
  tree.add(2);
  tree.add(1);
  tree.add(4);
  tree.add(7);
  tree.add(-1);
  t.equals(tree.isBalanced(), false);
  t.end();
});

test('it works with not balanced tree', function(t) {
  var tree = createTree();
  tree.add(1);
  tree.add(2);
  tree.add(3);
  tree.add(4);
  tree.add(5);
  tree.add(6);
  tree.add(7);
  t.equals(tree.isBalanced(), false);
  t.end();
});

test('it works with not balanced tree with equal length root subtrees', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(3);
  tree.add(2);
  tree.add(1);
  tree.add(5);
  tree.add(6);
  tree.add(7);
  t.equals(tree.isBalanced(), false);
  t.end();
});

test('it works with empty tree', function(t) {
  var tree = createTree();
  t.equals(tree.isBalanced(), true);
  t.end();
});

test('it works with single element tree', function(t) {
  var tree = createTree();
  tree.add(1);
  t.equals(tree.isBalanced(), true);
  t.end();
});

test('it works with two elements tree', function(t) {
  var tree = createTree();
  tree.add(1);
  tree.add(2);
  t.equals(tree.isBalanced(), true);
  t.end();
});


