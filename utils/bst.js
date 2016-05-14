var binTree = require('./binTree.js'),
    gen = require('random-seed');

function tree() {
  var tree = binTree(),
      root = null,
      heigth = 0,
      size = 0;
      random = null;

  function insert(node) {
    var parentNode = root,
        nodeHeigth = 2; // root and new node

    while(parentNode) {
      if (parentNode.value > node.value) {
        if (parentNode.left === null) {
          parentNode.left = node;
          node.parent = parentNode;
          break;
        } else {
          parentNode = parentNode.left;
          nodeHeigth++;
        }
      } else {
        if (parentNode.right === null) {
          parentNode.right = node;
          node.parent = parentNode;
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

  function subtreeSize(node) {
    if (!node) {
      return 0;
    } else {
      var temp = subtreeSize(node.left) + subtreeSize(node.right);
      return 1 + temp;
    }
  }

  function max(a,b) {
    return (a > b) ? a : b;
  }

  function find(value) {
    var node = root,
        prevNode = null;

    while (node) {
      if (node.value === value) {
        return {
          node: node,
          prevNode: prevNode
        };
      } else {
        if (node.value < value) {
          prevNode = node;
          node = node.right;
        } else {
          prevNode = node;
          node = node.left;
        }
      }
    }

    return {
      node: null,
      prevNode: null
    };
  }

  function setChild(parent, child, newChild) {

    if (!parent) {
      root = newChild;
      tree.setRoot(newChild);
    } else {
      if (parent.left === child) {
        parent.left = newChild;
      } else {
        parent.right = newChild;
      }
    }
  }

  function removeMin(root) {
    var node = root,
        prevNode = null;

    while (node.left) {
      prevNode = node;
      node = node.left;
    }

    deleteNode(prevNode, node);

    return node;
  }

  function deleteNode(prevNode, node) {
    if (node) {
      if (!node.left && !node.right) {
        setChild(prevNode, node, null);
      } else if (!node.left) {
        setChild(prevNode, node, node.right);
      } else if (!node.right) {
        setChild(prevNode, node, node.left);
      } else if (!node.right.left) { 
        // min of the right branch is the right child of the node
        node.right.left = node.left;
        setChild(prevNode, node, node.right);
      } else {
        var min = removeMin(node.right);
        min.left = node.left;
        min.right = node.right;
        setChild(prevNode, node, min);
      }

      size--;
    }
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

      size++;

      return newNode;
    },

    find: function(value) {
      return find(value).node;
    },

    delete: function(value) {
      var nodes = find(value),
          node = nodes.node,
          prevNode = nodes.prevNode;

      deleteNode(prevNode, node);
    },

    inOrder: function(callback) {
      tree.inOrder(callback);
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
    },

    random: function() {
      if (!random) { 
        var seed = (new Date()).getTime().toString();
        random = gen.create(seed);
      }

      var num = random(size),
          result = null;

      tree.inOrder(function(node) {
        if (num === 0) {
          result = node.value;
        }
        num--;
      })

      return result;
    },

    getRoot: function() {
      return root;
    },

    subtreeSize: subtreeSize
  }
}

function node(value) {
  return {
    left: null,
    right: null,
    parent: null,
    value: value
  }
}

module.exports = tree;