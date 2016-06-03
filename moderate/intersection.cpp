#include <iostream>

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

class Interval {
public:
	Point start;
	Point end;
	Interval(const Point &s, const Point &e) {
		start = s;
		end = e;
	}
};

class Straight {
public:
	double k, c;
	Straight(const Interval &i) {
		k = (i.end.x - i.start.x) / (i.end.y - i.start.y);
		c = i.start.x - i.start.y * k;
	}
	Point intersectsAt(const Straight &that) {
		double y = (c + that.c) / (k + that.k),
			   x = k * y + c;
	    Point p(x, y);
		return p;
	}
};

Point intersection(const Interval &i1, const Interval &i2) {
	Straight s1(i1), s2(i2);
	return s1.intersectsAt(s2);
}

int main(int argc, char** argv) {
	Point p1(1, 2), p2(3, 4),
	      p3(1, 3), p4(4, 4);
	Interval i1(p1, p2), i2(p3, p4);

	std::cout << intersection(i1, i2) << std::endl;
	return 0;
}
