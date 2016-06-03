#include <iostream>
#include <cmath>
#define BOOST_TEST_MODULE MaxTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>


int max(int a, int b) {
	return (std::abs(a - b) + (a + b)) / 2;
}

BOOST_AUTO_TEST_CASE( max_tests )
{
    BOOST_CHECK( max(1, 2) == 2 );
    BOOST_CHECK( max(2, 1) == 2 );
    BOOST_CHECK( max(-1, 10) == 10 );
    BOOST_CHECK( max(10, 10) == 10 );
    BOOST_CHECK( max(0, -19) == 0 );
}
