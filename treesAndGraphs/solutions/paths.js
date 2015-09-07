
function paths(root, depth) {
  var results = [];

  inOrder(root, function(path) {
    for (var i = 0 ; i < path.length ; ++i) {
      if (path[i].depth === depth) {
        results.push({
          start: path[i].node,
          end: path[path.length - 1].node
        })
      }
    }
  });

  return results;
}

function inOrder(node, callback) {
  if (!node) {
    return;
  }

  inOrderHelper([{
    node: node,
    depth: node.value
  }], callback);
}

function inOrderHelper(path, callback) {
  var node = path[path.length - 1].node;
  if (node.left) {
    inOrderHelper(adjustPath(path, node.left), callback);
  }
  callback(path);
  if (node.right) {
    inOrderHelper(adjustPath(path, node.right), callback);      
  }
}

function adjustPath(path, newNode) {
  var newPath = path.map(function(node) {
    return {
      node: node.node,
      depth: node.depth + newNode.value
    };
  });

  newPath.push({
    node: newNode,
    depth: newNode.value
  });

  return newPath;
}

module.exports = paths;