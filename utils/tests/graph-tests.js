var test = require('tap').test,
    graph = require('../../utils/graph.js');

test('bfsOrder', function(t) {
  var g = graph([[1,2],[3],[0],[]], 4);
  t.deepEquals(g.bfsOrder(0),[0,1,2,3]);
  t.deepEquals(g.bfsOrder(1),[1,3]);
  t.deepEquals(g.bfsOrder(2),[2,0,1,3]);
  t.end();
});

test('fullBfsOrder', function(t) {
  var g = graph([[1,2],[3],[0],[]], 4);
  t.deepEquals(g.fullBfsOrder(),[0,1,2,3]);
  t.end();
});

test('bfs', function(t) {
  var g = graph([[1,2],[3],[0],[]], 4),
  	  order = [];

  g.bfs(0, function(node) {
  	order.push(node);
  })

  t.deepEquals(order,[0,1,2,3]);
  t.end();
});

