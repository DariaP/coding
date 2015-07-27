function singlyLinkedList() {
  var head = null,
      tail = null;

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

  return {

    add: function(value) {
      var newNode = node(value);
      if (head) {
        tail.setNext(newNode);
      } else {
        head = newNode;
      }

      tail = newNode;
    },

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