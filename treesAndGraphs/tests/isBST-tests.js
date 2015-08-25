var test = require('tap').test,
    isBST = require('../solutions/isBst.js'),
    binTree = require('../../utils/binTree.js');

function node(value) {
  return {
    value: value,
    left: null,
    right: null
  }
}

test('it works with search tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(1);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);

  var tree = binTree(root);

  t.equals(isBST(tree),true);
  t.end();
});

test('it works with single node tree', function(t) {
  var root = node(4);

  var tree = binTree(root);

  t.equals(isBST(tree),true);
  t.end();
});


test('it works with empty tree', function(t) {

  var tree = binTree();

  t.equals(isBST(tree),true);
  t.end();
});

test('it works with two nodes search tree', function(t) {
  var root = node(4);
  root.left = node(2);

  var tree = binTree(root);

  t.equals(isBST(tree),true);
  t.end();
});

test('it works with two nodes not a search tree', function(t) {
  var root = node(4);
  root.left = node(5);

  var tree = binTree(root);

  t.equals(isBST(tree),false);
  t.end();
});

test('it works with not a search tree', function(t) {
  var root = node(4);
  root.left = node(2);
  root.left.left = node(9);
  root.left.rigth = node(3);
  root.rigth = node(6);
  root.rigth.left = node(5);
  root.rigth.rigth = node(7);

  var tree = binTree(root);

  t.equals(isBST(tree),false);
  t.end();
});
