var list = require('../../utils/linkedList').singlyLinkedList;

function shelter() {

  var cat = 0,
      dog = 1;

  var animals = list(),
      beforeNextCat = null,
      nextCat = null,
      beforeNextDog = null,
      nextDog = null;

  function findNextDog() {

    beforeNextDog = null;
    nextDog = null;

    var iterator = animals.nodeIterator(),
        prevNode = null;

    while(iterator.hasNext()) {
      var node = iterator.next();
      if (node.value().type === dog) {
        beforeNextDog = prevNode;
        nextDog = node;
        break;
      } else {
        prevNode = node;
      }
    }
  }

  function findNextCat() {

    beforeNextCat = null;
    nextCat = null;

    var iterator = animals.nodeIterator(),
        prevNode = null;

    while(iterator.hasNext()) {
      var node = iterator.next();
      if (node.value().type === cat) {
        beforeNextCat = prevNode;
        nextCat = node;
        break;
      } else {
        prevNode = node;
      }
    }
  }


  return {
    enqueue: function(animal) {
      var animalNode = animals.node(animal);

      if (animal.type === cat && !nextCat) {
        beforeNextCat = animals.getTail();
        nextCat = animalNode;
      }
      if (animal.type === dog && !nextDog){
        beforeNextDog = animals.getTail();
        nextDog = animalNode;
      }
      animals.addNode(animalNode);
    },

    dequeueCat: function() {
      var result;
      if (nextCat) {
        if (nextCat === animals.getHead()) {
          result = animals.deleteHead().value();
        } else {
          result = animals.deleteNext(beforeNextCat).value();
        }
        findNextCat();
        return result;
      } else {
        return null;
      }
    },

    dequeue: function() {
      var node = animals.deleteHead();

      if (node) {
        var animal = node.value();
        if (animal.type === cat) {
          findNextCat();
        } else {
          findNextDog();
        }
        return animal;
      } else {
        return null;
      }
    },

    dequeueDog: function() {
      var result;
      if (nextDog) {
        if (nextDog === animals.getHead()) {
          result = animals.deleteHead().value();
        } else {
          result = animals.deleteNext(beforeNextDog).value();
        }
        findNextDog();
        return result;
      } else {
        return null;
      }
    },

    types: {
      dog: dog,
      cat: cat
    }

  };
}

module.exports = shelter;