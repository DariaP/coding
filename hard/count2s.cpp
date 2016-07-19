#include <iostream>
#include <cmath>
#define BOOST_TEST_MODULE Count2sTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int countDigits(int number)
{
    int digits = 0;
    while (0 != number) {
        number /= 10;
        digits++;
    }
    return digits;
}

int count(int n) {
	int ndigits = countDigits(n),
		n2s = 0,
		pow10 = 1;

	for (int i = 0 ; i < ndigits ; ++i) {

		n2s += pow10 * (n / (pow10 * 10));

		int remainder = n % (pow10 * 10);
		if (remainder / pow10 > 2) {
			n2s += pow10;
		} else if (remainder / pow10 == 2) {
			n2s += (remainder % pow10 + 1);
		}

		pow10 *= 10;
	}

	return n2s;
}

#define CHECK_COUNT2S(input, correctOutput) { \
	int output = count(input); \
	BOOST_CHECK_EQUAL(output, correctOutput); \
}


BOOST_AUTO_TEST_CASE( count_2s_tests ) {
	CHECK_COUNT2S(0, 0)
	CHECK_COUNT2S(2, 1)
	CHECK_COUNT2S(5, 1)
	CHECK_COUNT2S(10, 1)
	CHECK_COUNT2S(12, 2)
	CHECK_COUNT2S(13, 2)
	CHECK_COUNT2S(20, 3)
	CHECK_COUNT2S(21, 4)
	CHECK_COUNT2S(22, 6)
	CHECK_COUNT2S(23, 7)
	CHECK_COUNT2S(30, 13)
	CHECK_COUNT2S(32, 14)
	CHECK_COUNT2S(33, 14)
	CHECK_COUNT2S(40, 14)
	CHECK_COUNT2S(50, 15)
	CHECK_COUNT2S(100, 20)

}
