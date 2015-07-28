function singlyLinkedList(values) {
  var head = null,
      tail = null;

  if(values) {
    values.forEach(function(value) {
      add(value);
    });
  }

  function forEach(callback) {
    for (var nextNode = head ; nextNode != null ; nextNode = nextNode.next()) {
      callback(nextNode);
    }
  }

  function toArray() {
    var array = [];
    forEach(function(node) {
      array.push(node);
    });
    return array;
  }

  function add(value) {
    var newNode = node(value);
    if (head) {
      tail.setNext(newNode);
    } else {
      head = newNode;
    }

    tail = newNode;
  }

  return {

    add: add,

    deleteNext: function(prevNode) {
      if (prevNode.next()) {
        prevNode.setNext(prevNode.next().next());
      }
    },

    forEach: forEach,

    toString: function() {
      return toArray().map(function(node) {
        return node.value();
      }).join();
    },

    iterator: function() {
      var nextNode = head;
      return {
        next: function() {
          var value = null;
          if (nextNode) {
            value = nextNode.value();
            nextNode = nextNode.next();
          }
          return value;
        },
        hasNext: function() {
          return (nextNode !== null);
        }
      }
    }
  }

}

function node(_value) {

  var _next = null;

  return {
    setNext: function(_newNextVal) {
      _next = _newNextVal;
    },
    next: function() {
      return _next;
    },
    value: function() {
      return _value;
    }
  };
}

module.exports = {
  singlyLinkedList: singlyLinkedList
}