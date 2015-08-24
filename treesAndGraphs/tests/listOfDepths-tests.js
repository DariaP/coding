var listOfDepths = require('../solutions/listOfDepths.js'),
    test = require('tap').test,
    graph = require('../../utils/graph.js');

function compareLists(t, lists1, lists2) {
  t.deepEquals(lists1.map(function(list) {
    return list.toString();
  }), lists2);
}

test('it works with small grapth', function(t) {
  var g = graph([[1,2],[3]]);
  var result = listOfDepths(g);
  compareLists(t, result, ["0","1,2","3"]);
  t.end();
});

test('it works with bigger grapth', function(t) {
  var g = graph([[1,2,5],[3],[0,5],[1],[2],[3,4]]);
  var result = listOfDepths(g);
  compareLists(t, result, ["0","1,2,5","3,4"]);
  t.end();
});

test('it works with bigger grapth', function(t) {
  var g = graph([[1,2,5],[3],[0,5],[1,4],[2],[3]]);
  var result = listOfDepths(g);
  compareLists(t, result, ["0","1,2,5","3","4"]);
  t.end();
});

test('it works with one element grapth', function(t) {
  var g = graph([[]]);
  var result = listOfDepths(g);
  compareLists(t, result, ["0"]);
  t.end();
});

test('it works with two elements grapth', function(t) {
  var g = graph([[1]]);
  var result = listOfDepths(g);
  compareLists(t, result, ["0","1"]);
  t.end();
});

test('it works with empty grapth', function(t) {
  var g = graph([]);
  var result = listOfDepths(g);
  compareLists(t, result, []);
  t.end();
});
