
function arrays(root) {

  if (!root) return [];

  var results = [[root]],
      newNodes = true;

  do {
    var newResults = extend(results);
    if (!newResults) {
      newNodes = false;
    } else {
      results = newResults;      
    }
  } while (newNodes);

  return results.map(function(result) {
    return result.map(function(node) {
      return node.value;
    });
  });
}

function extend(results) {

  var newResults = [];

  for (var i = 0 ; i < results.length ; ++i) {
    var newNodes = getNewNodes(results[i]);

    if (newNodes.length === 0) {
      return null;
    } else {
      newResults = newResults.concat(
        newNodes.map(function(newNode) {
          var newResult = results[i].slice();
          newResult.push(newNode);
          return newResult;
        })
      );
    }
  }
  return newResults;
}

function getNewNodes(array) {

  var nodes = [];
  for (var i = 0 ; i < array.length ; ++i) {
    var nextNode = array[i];

    if (nextNode.left && !contains(array, nextNode.left)) {
      nodes.push(nextNode.left);
    }

    if (nextNode.right && !contains(array, nextNode.right)) {
      nodes.push(nextNode.right);
    }
  }
  return nodes;
}

function contains(array, element) {
  return (array.indexOf(element) !== -1);
}

module.exports = arrays;