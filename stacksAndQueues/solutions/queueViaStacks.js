function queueViaStacks() {
  var stack1 = [], stack2 = [];

  function move(fromStack, toStack) {
    while (fromStack.length !== 0) {
      toStack.push(fromStack.pop());
    }
  }
  
  return {
    enqueue: function(value) {
      stack1.push(value);
    },
    dequeue: function() {
      var result = null;
      move(stack1, stack2);
      result = stack2.pop();
      move(stack2, stack1);
      return result;
    }
  };
};

module.exports = queueViaStacks;