function setOfStacks(capacity) {
  var stacks = [];
  function popAt(stackNum) {
    return stacks[stackNum].pop();
  };
  return {
    push: function (value) {
      if (stacks.length === 0 || stacks[stacks.length - 1].length === capacity) {
        stacks.push([]);
      }
      stacks[stacks.length - 1].push(value);
    },
    popAt: popAt,
    pop: function() {
      if (stacks[stacks.length - 1].length === 0) {
        stacks.pop();
      }
      return popAt(stacks.length - 1);
    }
  }
}

module.exports = setOfStacks;