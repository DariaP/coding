function binTree(root) {

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