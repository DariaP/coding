var test = require('tap').test,
    commonAncestor = require('../solutions/commonAncestor.js');

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
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  var node2 = node(7);
  root.rigth.rigth = node2;

  var tree = binTree(root);

  t.equals(commonAncestor(tree, node1, node2), 4);
  t.end();
});

test('it works when common ancestor is their parent', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.left, root.rigth), 4);
  t.end();
});

test('it works when common ancestor is a node in the tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);
  root.rigth.rigth.left = node(8);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.rigth.rigth.left, root.rigth.left), 6);
  t.end();
});

test('it works when common ancestor if one node is a parent of another', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.left, root.left.left), 4);
  t.end();
});

test('it works when it's the same node, function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root.left, root.left), 4);
  t.end();
});

test('it works no such parent exists', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);

  var tree = binTree(root);

  t.equals(commonAncestor(tree, root, root.left), null);
  t.end();
});
