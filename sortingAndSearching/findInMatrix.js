function find(matrix, value) {

	var intervals = [{
		start: {
			x: 0,
			y: 0
		},
		end: {
			x: matrix.length - 1,
			y: matrix[0].length - 1
		}
	}];

	while (intervals.length !== 0) {
		var interval = intervals.pop(),
			start = interval.start,
			end = interval.end;

		if(start.x > end.x || start.y > end.y) {
			continue;
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

				intervals.push({
					start: {
						x: middle.x + 1, 
						y: middle.y + 1
					},
					end: end
				});

				intervals.push({
					start: {
						x: middle.x + 1,
						y: start.y
					},
					end: {
						x: end.x,
						y: middle.y						
					}
				});

				intervals.push({
					start: {
						x: start.x,
						y: middle.y + 1
					},
					end: {
						x: middle.x,
						y: end.y
					}
				});

			} else {

				intervals.push({
					start: start,
					end: {
						x: middle.x - 1,
						y: middle.y - 1						
					}
				});

				intervals.push({
					start: {
						x: start.x,
						y: middle.y
					},
					end: {
						x: middle.x - 1,
						y: end.y						
					}
				});

				intervals.push({
					start: {
						x: middle.x,
						y: start.y
					},
					end: {
						x: end.x,
						y: middle.y - 1
					}
				});
			}

		}
	}

	return null;
}

module.exports = find;