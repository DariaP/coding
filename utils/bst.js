var binTree = require('./binTree.js')

function tree() {
  var tree = binTree(),
      root = null,
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

  function subtreeHeight(node) {
    if (!node) {
      return 0;
    } else {
      var temp = max(subtreeHeight(node.left), subtreeHeight(node.right));
      return 1 + temp;
    }
  }

  function max(a,b) {
    return (a > b) ? a : b;
  }

  return {
    add: function(value) {
      var newNode = node(value);

      if (!root) {
        tree.setRoot(newNode);
        root = newNode;
        heigth = 1;
      } else {
        insert(newNode);
      }
    },

    inOrderValues: function() {
      return tree.inOrderValues();
    },

    getHeigth: function() {
      return heigth;
    },

    isBalanced: function() {

      function isBalanced(node) {

        if(!node) {
          return true;
        }

        return Math.abs(subtreeHeight(node.left) - subtreeHeight(node.right)) <= 1 && 
               isBalanced(node.left) && 
               isBalanced(node.right);
      }

      return isBalanced(root);
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