var linkedList = require('../../utils/linkedList.js').singlyLinkedList;

function listOfDepths(graph) {

  var lists = [];

  graph.bfs(function(node) {
    if (!lists[node.depth]) {
      lists[node.depth] = linkedList();
    }

    lists[node.depth].add(node.node);
  }, {
  	callbackData: 'depth'
  });

  return lists;
}

module.exports = listOfDepths;