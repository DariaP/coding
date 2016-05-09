var paintFill = require('./paintFill.js');
var test = require('tap').test;

function arraysEqual(t, a1, a2) {
	t.deepEquals(a1.sort(), a2.sort());
}

function picture(x, y, colors) {
	return {
		size: function() {
			return {x: x, y: y};
		},
		setColor: function(point, color) {
			colors[point.y * x + point.x] = color;
		},
		color: function(point) {
			return colors[point.y * x + point.x];
		}
	}
}

test('fills entire picture', function(t) {
  var colors = [
  	1,1,1,1,
  	1,1,1,1,
  	1,1,1,1,
  	1,1,1,1
  ];
  paintFill(
  	picture(4, 4, colors), {
  		x: 1, y: 1
  	}, 2);
  arraysEqual(t, colors, [
  	2,2,2,2,
  	2,2,2,2,
  	2,2,2,2,
  	2,2,2,2
  ]);
  t.end();
});

test('fills one point', function(t) {
  var colors = [
  	1,1,1,1,
  	1,3,1,1,
  	1,1,1,1,
  	1,1,1,1
  ];
  paintFill(
  	picture(4, 4, colors), {
  		x: 1, y: 1
  	}, 2);
  arraysEqual(t, colors, [
  	1,1,1,1,
  	1,2,1,1,
  	1,1,1,1,
  	1,1,1,1
  ]);
  t.end();
});

test('fills arbitrary shape in the middle', function(t) {
  var colors = [
  	1,1,1,1,
  	1,3,3,1,
  	1,1,3,1,
  	1,1,1,1
  ];
  paintFill(
  	picture(4, 4, colors), {
  		x: 1, y: 1
  	}, 2);
  arraysEqual(t, colors, [
  	1,1,1,1,
  	1,2,2,1,
  	1,1,2,1,
  	1,1,1,1
  ]);
  t.end();
});

test('fills one at the edge', function(t) {
  var colors = [
  	3,1,1,1,
  	1,1,1,1,
  	1,1,1,1,
  	1,1,1,1
  ];
  paintFill(
  	picture(4, 4, colors), {
  		x: 0, y: 0
  	}, 2);
  arraysEqual(t, colors, [
  	2,1,1,1,
  	1,1,1,1,
  	1,1,1,1,
  	1,1,1,1
  ]);
  t.end();
});

test('fills arbitrary form at the edge', function(t) {
  var colors = [
  	3,3,1,1,
  	1,3,3,1,
  	1,3,3,1,
  	1,1,1,1
  ];
  paintFill(
  	picture(4, 4, colors), {
  		x: 0, y: 0
  	}, 2);
  arraysEqual(t, colors, [
  	2,2,1,1,
  	1,2,2,1,
  	1,2,2,1,
  	1,1,1,1
  ]);
  t.end();
});

test('fills picture of 1 px', function(t) {
  var colors = [1];
  paintFill(
  	picture(1, 1, colors), {
  		x: 0, y: 0
  	}, 2);
  arraysEqual(t, colors, [2]);
  t.end();
});
