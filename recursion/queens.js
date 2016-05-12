function count(size) {
	var subproblemsResults = {};

	return countSubproblem(size, 
		parseInt(Array(size).join("0"), 2), 
		parseInt(Array(size * 2 - 1).join("0"), 2), 
		parseInt(Array(size * 2 - 1).join("0"), 2));

	function countSubproblem(nQueens, rows, downDiagonals, upDiagonals) {
		
		if (nQueens === 0) {
			return 1;
		}

		if (!subproblemsResults[rows]) {
			subproblemsResults[rows] = {};
		}

		if(!subproblemsResults[rows][downDiagonals]) {
			subproblemsResults[rows][downDiagonals] = {};
		}
		
		if(!subproblemsResults[rows][downDiagonals][upDiagonals]) {
			var res = 0,
				iColumn = size - 1 - nQueens;

			for (var iRow = 0 ; iRow < 8 ; ++iRow) {

				var iDownDiagonal = iRow + iColumn,
					iUpDiagonal = (size - 1 - iColumn) + iRow;

				if(bitAt(rows, iRow) === 0 &&
				   bitAt(downDiagonals, iDownDiagonal) == 0 &&
				   bitAt(upDiagonals, iUpDiagonal) == 0) 
				{
					res += countSubproblem(nQueens - 1, 
						set1(rows, iRow),
						set1(downDiagonals, iDownDiagonal), 
						set1(upDiagonals, iUpDiagonal)
					);
				}
			}
			subproblemsResults[rows][downDiagonals][upDiagonals] = res;
		}
		return subproblemsResults[rows][downDiagonals][upDiagonals];
	}
}

function bitAt(num, pos) {
	var mask = 1 << pos;
	return (num & mask) >> pos;
}

function set1(num, pos) {
	var mask = 1 << pos;
	return (num | mask);	
}

console.log(count(8));