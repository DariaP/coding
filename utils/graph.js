function graph(adjList) {
  return {
    dfs: function(startNode, callback) {
      var queue = [startNode];

      while (queue.length !== 0) {
        var nextNode = queue.shift();
        if (adjList[nextNode]) {
          queue = queue.concat(adjList[nextNode]);
        }
        callback(nextNode);
      }
    },

    dfsPath: function(startNode, callback) {
      var queue = [[startNode]];

      while (queue.length !== 0) {
        var nextPath = queue.shift();
        var nextNode = nextPath[nextPath.length - 1];
        if (adjList[nextNode]) {
          var newPaths = adjList[nextNode].map(function(node) {
            var newPath = nextPath.slice();
            newPath.push(node);
            return newPath;
          });
          queue = queue.concat(newPaths);
        }
        callback(nextNode, nextPath);
      }
    }
  }
}

module.exports = graph;