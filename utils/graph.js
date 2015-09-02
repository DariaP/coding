function graph(adjList, nodesNum) {

  function bfs(startNode, factory, callback, loopCallback) {
      if(nodesNum === 0) {
        return;
      }

      var visited = [],
          queue = [factory.initElement(startNode)];

      while (queue.length !== 0) {
        var nextElement = queue.shift(),
            nextNode = factory.getNode(nextElement);

        if(visited[nextNode]) {
          if(loopCallback) {
            var mustReturn = loopCallback();
            if (mustReturn) {
              return;
            }
          } else {
            continue;            
          }
        } else {
          visited[nextNode] = true;

          if (adjList[nextNode]) {
            var newElements = factory.makeNextElement(nextElement);
            queue = queue.concat(newElements);
          }
          callback(nextElement);
        }
      }
  }

  function bfsFactory() {
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

  function bfsDepthFactory() {
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

  function bfsPathFactory() {
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

  function bfsOrder(node, options) {
    var result = [],
        hasLoop = false;
    bfs(node, bfsFactory(), function(node) {
      result.push(node);
    }, function() {
      if (options && options.noLoop) {
        hasLoop = true;
        return true;
      } else {
        return false;
      }
    });
    if (hasLoop) {
      return null;
    } else {
      return result;      
    }
  }

  function fullBfsOrder(options) {
    var visited = [],
        result = [],
        startNode = 0;

    while(startNode !== nodesNum) {
      if (!visited[startNode]) {
        var nextBfs = bfsOrder(startNode, options);
        if (nextBfs == null) {
          return null;
        }
        for (var i = 0 ; i < nextBfs.length ; ++i) {
          var nextNode = nextBfs[i];
          visited[nextNode] = true;
          result.push(nextNode);
        }
      }
      startNode++;
    }

    return result;
  }

  return {
    fullBfsOrder: fullBfsOrder,
    bfsOrder: bfsOrder,

    bfs: function(startNode, callback) {
      bfs(startNode, bfsFactory(), callback);
    },

    bfsPath: function(startNode, callback) {
      bfs(startNode, bfsPathFactory(), callback);
    },

    bfsDepth: function(startNode, callback) {
      bfs(startNode, bfsDepthFactory(), callback);
    },

    nodesNum: nodesNum
  }
}

module.exports = graph;