function graph(adjList, nodesNum) {

  function partBfs(startNode, factory, callback, loopCallback) {

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
          var mustReturn = loopCallback(nextElement, nextNode);
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

  function bfs(startNode, factory, callback, loopCallback) {

    if(nodesNum === 0) {
      return;
    }

    var visited = [],
        queue = [],
        startNode = 0; 

    while(startNode !== nodesNum) {

      if (!visited[startNode]) {
        partBfs (startNode, factory, function (nextElement) {
          callback(nextElement);
          visited[factory.getNode(nextElement)] = true;
        }, 
        loopCallback);
      }

      startNode++;
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

  function order(node, bfsFunc, options) {
    var result = [];

    bfsFunc(node, bfsFactory(), function(node) {
      result.push(node);
    });

    return result;
  }

  function noLoopOrder(node, bfsFunc, options) {
    var result = [],
        hasLoop = false;

    bfsFunc(node, bfsPathFactory(), 
      function(path) {
        var node = path[path.length - 1];
        result.push(node);
      }, 
      function(path, node) {
        if (path.indexOf(node) === path.length - 1) {
          return false;
        } else {
          hasLoop = true;
          return true;          
        }
      }
    );

    if (hasLoop) {
      return null;
    } else {
      return result;      
    }
  }

  return {
    bfsOrder: function(node, options) {
      if (options && options.noLoop) {
        return noLoopOrder(node, partBfs);          
      } else {
        return order(node, partBfs);          
      }
    },

    fullBfsOrder: function(options) {
      if (options && options.noLoop) {
        return noLoopOrder(0, bfs);
      } else {
        return order(0, bfs);         
      }  
    },

    bfs: function(callback, options) {
      var factory = null;
      if (options && options.callbackData === 'path') {
        factory = bfsPathFactory();
      } else if (options && options.callbackData === 'depth') {
        factory = bfsDepthFactory();
      } else {
        factory = bfsFactory();
      }

      var func = null;
      if (options && options.full === true) {
        func = bfs;
      } else {
        func = partBfs;
      }

      var startNode = (options && options.startNode) ? options.startNode : 0;

      func(startNode, factory, callback);
    },

    nodesNum: nodesNum
  }
}

module.exports = graph;