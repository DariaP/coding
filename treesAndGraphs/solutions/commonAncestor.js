

function commonAncestor(tree, node1, node2) {

  var path1 = tree.path(node1),
      path2 = tree.path(node2),
      i = 1;

  if (path1.length === 1 || path2.length === 1) {
    return null;
  }

  while (path1[i] === path2[i] && i < (path1.length - 1) && i < (path2.length - 1)) {
    i++;
  }

  return path1[i - 1];
}

module.exports = commonAncestor;