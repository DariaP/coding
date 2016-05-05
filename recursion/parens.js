function allPermutations(n) {
	var results = [{
		s: "",
		lastOpen: -1
	}];

	for (var i = 0 ; i < n ; ++i) {
		var nextResults = [];
		results.forEach(function(result) {
			for (var pos = result.lastOpen + 1 ; pos <= result.s.length ; ++pos) {
				var nextResult = insert(result.s, "(", pos) + ")";
				nextResults.push({
					s: nextResult,
					lastOpen: pos
				});
			}
		})
		results = nextResults;
	}

	return results.map(function(result) {
		return result.s;
	});
}

function insert(string, char, pos) {
	return string.slice(0, pos) + char + string.slice(pos);
}
module.exports = allPermutations;