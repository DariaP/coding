var order = require('../solutions/order.js'),
    test = require('tap').test,
    graph = require('../../utils/graph.js');

test('it works when root is the first node', function(t) {
  var g = graph([[1,2],[3]], 4);
  var result = order(g);
  t.deepEquals(result, [3,2,1,0]);
  t.end();
});

test('it works when root is not the first node', function(t) {
  var g = graph([[1,2],[],[],[0]], 4);
  var result = order(g);
  t.deepEquals(result, [2,1,0,3]);
  t.end();
});

test('it works with bigger graph', function(t) {
  var g = graph([[1,2],[3,4],[],[5],[6],[8],[7],[5],[8]], 9);
  var result = order(g);
  t.deepEquals(result, [8,5,7,6,4,3,1,2,0]);
  t.end();
});

test('it works with bigger graph', function(t) {
  var g = graph([[1,2],[3,4],[],[5],[6],[8],[7],[],[8],[6]], 9);
  var result = order(g);
  t.deepEquals(result, [7,6,8,5,3,1,5,2,0]);
  t.end();
});

test('it works with empty graph', function(t) {
  var g = graph([], 0);
  var result = order(g);
  t.deepEquals(result, []);
  t.end();
});

test('it works with one element graph', function(t) {
  var g = graph([], 1);
  var result = order(g);
  t.deepEquals(result, [0]);
  t.end();
});

test('it works with two elements graph', function(t) {
  var g = graph([[1]], 2);
  var result = order(g);
  t.deepEquals(result, [1,0]);
  t.end();
});

test('it works with two elements graph', function(t) {
  var g = graph([[],[0]], 2);
  var result = order(g);
  t.deepEquals(result, [0,1]);
  t.end();
});

test('it works with disconnected graph', function(t) {
  var g = graph([], 2);
  var result = order(g);
  t.deepEquals(result, [1,0]);
  t.end();
});

test('it detects a loop in a two elements graph', function(t) {
  var g = graph([[1],[0]], 2);
  var result = order(g);
  t.deepEquals(result, null);
  t.end();
});

test('it detects a loop in a bigger graph', function(t) {
  var g = graph([[1, 2],[3],[4,5],[4],[0]], 5);
  var result = order(g);
  t.deepEquals(result, null);
  t.end();
});
