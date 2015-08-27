
function order(graph) {
  var bfsOrder = graph.fullBfsOrder({noLoop: true}),
      visited = [],
      result = [],
      i = 0;

  if (bfsOrder == null) {
    return null;
  }

  for(var i = bfsOrder.length - 1 ; i >=0 ; --i ) {
    var startNode = bfsOrder[i];
    if (!visited[startNode]) {
      var nextBfs = graph.bfsOrder(startNode);
      for (var j = 0 ; j < nextBfs.length ; ++j) {
        var nextNode = nextBfs[j];
        if (!visited[nextNode]) {
          visited[nextNode] = true;
          result.push(nextNode);          
        }
      }
    }
  }

  return result;
}

module.exports = order;