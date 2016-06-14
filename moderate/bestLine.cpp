#include <iostream>
#include <cstdlib>
#include <vector>
#include <unordered_map>
#define BOOST_TEST_MODULE BestLineTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

const double delta = 0.0001;

class Point {
public:
	double x;
	double y;
	Point() {
		x = 0; y = 0;
	}
	Point(double _x, double _y) {
		x = _x;
		y = _y;
	}
	Point(double *values) {
		x = values[0];
		y = values[1];
	}
	Point(const Point &p) {
		x = p.x;
		y = p.y;
	}

	friend std::ostream& operator<<(std::ostream& stream, const Point &p);
};

std::ostream& operator<<(std::ostream& stream, const Point &p) {
	stream << "(" << p.x << ", " << p.y << ")";
	return stream;
}

class Line {
public:
	double a, b, c;
	Line(const Point &p1, const Point &p2) {
		a = p2.y - p1.y;
		b = -1 * (p2.x - p1.x);
		c = a * p1.x + b * p1.y;

		if (a != 0) {
			a = 1;
			b = b / a;
			c = c / a;
		} else {
			b = 1;
			c = c / b;
		}
	}

	Line(double values[]) {
		a = values[0];
		b = values[1];
		c = values[2];
	}

	bool operator==(const Line& anotherLine) const { 
		return std::abs(a - anotherLine.a) < delta &&
			std::abs(b - anotherLine.b) < delta &&
			std::abs(c - anotherLine.c) < delta;
	}

	friend std::ostream& operator<<(std::ostream& stream, const Line &s);
};

namespace std {
  template <> struct hash<Line>
  {
    size_t operator()(const Line &line) const
    {
    	return (size_t)line.a << (sizeof(size_t) / 3) &
    		(size_t)line.b << (2 * sizeof(size_t) / 3) &
    		(size_t)line.c;
    }
  };
}

std::ostream& operator<<(std::ostream& stream, const Line &s) {
	stream << s.a << " * x + " << s.b << " * y = " << s.c;
	return stream;
}

class Lines {
	std::unordered_map<Line, int> lines;
	const Line *bestLine = nullptr;

public:
	Lines() {}

	void addLine(Line &line) {
		auto it = lines.find(line);

		if (it == lines.end()) {
			lines[line] = 2;

			if(nullptr == bestLine) {
				bestLine = &(lines.find(line)->first);
			}

		} else {
			it->second++;

			if (lines.at(*bestLine) < it->second) {
				bestLine = &(it->first);
			}
		}
	}

	Line getBestLine() {
		return *bestLine;
	}

};

Line bestLine(std::vector<Point> points) {
	Lines lines;

	for (int i = 0 ; i < points.size() ; ++i) {
		for (int j = (i + 1) ; j < points.size() ; ++j) {
			Line nextLine(points.at(i), points.at(j));
			lines.addLine(nextLine);
		}
	}

	return lines.getBestLine();
}

#define CHECK_BEST_LINE(input, correctResultValues) { \
	std::vector<Point> inputVector = input; \
	Line result = bestLine(inputVector); \
	double correctResultValuesArr[] = correctResultValues; \
	Line correctResult(correctResultValuesArr); \
	BOOST_CHECK_EQUAL(result, correctResult); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( best_line_tests )
{
	CHECK_BEST_LINE(ARRAY_ARG_PROTECT({{1, 1}, {2, 2}, {3, 3}, {1, 3}}), 
		ARRAY_ARG_PROTECT({1, -1 , 0}));

	CHECK_BEST_LINE(ARRAY_ARG_PROTECT({{1, 1}, {2, 2}}), 
		ARRAY_ARG_PROTECT({1, -1 , 0}));

	CHECK_BEST_LINE(ARRAY_ARG_PROTECT({{1, 1}, {2, 2}, {3, 3}, {1, 2}, {2, 3}, {3, 4}, {4, 5}}), 
		ARRAY_ARG_PROTECT({1, -1, -1}));

	CHECK_BEST_LINE(ARRAY_ARG_PROTECT({{1, 2}, {2, 3}, {1, 1}, {2, 2}, {3, 3}, {3, 4}, {4, 5}}), 
		ARRAY_ARG_PROTECT({1, -1, -1}));

	CHECK_BEST_LINE(ARRAY_ARG_PROTECT({{1, 0}, {2, 0}, {3, 0}, {1, 3}}), 
		ARRAY_ARG_PROTECT({0, 1 , 0}));

	CHECK_BEST_LINE(ARRAY_ARG_PROTECT({{0, 1}, {0, 2}, {0, 3}, {1, 3}}), 
		ARRAY_ARG_PROTECT({1, 0 , 0}));

}
