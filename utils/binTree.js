function binTree(initRoot) {

  var root = initRoot;

  function inOrder(node, callback) {
    if (node) {
      inOrder(node.left, callback);
      callback(node);
      inOrder(node.right, callback);
    }
  }

  function max(a,b) {
    return (a > b) ? a : b;
  }

  return {
    path: function(node) {
      var queue = [[root]],
          newPath;

      while (queue.length !== 0) {
        var nextPath = queue.shift(),
            lastNode = nextPath[nextPath.length - 1];

        if (lastNode === node) {
          return nextPath;
        }

        if (lastNode.left) {
          newPath = nextPath.slice();
          newPath.push(lastNode.left);
          queue.push(newPath);
        }

        if (lastNode.right) {
          newPath = nextPath.slice();
          newPath.push(lastNode.right);
          queue.push(newPath);          
        }
      }
    },

    setRoot: function(newRoot) {
      root = newRoot;
    },

    inOrder: function(callback) {
      inOrder(root, callback);
    },

    inOrderValues: function() {
      var values = [];
      inOrder(root, function(node) {
        values.push(node.value);
      });
      return values;
    }
  }
}

module.exports = binTree;