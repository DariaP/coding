var compress = require('../solutions/compress.js'),
    test = require('tap').test;

test('it works with empty string', function(t) {
	var result = compress('');
	t.equals(result, '');
	t.end();
});

test('it returns original string if it is shorter then compressed', function(t) {
	var result = compress('ab');
	t.equals(result, 'ab');
	t.end();
});

test('it returns original string if it is shorter then compressed', function(t) {
	var result = compress('aaabcbcb');
	t.equals(result, 'aaabcbcb');
	t.end();
});

test('it returns original string if it is same length as compressed', function(t) {
	var result = compress('aa');
	t.equals(result, 'aa');
	t.end();
});

test('it returns compressed string if it is shorter then original', function(t) {
	var result = compress('aaa');
	t.equals(result, 'a3');
	t.end();
});

test('it compresses more complicated string', function(t) {
	var result = compress('aaabbnMmhrrroiasllllllllllllllll');
	t.equals(result, 'a3b2n1M1m1h1r3o1i1a1s1l16');
	t.end();
});

test('it throws exception if input is not a string', function(t) {
	var call = function() {
		compress(234);
	};
	t.throws(call, "Invalid input (string expected)");
});

test('it throws exception if string has characters except letters', function(t) {
	var call = function() {
		compress('aaa3r');
	};
	t.throws(call, "Invalid input (string of chars a-zA-Z expected)");
});