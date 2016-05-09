var coinValues = [1, 5, 10, 25];

function count(value) {
	var partResults = {};
	coinValues.forEach(function(coinValue) {
		partResults[coinValue] = [];
	});

	return countHelper(value, coinValues.length - 1);

	function countHelper(value, maxCoinIdx) {
		var maxCoin = coinValues[maxCoinIdx];
//console.log(partResults);
//console.log(maxCoin);
		if (!partResults[maxCoin][value]) {
			if (maxCoin === 1) {
				partResults[maxCoin][value] = 1;
			} else {
				partResults[maxCoin][value] = 0;
				var maxNumMaxCoin = Math.floor(value / maxCoin);
				for (var numMaxCoin = maxNumMaxCoin ; numMaxCoin >= 0 ; numMaxCoin--) {
					partResults[maxCoin][value] += countHelper(
						value - numMaxCoin * maxCoin, 
						maxCoinIdx - 1
					);
				}
			}
		}
		return partResults[maxCoin][value];
	}
}

module.exports = count;