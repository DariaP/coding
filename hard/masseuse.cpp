#include <iostream>
#include <vector>
#define BOOST_TEST_MODULE MasseuseTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>


int findMaxTime(std::vector<int> requests) {
	int prevBestTime_1 = 0, 
		prevBestTime_2 = 0,
		nextBestTime = 0;

	for (int nextRequest: requests) {
		nextBestTime = std::max(
			nextRequest + prevBestTime_2,
			prevBestTime_1);
		prevBestTime_2 = prevBestTime_1;
		prevBestTime_1 = nextBestTime;
	}

	return nextBestTime;
}


#define CHECK_MASSEUSE_APPOINTMENTS(requestsArray, expectedMinutes) { \
	std::vector<int> requests = requestsArray; \
	int actualMinutes = findMaxTime(requests); \
	BOOST_CHECK_EQUAL(actualMinutes, expectedMinutes); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( masseuse_tests ) {
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({30, 15, 60, 75, 45, 15, 15, 45}),
		180)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({30, 15, 60, 15, 45, 15, 45}),
		180)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({15, 30, 15, 60, 15, 45, 15, 45}),
		180)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({30, 15, 60, 15, 45, 15, 45, 15}),
		180)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({30}),
		30)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({30, 15}),
		30)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({15, 30}),
		30)
	CHECK_MASSEUSE_APPOINTMENTS(
		ARRAY_ARG_PROTECT({}),
		0)


}