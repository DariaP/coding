

function zeroMatrix(matrix) {
  var cols = [], rows = [];

  if(Object.prototype.toString.call(matrix) !== '[object Array]') {
    throw "Invalid input (array of arrays expected)";
  }

  findZeroColsAndRows();
  setZeros();

  function findZeroColsAndRows() {
    for (var i = 0 ; i < matrix.length ; ++i) {

      var row = matrix[i];

      if(Object.prototype.toString.call(row) !== '[object Array]') {
        throw "Invalid input (array of arrays expected)";
      }

      if (row.length !== matrix[0].length) {
        throw "Invalid input (arrays of the same length expected)"
      }

      for (var j = 0 ; j < row.length ; ++j) {
        if (row[j] === 0) {
          cols[j] = true;
          rows[i] = true;
        }
      }
    }
  }

  function setZeros() {
    var i;

    for (i = 0 ; i < cols.length ; ++i) {
      if (cols[i]) {
        fillColWithZeros(i);
      }
    }

    for (i = 0 ; i < rows.length ; ++i) {
      if (cols[i]) {
        fillRowWithZeros(i);
      }
    }
  }

  function fillColWithZeros(colNum) {
    for (var i = 0 ; i < matrix.length ; ++i) {
      matrix[i][colNum] = 0;
    }
  }

  function fillRowWithZeros(rowNum) {
    for (var i = 0 ; i < matrix[rowNum].length ; ++i) {
      matrix[rowNum][i] = 0;
    }
  }

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
}

module.exports = zeroMatrix;