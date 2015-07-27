var hashTable = require('../../utils/hashTable.js');

function removeDup(list) {
  var values = hashTable(),
      prevNode = null,
      toDelete = [];

  list.forEach(function(node) {
    if (values.has(node.value())) {
      // we can depend on the fact that 
      // head is never going to be deleted
      // and prevNode is always set at this point
      toDelete.push(prevNode);
    } else {
      values.put(node.value());
      prevNode = node;
    }
  });

  toDelete.forEach(function(node) {
    list.deleteNext(node);
  })
}

module.exports = removeDup;