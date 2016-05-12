function search(array, value) {
	var start = 0, end = array.length - 1;

	while (start <= end) {
		var middle = Math.floor((start + end) / 2);
		if (value === array[middle]) {
			return middle;
		} else {
			if (value > array[end] || value < array[middle]) {
				end = middle - 1;
			} else {
				start = middle + 1;
			}
		}
	}
	
	return -1;
}

module.exports = search;