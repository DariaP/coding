var shelter = require('../solutions/shelter.js'),
    test = require('tap').test;

test('dequeue', function(t) {
  var s = shelter();
  s.enqueue({
    type: s.types.dog,
    name: "Charlie"
  });

  s.enqueue({
    type: s.types.dog,
    name: "Max"
  });

  s.enqueue({
    type: s.types.cat,
    name: "Abigail"
  });

  t.deepEquals(s.dequeue(), {
    type: s.types.dog,
    name: "Charlie"
  });

  t.deepEquals(s.dequeue(), {
    type: s.types.dog,
    name: "Max"
  });

  t.deepEquals(s.dequeue(), {
    type: s.types.cat,
    name: "Abigail"
  });

  t.deepEquals(s.dequeue(), null);

  t.end();
});

test('dequeue dog', function(t) {
  var s = shelter();
  s.enqueue({
    type: s.types.dog,
    name: "Charlie"
  });

  s.enqueue({
    type: s.types.dog,
    name: "Max"
  });

  s.enqueue({
    type: s.types.cat,
    name: "Abigail"
  });

  t.deepEquals(s.dequeueDog(), {
    type: s.types.dog,
    name: "Charlie"
  });

  t.deepEquals(s.dequeueDog(), {
    type: s.types.dog,
    name: "Max"
  });

  t.deepEquals(s.dequeueDog(), null);

  t.end();
});

test('dequeue cat', function(t) {
  var s = shelter();
  s.enqueue({
    type: s.types.dog,
    name: "Charlie"
  });

  s.enqueue({
    type: s.types.dog,
    name: "Max"
  });

  s.enqueue({
    type: s.types.cat,
    name: "Abigail"
  });

  t.deepEquals(s.dequeueCat(), {
    type: s.types.cat,
    name: "Abigail"
  });

  t.deepEquals(s.dequeueCat(), null);

  t.end();
});

test('all together', function(t) {
  var s = shelter();

  s.enqueue({
    type: s.types.dog,
    name: "Charlie"
  });

  s.enqueue({
    type: s.types.dog,
    name: "Max"
  });

  s.enqueue({
    type: s.types.cat,
    name: "Abigail"
  });

  s.enqueue({
    type: s.types.cat,
    name: "Paco"
  });

  s.enqueue({
    type: s.types.cat,
    name: "Lana"
  });

  s.enqueue({
    type: s.types.dog,
    name: "Thor"
  });

  t.deepEquals(s.dequeue(), {
    type: s.types.dog,
    name: "Charlie"
  });

  t.deepEquals(s.dequeueDog(), {
    type: s.types.dog,
    name: "Max"
  });

  t.deepEquals(s.dequeueCat(), {
    type: s.types.cat,
    name: "Abigail"
  });

  t.deepEquals(s.dequeueDog(), {
    type: s.types.dog,
    name: "Thor"
  });

  t.deepEquals(s.dequeue(), {
    type: s.types.cat,
    name: "Paco"
  });

  t.deepEquals(s.dequeueCat(), {
    type: s.types.cat,
    name: "Lana"
  });

  t.deepEquals(s.dequeueCat(), null);

  t.end();
});
