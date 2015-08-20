function threeStacks(array) {
  var stack1start = 0,
      stack1capacity = array.length / 3,
      stack2start = stack1start + stack1capacity,
      stack2capacity = array.length / 3,
      stack3start = stack2start + stack2capacity,
      stack3capacity = array.length - stack1capacity - stack2capacity;

  var stacks = [stack(array, stack1start, stack1capacity),
                stack(array, stack2start, stack2capacity),
                stack(array, stack3start, stack3capacity)];

  function checkAndshift(stackNum) {
    var nextStackNum = inc(stackNum);
    do {
      var nextStack = stacks[nextStackNum];
      if (nextStack.canShift(1)) {
        shiftAllBetween(stackNum + 1, nextStackNum);
        stacks[stackNum].expand(1);
        break;
      }
      nextStackNum = inc(nextStackNum);
    } while(nextStackNum !== stackNum);

    if (nextStackNum !== stackNum) {
      return true;
    } else {
      return false;
    }
  }

  function inc(i) {
    if ((i + 1) === stacks.length) return 0;
    else return (i + 1);
  }

  function shiftAllBetween(start, end) {
    for (var i = end ; i >= start ; --i) {
      stacks[i].shift(1);
    }
  }

  return {
    push: function(stackNum, value) {
      if (stacks[stackNum].canPush()) {
        stacks[stackNum].push(value);
      } else {
        var result = checkAndshift(stackNum);
        if (result === false) {
          throw "Can't push: stack is full";
        } else {
          stacks[stackNum].push(value);
        }
      }
    },
    pop: function(stackNum) {
      return stacks[stackNum].pop();
    }
  }
}

function stack(array, initStart, initCapacity) {
  var start = initStart,
      end = initStart,
      capacity = initCapacity,
      size = 0;

  return {
    canPush: function() {
      return start + capacity !== end;
    },
    push: function(value) {
      array[end] = value;
      if (end === array.length - 1) {
        end = 0;
      } else {
        end++;
      }
      size++;
    },
    pop: function() {
      if (size !== 0) {
        if (end === 0) {
          end = array.length - 1;
        } else {
          end--;
        }
        size--;
        return array[end];
      } else {
        return null;
      }
    },
    expand: function(num) {
      capacity += num;
    },
    canShift: function(offset) {
      return ((start + capacity + offset - 1) > end) ||
              (end < start && (array.length - start + end) < capacity  );
    },
    shift: function(offset) {
      for (var i = end ; i >= start ; --i) {
        array[i + offset] = array[i];
      }
      start = start + offset;
      end = end + offset;
    }
  }
}

module.exports = threeStacks;