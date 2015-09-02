var findPath = require('../solutions/findPath.js'),
    test = require('tap').test,
    graph = require('../../utils/graph.js');

test('it finds existing path between two nodes', function(t) {
  var g = graph([[1,2],[3]], 3);
  var result = findPath(g, 0, 3);
  t.deepEquals(result, [0,1,3]);
  t.end();
});

test('it finds that path doesn\'t exist between two nodes', function(t) {
  var g = graph([[1,2],[3],[],[2]], 4);
  var result = findPath(g, 3, 0);
  t.deepEquals(result, null);
  t.end();
});

test('it works with two nodes graph (path exists))', function(t) {
  var g = graph([[1]], 2);
  var result = findPath(g, 0, 1);
  t.deepEquals(result, [0,1]);
  t.end();
});

test('it works with two nodes graph (path dosen\'t exist))', function(t) {
  var g = graph([[1]], 2);
  var result = findPath(g, 1, 0);
  t.deepEquals(result, null);
  t.end();
});

test('it works with disconnected nodes', function(t) {
  var g = graph([[3],[5]],6);
  var result = findPath(g, 1, 0);
  t.deepEquals(result, null);
  t.end();
});

test('it finds the shortest path between two nodes', function(t) {
  var g = graph([[1,2,5],[3],[],[],[3],[6],[4]], 7);
  var result = findPath(g, 0, 3);
  t.deepEquals(result, [0,1,3]);
  t.end();
});
