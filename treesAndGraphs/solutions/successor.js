
function successor(node) {
  if (node.right) {
    return min(node.right);
  } else if (!node.parent) {
    return null;
  } else {
    return findFirsLeftParent(node);
  }
}

function findFirsLeftParent(node) {
  var nextNode = node;
  while (nextNode.parent) {
    if (nextNode.parent.left === nextNode) {
      return nextNode.parent.value;
    }
    nextNode = nextNode.parent;
  }
  return null;
}

function min(node) {
  var nextNode = node;
  while (nextNode.left) {
    nextNode = nextNode.left;
  };
  return nextNode.value;
}

module.exports = successor;