#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

class Pair {
public:
	int x, y;
	Pair(int _x = 0, int _y = 0) {
		x = _x;
		y = _y;
	}
};

std::ostream& operator<<(std::ostream& stream, const Pair& p) {
	stream << "(" << p.x << ", " << p.y << ")";
	return stream;
}

Pair smallestDiffPair(std::vector<int> v1, std::vector<int> v2) {
	std::sort (v1.begin(), v1.end());
	std::sort (v2.begin(), v2.end());

	int i1 = 0, i2 = 0;
	Pair result(v1[i1], v2[i2]);

	while (i1 < v1.size() || i2 < v2.size()) {
		if(std::abs(v1[i1] - v2[i2]) < std::abs(result.x - result.y)) {
			result.x = v1[i1];
			result.y = v2[i2];
		}

		if (v1[i1] > v2[i2] && i2 < v2.size()) {
			i2++;
		} else if (i1 < v1.size()) {
			i1++;
		} else {
			break;
		}
	}

	return result;
}

int main(int argc, char** argv) {
	std::vector<int> v1({1,5,19,3,22}), v2({6,7,4,80});
	std::cout << smallestDiffPair(v1, v2) << std::endl;
	return 0;
}