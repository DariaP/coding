var test = require('tap').test,
  drawLine = require('../solutions/drawLine.js');

function dec(str) {
  return parseInt(str, 2);
}

test('it draws line in the middle', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 10, 26, 2);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10111111'), dec('11111111'), dec('11101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line in the first line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 10, 26, 0);

  t.deepEquals(screen, [
        dec('10111010'), dec('10111111'), dec('11111111'), dec('11101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line in the last line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 10, 26, 4);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10111111'), dec('11111111'), dec('11101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line across the whole screen', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 0, 39, 4);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('11111111'), dec('11111111'), dec('11111111'), dec('11111111'), dec('11111111')
      ]);
  t.end();
})

test('it draws line at the beginning of the last line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 0, 17, 4);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('11111111'), dec('11111111'), dec('11101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line at the beginning of the first line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 0, 17, 0);

  t.deepEquals(screen, [
        dec('11111111'), dec('11111111'), dec('11001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line at the end of the first line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 11, 39, 0);

  t.deepEquals(screen, [
        dec('10111010'), dec('10111111'), dec('11111111'), dec('11111111'), dec('11111111'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line at the end of the last line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 11, 39, 4);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10111111'), dec('11111111'), dec('11111111'), dec('11111111')
      ]);
  t.end();
})

test('it draws one pixel line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 5, 5, 1);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111110'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws one byte line', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 0, 7, 1);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('11111111'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line at the beginning of the byte', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10110010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 0, 4, 1);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('11111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line at the end of the byte', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10100010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 4, 7, 1);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10101111'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})

test('it draws line in the middle of the byte', function(t) {
  var screen = [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10100000'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ];

  drawLine(screen, 40, 4, 5, 1);

  t.deepEquals(screen, [
        dec('10111010'), dec('10101000'), dec('10001000'), dec('10101011'), dec('11110000'),
        dec('10101100'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000'),
        dec('10111010'), dec('10101000'), dec('10101000'), dec('10101011'), dec('11110000')
      ]);
  t.end();
})