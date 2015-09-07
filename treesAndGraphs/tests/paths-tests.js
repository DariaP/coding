var test = require('tap').test,
    paths = require('../solutions/paths.js');

function node(value) {
  return {
    value: value,
    left: null,
    right: null
  }
}

function compareArraysOfPaths(t, array1, array2) {

  t.equals(array1.length, array2.length);

  for (var i = 0 ; i < array1.length ; ++i) {
    t.equals(array1[i].start.value, array2[i].start);
    t.equals(array1[i].end.value, array2[i].end);
  }
}

test('it works when all paths start from root', function(t) {
  var root = node(5);
  root.left = node(3);
  root.left.left = node(2);
  root.left.left.left = node(1);
  root.right = node(6);
  root.right.left = node(8);
  root.right.right = node(7);

  var result = paths(root, 11);

  compareArraysOfPaths(t, result, [
    {start: 5, end: 1},
    {start: 5, end: 6}
  ])

  t.end();
});

test('it works when some paths don\'t start from root', function(t) {
  var root = node(5);
  root.left = node(2);
  root.left.left = node(9);
  root.left.right = node(12);
  root.left.left.left = node(1);
  root.right = node(3);
  root.right.left = node(6);
  root.right.left.left = node(2);
  root.right.left.right = node(22);

  var result = paths(root, 8);

  compareArraysOfPaths(t, result, [
    {start: 6, end: 2},
    {start: 5, end: 3}
  ])

  t.end();
});

test('it works when there are no paths', function(t) {
  var root = node(5);
  root.left = node(2);
  root.left.left = node(9);
  root.left.right = node(12);
  root.left.left.left = node(23);
  root.right = node(3);
  root.right.left = node(6);
  root.right.left.left = node(2);
  root.right.left.right = node(22);

  var result = paths(root, 1);

  compareArraysOfPaths(t, result, [])

  t.end();
});

test('it works when tree has two nodes and path', function(t) {
  var root = node(5);
  root.left = node(2);

  var result = paths(root, 7);

  compareArraysOfPaths(t, result, [{
    start: 5,
    end: 2
  }])

  t.end();
});

test('it works when tree has two nodes and one node path', function(t) {
  var root = node(5);
  root.left = node(2);

  var result = paths(root, 5);

  compareArraysOfPaths(t, result, [{
    start: 5,
    end: 5
  }])

  t.end();
});

test('it works when tree has onde node and one path', function(t) {
  var root = node(9);

  var result = paths(root, 9);

  compareArraysOfPaths(t, result, [{
    start: 9,
    end: 9
  }])

  t.end();
});

test('it works when tree is empty', function(t) {

  var result = paths(null, 9);

  compareArraysOfPaths(t, result, []);

  t.end();
});
