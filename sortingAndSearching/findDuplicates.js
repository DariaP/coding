var maxNumber = 32000;

function findDuplicates(array) {
	var map = bitMap(maxNumber),
		result = [];

	for (var i = 0 ; i < array.length ; ++i) {
		if (map.has(array[i])) {
			result.push(array[i]);
		} else {
			map.set(array[i]);
		}
	}

	return result;
}

function bitMap(maxNumber) {
	var mapElementSize = 8,
	    size = Math.ceil(maxNumber / mapElementSize),
		map = new Uint8Array(size);

	for (var i = 0 ; i < size ; ++i) {
		map[i] = 0;
	}

	function bitAt(num, pos) {
		var mask = 1 << pos;
		return (num & mask) >> pos;
	}

	function set1(num, pos) {
		var mask = 1 << pos;
		return (num | mask);	
	}

	return {
		set: function(number) {
			var byteNum = Math.floor(number / mapElementSize),
				bitNum = number % mapElementSize;

			map[byteNum] = set1(map[byteNum], bitNum);
		},
		has: function(number) {
			var byteNum = Math.floor(number / mapElementSize),
				bitNum = number % mapElementSize;

			return (bitAt(map[byteNum], bitNum) === 1);
		}
	}
}

module.exports = findDuplicates;