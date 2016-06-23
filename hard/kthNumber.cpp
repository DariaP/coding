#include <iostream>
#include <queue>
#include <cmath>
#define BOOST_TEST_MODULE KthNumberTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int countNumber(int k) {
	std::priority_queue<int, std::vector<int>, std::greater<int>> mul3, mul5, mul7;

	int nextNumber = 1;
	mul3.push(1);
	mul5.push(1);
	mul7.push(1);

	for (int i = 1 ; i < k ; ++i) {
		int nextMul3 = mul3.top() * 3, 
			nextMul5 = mul5.top() * 5,
			nextMul7 = mul7.top() * 7;

		int min = std::min({nextMul3, nextMul5, nextMul7});

		if (nextMul3 == min) {
			mul3.pop();
		}
		if (nextMul5 == min) {
			mul5.pop();
		}
		if (nextMul7 == min) {
			mul7.pop();
		}

		mul3.push(min);
		mul5.push(min);
		mul7.push(min);

		nextNumber = min;
	}

	return nextNumber;
}

#define CHECK_KTH_NUMBER(k, correctNumber) { \
	int number = countNumber(k); \
	BOOST_CHECK_EQUAL(number, correctNumber); \
}


BOOST_AUTO_TEST_CASE( kth_number_tests ) {
	CHECK_KTH_NUMBER(1, 1)
	CHECK_KTH_NUMBER(2, 3)
	CHECK_KTH_NUMBER(3, 5)
	CHECK_KTH_NUMBER(4, 7)
	CHECK_KTH_NUMBER(5, 9)
	CHECK_KTH_NUMBER(6, 15)
	CHECK_KTH_NUMBER(7, 21)
	CHECK_KTH_NUMBER(8, 25)
	CHECK_KTH_NUMBER(9, 27)
	CHECK_KTH_NUMBER(10, 35)
	CHECK_KTH_NUMBER(11, 45)
	CHECK_KTH_NUMBER(12, 49)
	CHECK_KTH_NUMBER(13, 63)
}