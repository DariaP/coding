function pairwiseSwap(num) {
	var oddBits = getOddBits(num),
		evenBits = getOddBits(num << 1);

	return ((oddBits >> 1) | evenBits)
}

var mask = parseInt("AAAAAAAAAAAAA", 16);
function getOddBits(num) {
	return num & mask;
}

function bitAt(num, pos) {
	var mask = 1 << pos;
	return (num & mask);
}

module.exports = pairwiseSwap;