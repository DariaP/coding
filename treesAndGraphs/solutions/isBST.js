function isBST(bTree) {

	var result = true,
			prevValue = null;

	bTree.inOrder(function(node) {
		if (prevValue && node.value < prevValue) {
			result = false;
		}
		prevValue = node.value;
	})

	return result;
}

module.exports = isBST;