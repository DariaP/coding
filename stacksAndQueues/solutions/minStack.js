function minStack() {
  var values = [],
      mins = [];
  return {
    pop: function () {
      if (values.length !== 0) {
        mins.pop();
        return values.pop();
      } else {
        throw "Stack is empty";
      }
    },
    push: function (value) {
      if (mins.length === 0 || value < mins[mins.length - 1]) {
        mins.push(value);
      } else {
        mins.push(mins[mins.length - 1]);
      }
      values.push(value);
    },
    min: function() {
      if (mins.length !== 0) {
        return mins[mins.length - 1];
      } else {
        throw "Stack is empty";
      }
    }
  }
}

module.exports = minStack;