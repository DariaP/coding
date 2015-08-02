function singlyLinkedList(values) {
  var head = null,
      tail = null,
      _size = 0;

  if(values) {
    initFromArray(values);
  }



  function initFromArray(values) {
    size = values.length;
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

  function nodeIterator(options) {
    var nextNode = null,
        initFlag = true,
        step = (options && options.step) ? options.step : 1;

    findNext();

    function next() {
      var prevNode = nextNode;
      findNext();
      return prevNode;
    }

    function makeStep() {
      if (initFlag) {
        initFlag = false;
        nextNode = (options && options.startNode) ? options.startNode : head;
      } else {
        if (nextNode) {
          nextNode = nextNode.next();
        }
      }
    }

    function findNext() {
      for (var i = 0 ; i < step ; ++i) {
        makeStep();
      }
    } 

    function hasNext() {
      return (nextNode !== null);
    }

    return {
      next: next,
      hasNext: hasNext
    }
  }

  function deleteNext(prevNode) {
    var deleted = prevNode.next();

    if (!inList(deleted)) {
      return;
    }

    if (deleted) {
      _size--;
      prevNode.setNext(prevNode.next().next());
      deleted.setNext(null);
    }
    if (deleted === tail) {
      tail = prevNode;
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
      _size--;
      deleted.setNext(null);
    }
    return deleted;
  }

  function addHeadNode(newHead) {
    newHead.setNext(head);
    head = newHead;
    if (tail === null) {
      tail = newHead;
    }
    _size++;
  }

  function append(list) {
    _size += list.size();
    //TODO: if tail is null,  test
    if (head === null) {
      head = list.getHead();
      tail = list.getTail();
    } else {
      tail.setNext(list.getHead());
      if (list.getTail() !== null) {
        tail = list.getTail();
      }      
    }
  }

  function inList(node) {
    var i = nodeIterator();
    while (i.hasNext()) {
      if (i.next() === node) {
        return true;
      }
    }
    return false;
  }

  function equals(list) {

    if (list.size() !== _size )
      return false;

    var iterator1 = iterator(),
        iterator2 = list.iterator();

    while (iterator1.hasNext()) {
      if (iterator1.next() !== iterator2.next()) {
        return false;
      }
    }

    return true;
  }

  return {
    add: add,
    addNode: addNode,
    node: node,
    addHeadNode: addHeadNode,

    append: append,

    deleteNext: deleteNext,
    deleteHead: deleteHead,

    forEach: forEach,
    forEachNode: forEachNode,

    toString: toString,

    iterator: iterator,

    nodeIterator: nodeIterator,

    size: function() { return _size; },
    getHead: function() { return head; },
    getTail: function() { return tail; },

    equals: equals
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