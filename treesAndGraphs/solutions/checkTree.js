function checkTree(tree, subtree) {

  if (!subtree.root()) {
    return true;
  }

  var subtreePath = leftLeafPath(subtree),
      treePath = leftLeafPath(tree),
      nextSubtreeRoot = treePath.length - subtreePath.length;

  while (nextSubtreeRoot !== null) {
    var result = checkLeaf(treePath, subtreePath, nextSubtreeRoot);
    if (result) {
      return true;
    } else {
      nextSubtreeRoot = moveToNextLeaf(treePath, treePath.length - 1, subtreePath.length);
    }
  }

  return false;
}

function checkLeaf(treePath, subtreePath, subtreeRoot) {
  var i = subtreePath.length - 1;

  while (i >= 0) {
    var treeNode = treePath[i + subtreeRoot],
        subtreeNode = subtreePath[i];

    if (treeNode.value == subtreeNode.value &&
        subtreesEqual(treeNode.right, subtreeNode.right)) {
      return treeNode;
    }

    i--;
  }

  return null;
}

function leftLeafPath(tree) {
  var path = [tree.root()],
      node = path[0];

  while (node.left) {
    path.push(node.left);
    node = node.left;
  }

  return path;
}

function subtreesEqual(root1, root2) {
  return (root1 === null && root2 === null) ||
         (root1 && root2 && root1.value === root2.value &&
         subtreesEqual(root1.left, root2.left) &&
         subtreesEqual(root1.right, root2.right));
}

function moveToNextLeaf(path, startFrom, minDepth) {
  for (var i = startFrom ; i >= 0 ; --i) {
    if (path[i + 1] !== path[i].right && path[i].right) {
      var nextNode = path[i].right,
          n = 1,
          j = i + 2;

      path[i + 1] = path[i].right;

      while (nextNode.left) {
        path[j++] = nextNode.left;
        nextNode = nextNode.left;
        n++;
      }

      if (n >= minDepth) {
        return (i + 1);
      } else {
        path[i + 1] = null;
      }
    }
  }

  return null;
}

module.exports = checkTree;