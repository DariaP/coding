var tree = require('../../utils/tree.js');

function makeTree(array) {

  var resultTree = tree();

  var queue = [{
    start: 0,
    end: array.length - 1
  }];

  while(queue.length !== 0) {

    var interval = queue.shift();

    if (interval.end < interval.start) {
      continue;
    }

    var median = Math.floor(interval.start + (interval.end - interval.start) / 2);

    resultTree.add(array[median]);

    queue.push({
      start: interval.start,
      end: median - 1
    });

    queue.push({
      start: median + 1,
      end: interval.end
    });
  }

  return resultTree;
}

module.exports = makeTree;