var maxPile = require('./pileOfBoxes.js');
var test = require('tap').test;

test('works with one box', function(t) {
  var result = maxPile([
  	{
  		width: 10,
  		height: 3,
  		length: 5
  	}
  	]);
  t.equals(result, 3);
  t.end();
});

test('works with two boxes that can fit one onto another', function(t) {
  var result = maxPile([
  	{
  		width: 9,
  		height: 2,
  		length: 4
  	},
  	{
  		width: 10,
  		height: 3,
  		length: 5
  	}
  	]);
  t.equals(result, 5);
  t.end();
});

test('works with two boxes that cannot fit one onto another', function(t) {
  var result = maxPile([
  	{
  		width: 11,
  		height: 2,
  		length: 4
  	},
  	{
  		width: 10,
  		height: 3,
  		length: 5
  	}
  	]);
  t.equals(result, 3);
  t.end();
});

test('works with a set of boxes with two choices of the bottom box', function(t) {
  var result = maxPile([
  	{
  		width: 11,
  		height: 8,
  		length: 5
  	},
  	{
  		width: 10,
  		height: 7,
  		length: 6
  	},
  	{
  		width: 8,
  		height: 6,
  		length: 4
  	},
  	{
  		width: 7,
  		height: 5,
  		length: 3
  	},
   	{
  		width: 6,
  		height: 4,
  		length: 1
  	}
  	]);
  t.equals(result, 23);
  t.end();
});

test('works with a set of boxes with one possible pile', function(t) {
  var result = maxPile([
  	{
  		width: 11,
  		height: 2,
  		length: 5
  	},
  	{
  		width: 10,
  		height: 7,
  		length: 6
  	},
  	{
  		width: 8,
  		height: 6,
  		length: 4
  	},
  	{
  		width: 3,
  		height: 5,
  		length: 8
  	},
   	{
  		width: 6,
  		height: 4,
  		length: 1
  	}
  	]);
  t.equals(result, 17);
  t.end();
});

test('works with a set of boxes with two piles where taller one has fewer boxes', function(t) {
  var result = maxPile([
   	{
  		width: 6,
  		height: 9,
  		length: 1
  	},
  	{
  		width: 11,
  		height: 10,
  		length: 3
  	},
  	{
  		width: 10,
  		height: 7,
  		length: 6
  	},
  	{
  		width: 8,
  		height: 4,
  		length: 3
  	},
  	{
  		width: 3,
  		height: 3,
  		length: 2
  	},
  	]);
  t.equals(result, 19);
  t.end();
});