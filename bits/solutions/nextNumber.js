function nextLargest(num) {

	if (0 === num) {
		return null;
	}

	var result = num,
		index = find01Set(num);

	result = set1(result, index);
	result = set0(result, index - 1);
	result = move1sToEnd(result, (index - 2));

	return result;
}

function find01Set(num) {
	var resultIdx = 1,
		foundSet = false;

	while (!foundSet) {
		if (0 === bitAt(num, resultIdx) &&
			1 === bitAt(num, resultIdx - 1)) {
			foundSet = true;
		} else {
			resultIdx++;
		}
	}

	return resultIdx;
}

function move1sToEnd(num, endIdx) {
	var numOf1s = count1s(num, endIdx),
		result = num;
	for (var i = 0 ; i <= endIdx ; ++i) {
		if (i < numOf1s) {
			result = set1(result, i);
		} else {
			result = set0(result, i);
		}
	}
	return result;
}

function count1s(num, endIdx) {
	var result = 0;
	for (var i = 0 ; i <= endIdx ; ++i) {
		if (1 === bitAt(num, i)) {
			result++;
		}
	}
	return result;
}

function nextSmallest(num) {
}

function bitAt(num, pos) {
	var mask = 1 << pos;
	return (num & mask) >> pos;
}

function set1(num, pos) {
	var mask = 1 << pos;
	return (num | mask);	
}

function set0(num, pos) {
	var mask = ~(1 << pos);
	return (num & mask);	
}

module.exports = {
	nextLargest: nextLargest,
	nextSmallest: nextSmallest
}