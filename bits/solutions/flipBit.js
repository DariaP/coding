function findLength(num) {
	var lengths = countSubseqLengths(num);
	return findMaxPairSum(lengths);
}

function countSubseqLengths(num) {
	var subSeqLengths = [0],
		subSeqIdx = 0,
		i = 0;

	while (num !== 0) {
		var nextBit = bitAt(num, i);
		if (nextBit === 0) {
			//start counting length of the next subsequence
			++subSeqIdx;
			subSeqLengths[subSeqIdx] = 0;
		} else {
			subSeqLengths[subSeqIdx]++;
			num = set0(num, i);
		}
		i++;
	}

	return subSeqLengths;
}

function findMaxPairSum(lengths) {
	if (lengths.length === 1) {
		return (lengths[0] === 0) ? 1 : lengths[0];
	}

	var result = lengths[0] + 1 + lengths[1];
	for (var i = 1 ; (i + 1) < lengths.length ; ++i) {
		var nextSum = lengths[i] + 1 + lengths[i + 1];
		if (nextSum > result) {
			result = nextSum;
		}
	}

	return result;
}

function bitAt(num, pos) {
	var mask = 1 << pos;
	return (num & mask) >> pos;
}

function setBitAt(num, bit, pos) {
	var mask = bit << pos;
	return set0(num, pos) | mask;
}

function set1(num, pos) {
	var mask = 1 << pos;
	return (num | mask);	
}

function set0(num, pos) {
	var mask = ~(1 << pos);
	return (num & mask);	
}

module.exports = findLength;