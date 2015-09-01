function findPath(graph, node1, node2) {
  var result = null;

  graph.bfsPath(node1, function(path) {
  	var node = path[path.length - 1];
    if (node === node2) {
      if (!result) {
        result = path;        
      }
    }
  });

  return result;
}

module.exports = findPath;