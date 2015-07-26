

function zeroMatrix(matrix) {

  if(Object.prototype.toString.call(matrix) !== '[object Array]') {
    throw "Invalid input (array of arrays expected)";
  }

  if(matrix.length > 0) {
    findZeroColsAndRows();
    setZeros();
  }

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
          matrix[0][j] = 0;
          matrix[i][0] = 0;
        }
      }
    }
  }

  function setZeros() {
    var i;

    for (i = 0 ; i < matrix[0].length ; ++i) {
      if (matrix[0][i] === 0) {
        fillColWithZeros(i);
      }
    }

    for (i = 0 ; i < matrix.length ; ++i) {
      if (matrix[i][0] === 0) {
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