function tree() {
  var root = null,
      heigth = 0;

  function insert(node) {
    var parentNode = root,
        nodeHeigth = 2; // root and new node

    while(parentNode) {
      if (parentNode.value > node.value) {
        if (parentNode.left === null) {
          parentNode.left = node;
          break;
        } else {
          parentNode = parentNode.left;
          nodeHeigth++;
        }
      } else {
        if (parentNode.right === null) {
          parentNode.right = node;
          break;
        } else {
          parentNode = parentNode.right;
          nodeHeigth++;
        }
      }
    }

    if (nodeHeigth > heigth) {
      heigth = nodeHeigth;
    }
  }

  function inOrder(node, callback) {
    if (node) {
      inOrder(node.left, callback);
      callback(node);
      inOrder(node.right, callback);
    }
  }

  return {
    add: function(value) {
      var newNode = node(value);

      if (!root) {
        root = newNode;
        heigth = 1;
      } else {
        insert(newNode);
      }
    },

    inOrderValues: function() {
      var values = [];
      inOrder(root, function(node) {
        values.push(node.value);
      });
      return values;
    },

    getHeigth: function() {
      return heigth;
    }
  }
}

function node(value) {
  return {
    left: null,
    right: null,
    value: value
  }
}

module.exports = tree;