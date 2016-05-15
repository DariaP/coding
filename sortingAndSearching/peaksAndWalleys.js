function sort(array) {
	if (array[0] < array[1]) {
		swap(array, 0, 1);
	}

	for (var i = 1 ; i < (array.length - 1) ; ++i) {
		if (isPeakPos(i)) {
			swap(array, i, maxNeighbor(array, i));
		} else {
			swap(array, i, minNeighbor(array, i));
		}
	}
}

function maxNeighbor(array, i) {
	if (array[i] > array[i + 1]) {
		if (array[i] > array[i - 1]) {
			return i;
		} else {
			return i - 1;
		}
	} else {
		if (array[i + 1] > array[i - 1]) {
			return (i + 1);
		} else {
			return i - 1;
		}
	}
}

function minNeighbor(array, i) {
	if (array[i] < array[i + 1]) {
		if (array[i] < array[i - 1]) {
			return i;
		} else {
			return i - 1;
		}
	} else {
		if (array[i + 1] < array[i - 1]) {
			return (i + 1);
		} else {
			return i - 1;
		}
	}
}

function isPeakPos(i) {
	return (i % 2 == 0);
}

function isWalleyPos(i) {
	return (i % 2 == 1);
}

function swap(array, i , j) {
	var buff = array[i];
	array[i] = array[j];
	array[j] = buff;
}

module.exports = sort;