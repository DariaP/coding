var bitsInInt = 8,
	maxInt = Math.pow(2, bitsInInt) - 1;

function drawLine(screen, width, x1, x2, y) {
	var bytesForLine = width / bitsInInt,
	    startByteIdx = (y * bytesForLine) + Math.floor(x1 / bitsInInt),
	    endByteIdx = (y * bytesForLine) + Math.floor(x2 / bitsInInt)

	if (startByteIdx !== endByteIdx) {
		screen[startByteIdx] = set1sOnEnd(screen[startByteIdx], bitsInInt - x1 % bitsInInt);
		for (var i = (startByteIdx + 1) ; i < endByteIdx ; ++i) {
			screen[i] = maxInt;
		}
		screen[endByteIdx] = set1sOnBeginning(screen[endByteIdx], x2 % bitsInInt + 1);		
	} else {
		screen[startByteIdx] = set1sInTheMiddle(screen[startByteIdx], 
			x1 % bitsInInt,
			x2 % bitsInInt);
	}
}

function set1sOnEnd(number, numberOf1s) {
	var mask = maxInt >> (bitsInInt - numberOf1s);
	return number | mask;
}

function set1sOnBeginning(number, numberOf1s) {
	var mask = (maxInt >> (bitsInInt - numberOf1s)) << (bitsInInt - numberOf1s);
	return number | mask;
}

function set1sInTheMiddle(number, startIdx, endIdx) {
	var numOfBits = endIdx - startIdx + 1;
	var mask = (maxInt >> (bitsInInt - numOfBits)) << (bitsInInt - endIdx - 1);
	return number | mask;
}

module.exports = drawLine;