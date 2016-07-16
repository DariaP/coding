#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE MaxSubmatrixTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

#define NULL_SUBMATRIX_BORDER -1

class Submatrix {
public:
  int topX, bottomX, leftY, rightY, sum;
  Submatrix(
    int initSum = 0,
    int initTopX = NULL_SUBMATRIX_BORDER,
    int initBottomX = NULL_SUBMATRIX_BORDER,
    int initLeftY = NULL_SUBMATRIX_BORDER,
    int initRightY = NULL_SUBMATRIX_BORDER)
  {
    sum = initSum;
    topX = initTopX;
    leftY = initLeftY;
    bottomX = initBottomX;
    rightY = initRightY;
  }

  bool operator==(const Submatrix &another) const {
    return sum == another.sum &&
      topX == another.topX &&
      bottomX == another.bottomX &&
      leftY == another.leftY &&
      rightY == another.rightY;
  }
};

namespace std {
  ostream& operator<< (ostream& stream, const Submatrix &smatrix) {
    stream << "{" << smatrix.topX << ", " << smatrix.leftY << "}-"
      << "{" << smatrix.bottomX << ", " << smatrix.rightY << "}: "
      << smatrix.sum;
    return stream;
  }
}

Submatrix findMaxSubmatrix(std::vector<std::vector<int>> matrix) {

  Submatrix maxSubmatrix(matrix[0][0], 0, 0, 0, 0);

  std::vector<std::vector<Submatrix>> prevMaxSumsOfWidth (matrix.size(),
    std::vector<Submatrix> (matrix.size()));

  for (int x = 0 ; x < matrix.size() ; ++x) {

      std::vector<std::vector<Submatrix>> maxSumsOfWidth (matrix.size(),
        std::vector<Submatrix>(matrix.size()));

      for (int y = 0 ; y < matrix.size() ; ++y) {
        int rowSum = 0;

        for (int width = 0 ; width <= y ; ++width) {
          rowSum += matrix[x][y - width];

          int submatrixSum = prevMaxSumsOfWidth[y][width].sum + rowSum;

          if (submatrixSum > 0) {
            maxSumsOfWidth[y][width] = Submatrix(submatrixSum,
              (prevMaxSumsOfWidth[y][width].topX == NULL_SUBMATRIX_BORDER) ? x : prevMaxSumsOfWidth[y][width].topX,
              x,
              y - width,
              y);
          } else {
            maxSumsOfWidth[y][width] = Submatrix(0);
          }

          if (maxSumsOfWidth[y][width].sum > maxSubmatrix.sum) {
            maxSubmatrix = maxSumsOfWidth[y][width];
          }
        }
      }

      prevMaxSumsOfWidth = maxSumsOfWidth;

  }

  return maxSubmatrix;
}

#define CHECK_MAX_SUBMATRIX(matrixValues, expectedSubmatrixValues) { \
    std::vector<std::vector<int>> matrix = matrixValues; \
    Submatrix expectedSubmatrix(expectedSubmatrixValues); \
    auto actualSubmatrix = findMaxSubmatrix(matrix); \
    BOOST_CHECK_EQUAL(expectedSubmatrix, actualSubmatrix); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( max_submatrix_tests ) {
  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {-1, -1, -1},
    { 1, -1, -1},
    {-1, -1, -1}
  }),
  ARRAY_ARG_PROTECT(1, 1, 1, 0, 0));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {1, 1, 1},
    {1, 1, 1},
    {1, 1, 1}
  }),
  ARRAY_ARG_PROTECT(9, 0, 2, 0, 2));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {1}
  }), ARRAY_ARG_PROTECT(1, 0, 0, 0, 0));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {-1}
  }), ARRAY_ARG_PROTECT(0, -1, -1, -1, -1));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {-2, 8},
    { 1, 9}
  }), ARRAY_ARG_PROTECT(17, 0, 1, 1, 1));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {-1, 8},
    { 2, 9}
  }), ARRAY_ARG_PROTECT(18, 0, 1, 0, 1));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {9, -1},
    {-1, 9}
  }), ARRAY_ARG_PROTECT(16, 0, 1, 0, 1));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {9, -1},
    {-10, 9}
  }), ARRAY_ARG_PROTECT(9, 0, 0, 0, 0));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {1,  8},
    {9, -10}
  }), ARRAY_ARG_PROTECT(10, 0, 1, 0, 0));

  CHECK_MAX_SUBMATRIX(ARRAY_ARG_PROTECT({
    {-1, -1,  1},
    { 3,  4, -1},
    {-1,  1,  1}
  }),
  ARRAY_ARG_PROTECT(7, 1, 1, 0, 1));

}
