function singlyLinkedList(values) {
  var head = null,
      tail = null,
      _size = 0;

  if(values) {
    initFromArray(values);
  }



  function initFromArray(values) {
    values.forEach(function(value) {
      add(value);
    });
  }

  function forEachNode(callback) {
    for (var nextNode = head ; nextNode != null ; nextNode = nextNode.next()) {
      callback(nextNode);
    }
  }

  function forEach(callback) {
    forEachNode(function(node) {
      callback(node.value());
    });
  }

  function toArray() {
    var array = [];
    forEach(function(value) {
      array.push(value);
    });
    return array;
  }

  function add(value) {
    var newNode = node(value);
    addNode(newNode);
  }

  function addNode(newNode) {
    _size++;
    if (head) {
      tail.setNext(newNode);
    } else {
      head = newNode;
    }
    tail = newNode;
  }

  function toString() {
    return toArray().join();
  }

  function iterator() {
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

  function nodeIterator(startNode) {
    var nextNode = startNode ? startNode : head;
    return {
      next: function() {
        var prevNode = null;
        if (nextNode) {
          prevNode = nextNode;
          nextNode = nextNode.next();
        }
        return prevNode;
      },
      hasNext: function() {
        return (nextNode !== null);
      }
    }
  }

  function deleteNext(prevNode) {
    _size--;
    var deleted = prevNode.next();
    if (prevNode.next()) {
      prevNode.setNext(prevNode.next().next());
      deleted.setNext(null);
    }
    return deleted;
  }

  function deleteHead() {
    var deleted = head;
    if(tail === head) {
      tail = null;
      head = null;
    } else {
      head = head.next();
    }
    if(deleted) {
      deleted.setNext(null);
    }
    return deleted;
  }

  function append(list) {
    tail.setNext(list.getHead());
    tail = list.getTail();
  }

  return {
    add: add,
    addNode: addNode,
    node: node,

    append: append,

    deleteNext: deleteNext,
    deleteHead: deleteHead,

    forEach: forEach,

    toString: toString,

    iterator: iterator,

    nodeIterator: nodeIterator,

    size: function() { return _size; },
    getHead: function() { return head; },
    getTail: function() { return tail; }
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

singlyLinkedList.node = node;

module.exports = {
  singlyLinkedList: singlyLinkedList
}