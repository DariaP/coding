var threeStacks = require('../solutions/threeStacks.js'),
    test = require('tap').test;

test('it works with the same load', function(t) {
  var stacks = threeStacks([1,1,1,1,1,1,1,1,1]);
  stacks[1].push(1);
  stacks[1].push(2);
  stacks[1].push(3);
  stacks[2].push(4);
  stacks[2].push(5);
  stacks[2].push(6);
  stacks[3].push(7);
  stacks[3].push(8);
  stacks[3].push(9);

  t.equals(stacks[1].pop(),3);
  t.equals(stacks[1].pop(),2);
  t.equals(stacks[1].pop(),1);
  t.equals(stacks[2].pop(),6);
  t.equals(stacks[2].pop(),5);
  t.equals(stacks[2].pop(),4);
  t.equals(stacks[3].pop(),9);
  t.equals(stacks[3].pop(),8);
  t.equals(stacks[3].pop(),7);

  t.end();
})

test('it works when only first stack uses space', function(t) {
  var stacks = threeStacks([1,1,1,1,1,1,1,1,1]);
  stacks[1].push(1);
  stacks[1].push(2);
  stacks[1].push(3);
  stacks[1].push(4);
  stacks[1].push(5);
  stacks[1].push(6);
  stacks[1].push(7);
  stacks[1].push(8);
  stacks[1].push(9);

  t.equals(stacks[1].pop(),9);
  t.equals(stacks[1].pop(),8);
  t.equals(stacks[1].pop(),7);
  t.equals(stacks[1].pop(),6);
  t.equals(stacks[1].pop(),5);
  t.equals(stacks[1].pop(),4);
  t.equals(stacks[1].pop(),3);
  t.equals(stacks[1].pop(),2);
  t.equals(stacks[1].pop(),1);

  t.end();
})

test('it works when only second stack uses space', function(t) {
  var stacks = threeStacks([1,1,1,1,1,1,1,1,1]);
  stacks[2].push(1);
  stacks[2].push(2);
  stacks[2].push(3);
  stacks[2].push(4);
  stacks[2].push(5);
  stacks[2].push(6);
  stacks[2].push(7);
  stacks[2].push(8);
  stacks[2].push(9);

  t.equals(stacks[2].pop(),9);
  t.equals(stacks[2].pop(),8);
  t.equals(stacks[2].pop(),7);
  t.equals(stacks[2].pop(),6);
  t.equals(stacks[2].pop(),5);
  t.equals(stacks[2].pop(),4);
  t.equals(stacks[2].pop(),3);
  t.equals(stacks[2].pop(),2);
  t.equals(stacks[2].pop(),1);

  t.end();
})

test('it works when only third stack uses space', function(t) {
  var stacks = threeStacks([1,1,1,1,1,1,1,1,1]);
  stacks[3].push(1);
  stacks[3].push(2);
  stacks[3].push(3);
  stacks[3].push(4);
  stacks[3].push(5);
  stacks[3].push(6);
  stacks[3].push(7);
  stacks[3].push(8);
  stacks[3].push(9);

  t.equals(stacks[3].pop(),9);
  t.equals(stacks[3].pop(),8);
  t.equals(stacks[3].pop(),7);
  t.equals(stacks[3].pop(),6);
  t.equals(stacks[3].pop(),5);
  t.equals(stacks[3].pop(),4);
  t.equals(stacks[3].pop(),3);
  t.equals(stacks[3].pop(),2);
  t.equals(stacks[3].pop(),1);

  t.end();
})