function paintFill(picture, point, color) {
	var points = [point];

	while (points.length !== 0) {
		var nextPoint = points.pop();
		neighbors(nextPoint).forEach(function(neighbor) {
			if (picture.color(neighbor) === picture.color(nextPoint) &&
				picture.color(neighbor) !== color) {
				points.push(neighbor);
			}
		});
		picture.setColor(nextPoint, color);
	}

	function neighbors(point) {
		var offsets = [
			{x: -1, y: 0},
			{x: 1, y: 0},
			{x: 0, y: -1},
			{x: 0, y: 1}
		];

		var result = [];
		offsets.forEach(function(offset) {
			var neighbor = {
				x: point.x + offset.x,
				y: point.y + offset.y
			};
			if (neighbor.x >= 0 && neighbor.x < picture.size().x &&
				neighbor.y >= 0 && neighbor.y < picture.size().y) {
				result.push(neighbor);
			}
		});
		return result;
	}
}

module.exports = paintFill;