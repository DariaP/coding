var successor = require('../solutions/successor.js'),
    test = require('tap').test,
    createTree = require('../../utils/bst.js');

test('it works when the node has right child', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  var node = tree.add(6);
  tree.add(5);
  tree.add(7);

  t.equals(successor(node), 7);
  t.end();
});

test('it works when the node has right child tree', function(t) {
  var tree = createTree();
  var node = tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  t.equals(successor(node), 5);
  t.end();
});

test('it works when the node doesn\'t have right child and it\'s a root', function(t) {
  var tree = createTree();
  var node = tree.add(4);
  tree.add(3);
  tree.add(2);
  tree.add(1);

  t.equals(successor(node), null);
  t.end();
});

test('it works when the node doesn\'t have right child and is a left child', function(t) {
  var tree = createTree();
  tree.add(4);
  var node = tree.add(2);
  tree.add(1);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  t.equals(successor(node), 4);
  t.end();
});

test('it works when the node doesn\'t have right child and has a left grandparent', function(t) {
  var tree = createTree();
  tree.add(1);
  tree.add(7);
  tree.add(3);
  var node = tree.add(5);

  t.equals(successor(node), 7);
  t.end();
});

test('it works when the node doesn\'t have right child and doesn\'t have a left grandparent', function(t) {
  var tree = createTree();
  tree.add(1);
  tree.add(2);
  tree.add(3);
  var node = tree.add(4);

  t.equals(successor(node), null);
  t.end();
});