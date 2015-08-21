var circularArray = require('../../utils/circularArray.js');

function threeStacks(arraySize) {

  var array = circularArray(arraySize);

  var stack1start = 0,
      stack1capacity = arraySize / 3,
      stack2start = stack1start + stack1capacity,
      stack2capacity = arraySize / 3,
      stack3start = stack2start + stack2capacity,
      stack3capacity = arraySize - stack1capacity - stack2capacity;

  var stacks = circularArray(3);

  stacks.set(1, stack(array, stack1start, stack1capacity));
  stacks.set(2, stack(array, stack2start, stack2capacity));
  stacks.set(3, stack(array, stack3start, stack3capacity));

  function checkAndshift(stackNum) {
    var nextStackNum = stackNum + 1;
    do {
      var nextStack = stacks.get(nextStackNum);
      if (nextStack.canShift(1)) {
        shiftAllBetween(stackNum + 1, nextStackNum);
        stacks.get(stackNum).expand(1);
        stacks.get(nextStackNum).shrink(1);
        break;
      }
      nextStackNum = nextStackNum + 1;
    } while(nextStackNum !== stackNum);

    if (nextStackNum !== stackNum) {
      return true;
    } else {
      return false;
    }
  }

  function shiftAllBetween(start, end) {
    for (var i = end ; i >= start ; --i) {
      stacks.get(i).shift(1);
    }
  }

  return {
    push: function(stackNum, value) {
      if (stacks.get(stackNum).canPush()) {
        stacks.get(stackNum).push(value);
      } else {
        var result = checkAndshift(stackNum);
        if (result === false) {
          throw "Can't push: stack is full";
        } else {
          stacks.get(stackNum).push(value);
        }
      }
    },
    pop: function(stackNum) {
      return stacks.get(stackNum).pop();
    }
  }
}

function stack(array, initStart, initCapacity) {


  var start = initStart,
      end = initStart,
      capacity = initCapacity;

  function isFull() {
    return (end - start) >= capacity
  }

  return {

    canPush: function() {
      return !isFull();
    },

    push: function(value) {
      array.set(end++, value);
    },

    pop: function() {
      if ((end - start) !== 0) {
        return array.get(--end);
      } else {
        return null;
      }
    },

    expand: function(num) {
      capacity += num;
    },

    shrink: function(num) {
      capacity -= num;
    },

    canShift: function(offset) {
      return !isFull();
    },

    shift: function(offset) {
      for (var i = end - 1 ; i >= start ; --i) {
        array.set(i + offset, array.get(i));
      }
      start = start + offset;
      end = end + offset;
    }
  }
}

module.exports = threeStacks;