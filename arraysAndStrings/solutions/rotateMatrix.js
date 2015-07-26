function rotate(matrix) {

  var numLayers = Math.floor(matrix.length / 2);
  for (var i = 0 ; i < numLayers ; ++i) {
    rotateLayer(matrix, i);
  }
}

function rotateLayer(matrix, layerNum) {
  // -1 because last element was alreaty rotated (during the first rotation)
  for (var i = 0 ; i < matrix.length - 2 * layerNum - 1 ; ++i) {
    rotateElement(matrix, layerNum, i);
  }
}

function rotateElement(matrix, layerNum, elementNum) {
  var first = {
    x: layerNum,
    y: layerNum + elementNum
  },
      second = {
    x: layerNum + elementNum,
    y: matrix.length - 1 - layerNum
  },
      third = {
    x: matrix.length - 1 - layerNum,
    y: matrix.length - 1 - (layerNum + elementNum)
  },
      forth = {
    x: matrix.length - 1 - (layerNum + elementNum),
    y: layerNum
  }

  var firstValue = value(first),
      secondValue = value(second),
      thirdValue = value(third),
      forthValue = value(forth);

  set(second, firstValue);
  set(third, secondValue);
  set(forth, thirdValue);
  set(first, forthValue);

  function set(position, value) {
    matrix[position.x][position.y] = value;
  }

  function value(position) {
    return matrix[position.x][position.y];
  }
}

module.exports = {
  rotateElement: rotateElement,
  rotateLayer: rotateLayer,
  rotate: rotate
};