function circularArray(size) {

  var array = [];

  return {
    indexesEqual: function(i1, i2) {
      return (i1 % size) === (i2 % size);
    },
    set: function(i, value) {
      array[i % size] = value;
    },
    get: function(i, value) {
      return array[i % size];
    }
  }
} 

module.exports = circularArray;