#include <iostream>
#define BOOST_TEST_MODULE MaxTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int negate(int a) {
	if (a > 0) {
		int result = 0;
		for (int i = 0 ; i < a ; ++i) {
			result += -1;
		}
		return result;	
	} else {
		int result = 0;
		for (int i = a ; i < 0 ; ++i) {
			result++;
		}
		return result;	
	}
}

int mysub(int a, int b) {
	return a + negate(b);
}

int mymul(int a, int b) {
	bool negateRes = false,
		posA = a;
	if (a < 0) {
		posA = negate(a);
		negateRes = true;
	}

	int result = 0;
	for (int i = 0 ; i < posA ; ++i) {
		result += b;
	}

	return (negateRes) ? negate(result) : result;
}

int mydiv(int a, int b) {
	bool negateRes = false,
		posA = a,
		posB = b;

	if (a < 0) {
		posA = negate(a);
		negateRes = true;
	}
	if (b < 0) {
		posB = negate(b);
		negateRes = !negateRes;
	}

	int result = 0;
	while (posA > posB) {
		posA = mysub(posA, posB);
		result++;
	}

	return (negateRes) ? negate(result) : result;
}

BOOST_AUTO_TEST_CASE( max_tests )
{
	BOOST_CHECK_EQUAL(mysub(10, 5), 5);
	BOOST_CHECK_EQUAL(mysub(0, 5), -5);
	BOOST_CHECK_EQUAL(mysub(-10, 5), -15);
	BOOST_CHECK_EQUAL(mysub(-10, -5), 5);
	BOOST_CHECK_EQUAL(mysub(0, 0), 0);
	BOOST_CHECK_EQUAL(mysub(-10, -15), 5);

	BOOST_CHECK_EQUAL(mymul(10, 5), 50);
	BOOST_CHECK_EQUAL(mymul(-10, 5), -50);
	BOOST_CHECK_EQUAL(mymul(10, -5), -50);
	BOOST_CHECK_EQUAL(mymul(-10, -5), 50);
	BOOST_CHECK_EQUAL(mymul(2, 0), 0);
	BOOST_CHECK_EQUAL(mymul(0, 5), 0);
	BOOST_CHECK_EQUAL(mymul(1, 1), 1);

	BOOST_CHECK_EQUAL(mydiv(10, 5), 2);
	BOOST_CHECK_EQUAL(mydiv(9, 5), 1);
	BOOST_CHECK_EQUAL(mydiv(11, 5), 2);
	BOOST_CHECK_EQUAL(mydiv(-10, 5), -2);
	BOOST_CHECK_EQUAL(mydiv(9, -5), -1);
	BOOST_CHECK_EQUAL(mydiv(-11, -5), 2);
	BOOST_CHECK_EQUAL(mydiv(10, 5), 2);
	BOOST_CHECK_EQUAL(mydiv(2, 1), 2);
	BOOST_CHECK_EQUAL(mydiv(1, 1), 1);
	BOOST_CHECK_EQUAL(mydiv(0, 1), 0);
	BOOST_CHECK_EQUAL(mydiv(0, -2), 0);

}
