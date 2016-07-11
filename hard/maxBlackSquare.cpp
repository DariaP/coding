#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE MaxBlackSquareTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

typedef int Color;
#define BLACK 0

class Square {
public:
  int topX, leftY, size;
  Square() {
    topX = 0;
    leftY = 0;
    size = 0;
  }

  Square(int initTopX, int initLeftY, int initSize) {
    size = initSize;
    topX = initTopX;
    leftY = initLeftY;
  }

  bool operator==(const Square &another) const {
    return topX == another.topX &&
      leftY == another.leftY &&
      size == another.size;
  }
};

class SegmentLengths {

  class Lengths {
  public:
    int horizontal, vertical;
    Lengths(int initHorizontal = 0, int initVertical = 0) {
      horizontal = initHorizontal;
      vertical = initVertical;
    }
  };

  std::vector<std::vector<Lengths>> lengths;

public:
  SegmentLengths(int size, Color firstPoint):
    lengths(size, std::vector<Lengths>(size))
  {
    if (firstPoint == BLACK) {
      lengths[0][0] = Lengths(1, 1);
    }
  }

  void computeLengths(int x, int y, Color color) {
    if (color == BLACK) {
      lengths[x][y].horizontal = (y > 0) ? lengths[x][y - 1].horizontal + 1 : 1;
      lengths[x][y].vertical = (x > 0) ? lengths[x - 1][y].vertical + 1 : 1;
    }
  }

  int maxSquareSize(int bottomX, int rightY) {
    return std::min(lengths[bottomX][rightY].vertical,
      lengths[bottomX][rightY].horizontal);
  }

  bool isSquare(int bottomX, int rightY, int size) {
    Lengths leftBottom = lengths[bottomX][rightY - size + 1],
      rightTop = lengths[bottomX - size + 1][rightY];

    return leftBottom.vertical >= size && rightTop.horizontal >= size;
  }
};

SegmentLengths computeAllLengths(std::vector<std::vector<Color>> &points) {
  SegmentLengths segmentLengths(points.size(), points[0][0]);

  for (int i = 1 ; i < points.size() ; ++i) {
    for (int x = 0 ; x < i ; ++x) {
      segmentLengths.computeLengths(x, i, points[x][i]);
    }

    for (int y = 0 ; y <= i ; ++y) {
      segmentLengths.computeLengths(i, y, points[i][y]);
    }
  }

  return segmentLengths;
}

Square findMaxBlackSquare (std::vector<std::vector<Color>> points) {

  if (points.size() == 0) {
      return Square();
  }

  SegmentLengths segmentLengths = computeAllLengths(points);
  Square maxSquare;

  for (int x = 0 ; x < points.size() ; ++x) {
    for (int y = 0 ; y < points.size() ; ++y) {

      int maxSquareSize = segmentLengths.maxSquareSize(x, y);

      for (int size = maxSquareSize ; size > maxSquare.size ; --size) {
        if (segmentLengths.isSquare(x, y, size)) {
          maxSquare = Square(x - size + 1, y - size + 1, size);
        }
      }
    }
  }

  return maxSquare;
}

namespace std {
    ostream& operator<<(ostream &stream, const Square &square) {
      stream << "top: (" <<
        square.topX << ", " << square.leftY <<
        "), size: " << square.size << std::endl;
      return stream;
    }
}

#define CHECK_MAX_BLACK_SQUARE(pointsArray, expectedTop, expectedLeft, expectedSize) { \
    std::vector<std::vector<Color>> points = pointsArray; \
    Square actualSquare = findMaxBlackSquare(points); \
    Square expectedSquare = Square(expectedTop, expectedLeft, expectedSize); \
    BOOST_CHECK_EQUAL(actualSquare, expectedSquare); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( max_black_square_tests ) {

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {1, 0, 0},
    {1, 0, 0},
    {1, 1, 1}
  }),
    0, 1, 2
  )

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {1, 0, 0},
    {0, 0, 1},
    {0, 0, 1}
  }),
    1, 0, 2
  )

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {0, 0, 0},
    {0, 1, 0},
    {0, 0, 0}
  }),
    0, 0, 3
  )

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {0, 0, 0},
    {0, 0, 0},
    {0, 0, 0}
  }),
    0, 0, 3
  )

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {0, 0, 1, 1},
    {0, 0, 0, 0},
    {1, 0, 1, 0},
    {1, 0, 0, 0}
  }),
    1, 1, 3
  )

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {0, 0, 1, 1},
    {0, 1, 0, 1},
    {1, 0, 0, 0},
    {0, 0, 0, 0}
  }),
    2, 1, 2
  )

  CHECK_MAX_BLACK_SQUARE(ARRAY_ARG_PROTECT({
    {0, 1},
    {1, 1}
  }),
    0, 0, 1
  )

  CHECK_MAX_BLACK_SQUARE({{0}}, 0, 0, 1)

  CHECK_MAX_BLACK_SQUARE({{1}}, 0, 0, 0)

  CHECK_MAX_BLACK_SQUARE({}, 0, 0, 0)

}
