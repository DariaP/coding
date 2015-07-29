var singlyLinkedList = require('../../utils/linkedList').singlyLinkedList,
    test = require('tap').test,
    partition = require('../solutions/partition.js');

test('it partitions some list', function(t) {
  var list = singlyLinkedList([1, 9, 3, 7, 6]);
  partition(list, 4)
  t.equals(list.toString(), '1,3,9,7,6');
  t.end();
})
