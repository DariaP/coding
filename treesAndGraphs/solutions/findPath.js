function findPath(graph, node1, node2) {
  var result = null;

  graph.bfs(function(path) {
  	var node = path[path.length - 1];
    if (node === node2) {
      if (!result) {
        result = path;        
      }
    }
  }, { 
    startNode: node1,
    callbackData: 'path'
  });

  return result;
}

module.exports = findPath;