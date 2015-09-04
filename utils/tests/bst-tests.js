var test = require('tap').test,
    createTree = require('../../utils/bst.js');

test('find', function(t) {
  var tree = createTree();
  tree.add(4);
  tree.add(2);
  tree.add(1);
  tree.add(3);
  tree.add(6);
  tree.add(5);
  tree.add(7);

  t.equals(tree.find(8), null);
  t.equals(tree.find(4).value, 4);
  t.equals(tree.find(3).value, 3);
  t.equals(tree.find(7).value, 7);

  t.end();
});
