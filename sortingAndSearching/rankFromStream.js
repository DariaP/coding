function rankTracker() {
	var tree = require('../utils/bst.js')();
	return {
		track: function(number) {
			tree.add(number);
		},

		trackAll: function(numbers) {
			numbers.forEach(function(number) {
				tree.add(number);
			})
		},

		rank: function(number) {
			var node = tree.getRoot(),
				rank = 0,
				exists = false;
			while (node) {
				if (node.value <= number) {
					if (node.value === number) {
						exists = true;
					}
					rank += (tree.subtreeSize(node.left) + 1);
					node = node.right;
				} else {
					node = node.left;
				}
			}
			return (exists) ? (rank - 1) : rank;
		}
	};
}

module.exports = rankTracker;