var linkedList = require('../../utils/linkedList.js').singlyLinkedList;

function listOfDepths(graph) {

  var lists = [];

  graph.bfsDepth(0, function(node) {
    if (!lists[node.depth]) {
      lists[node.depth] = linkedList();
    }

    lists[node.depth].add(node.node);
  });

  return lists;
}

module.exports = listOfDepths;