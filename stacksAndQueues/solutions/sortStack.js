function sortStack(stack) {
  sorted = sortAndMove(stack);
  move(sorted, stack);
}

function sortAndMove(stack) {
  var sortedStack = [];

  while (!stack.isEmpty()) {
    var next = stack.pop();

    var nMovedElements = moveLargerValues({
      from: sortedStack,
      to: stack,
      median: next
    });

    sortedStack.push(next);

    moveNValues({
      from: stack,
      to: sortedStack,
      number: nMovedElements
    });
  }

  return sortedStack;
}

function moveLargerValues(options) {
  var nMovedElements = 0;
  while (options.from.peek() > options.median && !options.from.isEmpty()) {
    options.to.push(options.from.pop());
    nMovedElements++;
  }
  return nMovedElements;
}

function moveNValues(options) {
  for (var i = 0; i < options.number; i++) {
    options.to.push(options.from.pop());  
  }
}

function move(from, to) {
  while (!from.isEmpty()) {
    to.push(from.pop());
  }
}

module.exports = sortStack;
