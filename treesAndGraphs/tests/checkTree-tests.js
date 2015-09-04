var test = require('tap').test,
    checkTree = require('../solutions/checkTree.js'),
    binTree = require('../../utils/binTree.js');

function node(value) {
  return {
    value: value,
    left: null,
    right: null
  }
}

test('it works when first subtree is required subtree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var subtreeRoot = node(2);
  subtreeRoot.left = node(1);
  subtreeRoot.right = node(3);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when tree is required subtree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var subtreeRoot = node(4);
  subtreeRoot.left = node(2);
  subtreeRoot.left.left = node(1);
  subtreeRoot.left.right = node(3);
  subtreeRoot.right = node(6);
  subtreeRoot.right.left = node(5);
  subtreeRoot.right.right = node(7);


  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when second subtree is required subtree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var subtreeRoot = node(6);
  subtreeRoot.left = node(5);
  subtreeRoot.right = node(7);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when subtree is missing left leaf', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var subtreeRoot = node(2);
  subtreeRoot.right = node(3);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when subtree is missing right leaf', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var subtreeRoot = node(2);
  subtreeRoot.left = node(3);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when subtree is deep in a branch of right children', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);
  root.right.right.right.right = node(4);

  var subtreeRoot = node(3);
  subtreeRoot.right = node(4);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when subtree is missing two left leaves', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);
  root.right.right.right.right = node(4);

  var subtreeRoot = node(2);
  subtreeRoot.right = node(3);
  subtreeRoot.right.right = node(4);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when tree doesn\'t have a subtree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);

  var subtreeRoot = node(2);
  subtreeRoot.right = node(3);
  subtreeRoot.right.right = node(4);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),false);
  t.end();
});

test('it works when subtree is one node', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);

  var subtreeRoot = node(3);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),true);
  t.end();
});

test('it works when subtree is one node, which is not a leaf', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);

  var subtreeRoot = node(2);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),false);
  t.end();
});

test('it works when subtree is one node missing from tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);

  var subtreeRoot = node(8);

  var tree = binTree(root),
      subtree = binTree(subtreeRoot);

  t.equals(checkTree(tree, subtree),false);
  t.end();
});

test('it works when subtree is empty', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.right = node(3);
  root.right = node(6);
  root.right.right = node(2);
  root.right.right.right = node(3);

  var tree = binTree(root),
      subtree = binTree();

  t.equals(checkTree(tree, subtree),true);
  t.end();
});
