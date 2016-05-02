function permutations(string) {
	var charNums = countChars(string);

	var result = [""];
	for (var nextChar in charNums) {
		result = result.map(function(partPerm) {
			return insertAtEveryPosN(partPerm, nextChar, charNums[nextChar]);
		});
		result = mergeArrayOfArrays(result);
	}
	return result;
}

function countChars(str) {
	var chars = {};
	for(var i = 0 ; i < str.length ; ++i) {
		if (!chars[str.charAt(i)]) {
			chars[str.charAt(i)] = 0;
		}
		chars[str.charAt(i)]++;
	}
	return chars;
}

function mergeArrayOfArrays(array) {
	return [].concat.apply([], array);
}

function insertAtEveryPosN(string, char, n) {
	var results = [{
		s: string,
		lastPos: -1
	}];

	for (var i = 0 ; i < n ; ++i) {
		var newResults = results.map(function(result) {
			return insertAtEveryPos(result, char);
		});
		results = mergeArrayOfArrays(newResults);
	}

	return results.map(function(result) {return result.s});
}

function insertAtEveryPos(result, char) {
	var newResults = [];
	for (var i = result.lastPos + 1 ; i <= result.s.length ; ++i) {
		var nextString = result.s.slice(0, i) + char + result.s.slice(i);
		newResults.push({
			s: nextString,
			lastPos: i
		});
	}
	return newResults;
}

/*function insertAtEveryPos(string, char, start) {
	var result = [];
	for (var i = start ; i <= string.length ; ++i) {
		var nextResult = string.slice(0, i) + char + string.slice(i);
		result.push(nextResult);
	}
	return result;
}*/

module.exports = permutations;