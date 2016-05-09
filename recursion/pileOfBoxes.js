function maxPile(unsortedBoxes) {
	var partResults = [];

	var boxes = unsortedBoxes.sort(function(box1, box2) {
		return box2.height - box1.height;
	});

	for (var i = 0 ; i < boxes.length ; ++i) {
		var nextBox = boxes[i];
		partResults[i] = nextBox.height;

		for (var j = 0 ; j < i ; ++ j) {
			if (canFit(boxes[j], nextBox)) {
				if ((partResults[j] + nextBox.height) > partResults[i]) {
					partResults[i] = partResults[j] + nextBox.height;
				}
			}
		}
	}

	return Math.max.apply(this, partResults);
}

function canFit(box1, box2) {
	return box2.height < box1.height && 
		box2.length < box1.length &&
		box2.width < box1.width;
}

module.exports = maxPile;