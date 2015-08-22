function findPath(graph, node1, node2) {
  var result = null;

  graph.dfsPath(node1, function(node, path) {
    if (node === node2) {
      if (!result) {
        result = path;        
      }
    }
  });

  return result;
}

module.exports = findPath;