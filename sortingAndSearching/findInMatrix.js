function find(matrix, value) {
	var x = matrix.length - 1,
		y = matrix[0].length - 1;
	return findHelper(matrix, {x:0,y:0}, {x:x, y:y}, value);
}

function findHelper(matrix, start, end, value) {

	if(start.x > end.x || start.y > end.y) {
		return null;
	}


	var middle = {
		x: Math.floor((start.x + end.x) / 2),
		y: Math.floor((start.y + end.y) / 2)
	};

	if (matrix[middle.x][middle.y] === value) {
		return middle;
	} else {

		var res;
		if (matrix[middle.x][middle.y] < value) {
			res = findHelper(matrix, {
				x: middle.x + 1, 
				y: middle.y + 1},
				end, value);
			if (res) {
				return res;
			}				

			res = findHelper(matrix, {
				x: middle.x + 1,
				y: start.y
			}, {
				x: end.x,
				y: middle.y
			}, value);
			if (res) {
				return res;
			}

			res = findHelper(matrix, {
				x: start.x,
				y: middle.y + 1
			}, {
				x: middle.x,
				y: end.y
			}, value);
			if (res) {
				return res;
			}

		} else {
			res = findHelper(matrix, start, {
				x: middle.x - 1,
				y: middle.y - 1},
			 	value);
			if (res) {
				return res;
			}

			res = findHelper(matrix, {
				x: middle.x,
				y: start.y
			}, {
				x: end.x,
				y: middle.y - 1
			}, value);
			if (res) {
				return res;
			}

			res = findHelper(matrix, {
				x: start.x,
				y: middle.y
			}, {
				x: middle.x - 1,
				y: end.y
			}, value);
			if (res) {
				return res;
			}
		}


		return null;
	}
}

module.exports = find;