var test = require('tap').test,
    commonAncestor = require('../solutions/commonAncestor.js'),
    binTree = require('../../utils/binTree.js');

function node(value) {
  return {
    value: value,
    left: null,
    right: null
  }
}

test('it works when common ancestor is root', function(t) {
  var root = node(4);
  root.left = node(2);
  var node1 = node(1);
  root.left.left = node1;
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  var node2 = node(7);
  root.right.right = node2;

  var tree = binTree(root);

  t.equals(commonAncestor(tree, node1, node2).value, 4);
  t.end();
});

test('it works when common ancestor is their parent', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.left, root.right).value, 4);
  t.end();
});

test('it works when common ancestor is a node in the tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);
  root.right.right.left = node(8);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.right.right.left, root.right.left).value, 6);
  t.end();
});

test('it works when common ancestor if one node is a parent of another', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.left, root.left.left).value, 4);
  t.end();
});

test('it works when it\'s the same node', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.left, root.left).value, 4);
  t.end();
});

test('it works when no such parent exists', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.right = node(3);
  root.right = node(6);
  root.right.left = node(5);
  root.right.right = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root, root.left), null);
  t.end();
});
