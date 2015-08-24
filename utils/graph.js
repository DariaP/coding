function graph(adjList) {

  return {
    dfs: function(startNode, callback) {

      if(adjList.length === 0) {
        return;
      }

      var visited = [];

      var queue = [startNode];

      while (queue.length !== 0) {
        var nextNode = queue.shift();

        if(visited[nextNode]) {
          continue;
        } else {
          visited[nextNode] = true;
        }

        if (adjList[nextNode]) {
          queue = queue.concat(adjList[nextNode]);
        }
        callback(nextNode);
      }
    },

    dfsPath: function(startNode, callback) {

      if(adjList.length === 0) {
        return;
      }

      var visited = [];

      var queue = [[startNode]];

      while (queue.length !== 0) {
        var nextPath = queue.shift();
        var nextNode = nextPath[nextPath.length - 1];

        if(visited[nextNode]) {
          continue;
        } else {
          visited[nextNode] = true;
        }

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
    },

    dfsDepth: function(startNode, callback) {

      if(adjList.length === 0) {
        return;
      }

      var visited = [];

      var queue = [{
        node: startNode,
        depth: 0
      }];

      while (queue.length !== 0) {
        var nextNode = queue.shift();

        if(visited[nextNode.node]) {
          continue;
        } else {
          visited[nextNode.node] = true;
        }

        if (adjList[nextNode.node]) {
          var newNodes = adjList[nextNode.node].map(function(node) {
            return {
              node: node,
              depth: nextNode.depth + 1
            };
          });
          queue = queue.concat(newNodes);
        }
        callback(nextNode, nextNode);
      }
    }
  }
}

module.exports = graph;