#include <iostream>
#define BOOST_TEST_MODULE BisectSqauresTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

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

class Straight {
public:
	double k, c;
	Straight(const Point &p1, const Point &p2) {
		k = (p2.x - p1.x) / (p2.y - p1.y);
		c = p1.x - p1.y * k;
	}
	Straight(std::auto_ptr<Point> p1, std::auto_ptr<Point> p2) {
		k = (p2->x - p1->x) / (p2->y - p1->y);
		c = p1->x - p1->y * k;
	}

	friend std::ostream& operator<<(std::ostream& stream, const Straight &s);
};

std::ostream& operator<<(std::ostream& stream, const Straight &s) {
	stream << "x = " << s.k << " * y + " << s.c;
	return stream;
}


class Square {
public:
	Point topLeft;
	Point bottomRight;
	Square(const Point &_topLeft, const Point &_bottomRight) {
		topLeft = _topLeft;
		bottomRight = _bottomRight;
	}
	std::auto_ptr<Point> center() const {
		Point *c = new Point((topLeft.x + bottomRight.x) / 2, (topLeft.y + bottomRight.y) / 2);
		return std::auto_ptr<Point>(c);
	}
};

std::auto_ptr<Straight> bisectStraight(const Square& s1, const Square& s2) {
	return std::auto_ptr<Straight>(new Straight(s1.center(), s2.center()));
}

BOOST_AUTO_TEST_CASE( bisect_squares_tests )
{
	Point topLeft1(1,6),
		bottomRight1(5,0),
		topLeft2(7,12),
		bottomRight2(9,8);

	Square s1(topLeft1, bottomRight1),
		s2(topLeft2, bottomRight2);


	std::auto_ptr<Straight> resStraight = bisectStraight(s1, s2);
	std::cout << *resStraight << std::endl;

	BOOST_CHECK_EQUAL(1, 1);
}
