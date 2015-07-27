var removeDup = require('../solutions/removeDup.js'),
  test = require('tap').test,
  list = require('../../utils/linkedList.js').singlyLinkedList;

test('it works with small linked list, no duplicates', function(t) {
  var inputList = list();
  inputList.add(1);
  inputList.add(2);
  inputList.add(3);

  removeDup(inputList);

  t.equals(inputList.toString(), "1,2,3");
  t.end();
});

test('it works with small linked list that has duplicates', function(t) {
  var inputList = list();
  inputList.add(1);
  inputList.add(2);
  inputList.add(3);
  inputList.add(2);
  inputList.add(4);

  removeDup(inputList);

  t.equals(inputList.toString(), "1,2,3,4");
  t.end();
});

test('it works with empty list', function(t) {
  var inputList = list();

  removeDup(inputList);

  t.equals(inputList.toString(), "");
  t.end();
});

test('it works with linked list that has duplicates', function(t) {
  var inputList = list();
  inputList.add(1);
  inputList.add(1);
  inputList.add(3);
  inputList.add(2);
  inputList.add(4);

  removeDup(inputList);

  t.equals(inputList.toString(), "1,3,2,4");
  t.end();
});

test('it works with linked list that has duplicates', function(t) {
  var inputList = list();
  inputList.add(1);
  inputList.add(1);
  inputList.add(1);
  inputList.add(3);
  inputList.add(2);
  inputList.add(2);
  inputList.add(4);
  inputList.add(4);
  inputList.add(2);
  inputList.add(1);
  inputList.add(3);

  removeDup(inputList);

  t.equals(inputList.toString(), "1,3,2,4");
  t.end();
})

test('it works with linked list that has duplicates', function(t) {
  var inputList = list();
  inputList.add(1);
  inputList.add(2);
  inputList.add(3);
  inputList.add(4);
  inputList.add(4);
  inputList.add(4);
  inputList.add(4);
  inputList.add(4);
  inputList.add(4);

  removeDup(inputList);

  t.equals(inputList.toString(), "1,2,3,4");
  t.end();
})

test('it works with single element list', function(t) {
  var inputList = list();
  inputList.add(1);

  removeDup(inputList);

  t.equals(inputList.toString(), "1");
  t.end();
})

test('it works with single duplicated element list', function(t) {
  var inputList = list();
  inputList.add(1);
  inputList.add(1);
  inputList.add(1);
  inputList.add(1);
  inputList.add(1);

  removeDup(inputList);

  t.equals(inputList.toString(), "1");
  t.end();
})
