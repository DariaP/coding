function graph(adjList) {

  function dfs(startNode, factory, callback) {
      if(adjList.length === 0) {
        return;
      }

      var visited = [],
          queue = [factory.initElement(startNode)];

      while (queue.length !== 0) {
        var nextElement = queue.shift(),
            nextNode = factory.getNode(nextElement);

        if(visited[nextNode]) {
          continue;
        } else {
          visited[nextNode] = true;
        }

        if (adjList[nextNode]) {
          var newElements = factory.makeNextElement(nextElement);
          queue = queue.concat(newElements);
        }
        callback(nextElement);
      }
  }

  function dfsFactory() {
    return {
      initElement: function(startNode) {
        return startNode
      },
      getNode: function(node) {
        return node;
      },
      makeNextElement: function(node) {
        return adjList[node];
      }
    }
  }

  function dfsDepthFactory() {
    return {
      initElement: function(startNode) {
        return {
          node: startNode,
          depth: 0
        }
      },
      getNode: function(element) {
        return element.node;
      },
      makeNextElement: function(element) {
        return adjList[element.node].map(function(neighbor) {
          return {
            node: neighbor,
            depth: element.depth + 1
          };
        });
      }
    }
  }

  function dfsPathFactory() {
    return {
      initElement: function(startNode) {
        return [startNode]
      },
      getNode: function(path) {
        return path[path.length - 1];
      },
      makeNextElement: function(path) {
        var node = path[path.length - 1];
        return adjList[node].map(function(neighbor) {
          var newPath = path.slice();
          newPath.push(neighbor);
          return newPath; 
        });
      }
    }
  }

  return {
    dfs: function(startNode, callback) {
      dfs(startNode, dfsFactory(), callback);
    },

    dfsPath: function(startNode, callback) {
      dfs(startNode, dfsPathFactory(), callback);
    },

    dfsDepth: function(startNode, callback) {
      dfs(startNode, dfsDepthFactory(), callback);
    }
  }
}

module.exports = graph;