function count(expression, result) {
	var partResults = [];

	for (var i = 0 ; i < expression.length ; i = i + 2) {
		partResults[i] = [];
		// symbol of expression is 1 or 0 and it is also the
		// number of ways it evaluates to 1
		var symbol = parseInt(expression.charAt(i));
		partResults[i][1] = {
			trueCount: symbol,
			falseCount: (symbol === 0) ? 1 : 0
		}
	}

	for (var length = 3 ; length <= expression.length ; length = length + 2) {
		for (var i = 0 ; (i + length) <= expression.length ; i = i + 2) {
			partResults[i][length] = evaluateSubExpression(i, length, expression, partResults);
		}
	}

	return (result) ? 
		partResults[0][expression.length].trueCount : 
		partResults[0][expression.length].falseCount;
}

function evaluateSubExpression(start, length, expression, partResults) {

	var nextResult = {
		trueCount: 0,
		falseCount: 0
	};

	for (var part1length = 1 ; part1length < length ; part1length = part1length + 2) {
		var operator = expression.charAt(start + part1length),
			part2length = length - 1 - part1length,
			part1 = partResults[start][part1length],
			part2 = partResults[start + part1length + 1][part2length];

		var multiplier;
		if (part1length == 1) {
			multiplier = 1;
		} else {
			multiplier = 2;
		}

		switch (operator) {
			case "&":
				nextResult.trueCount += part1.trueCount * part2.trueCount * multiplier;
				nextResult.falseCount += (part1.falseCount * (part2.trueCount + part2.falseCount) + 
						part2.falseCount * (part1.trueCount + part1.falseCount)) * multiplier;
				break;
			case "|":
				nextResult.trueCount += (part1.trueCount * (part2.trueCount + part2.falseCount) + 
						part2.trueCount * (part1.trueCount + part1.falseCount)) * multiplier;
				nextResult.falseCount += part1.falseCount * part2.falseCount * multiplier;
				break;
			case "^":
				nextResult.trueCount += (part1.falseCount * part2.trueCount + 
						part1.trueCount * part2.falseCount) * multiplier;
				nextResult.falseCount += (part1.falseCount * part2.falseCount + 
						part1.trueCount * part2.trueCount) * multiplier;
				break;
		}
	}
	return nextResult;
}

module.exports = count;