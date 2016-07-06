#include <iostream>
#include <queue>
#include <vector>
#define BOOST_TEST_MODULE ContinuousMedianTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class ContinuousMedian {
	std::priority_queue<int> beforeMedian;
	std::priority_queue<int, std::vector<int>, std::greater<int>> afterMedian;
	int median;
	bool medianInitialized;

	void ensureMedianIsCorrect() {
		if (beforeMedian.size() == afterMedian.size() ||
			beforeMedian.size() + 1 == afterMedian.size())
		{
			return;
		} else if (beforeMedian.size() > afterMedian.size()) {
			afterMedian.push(median);
			median = beforeMedian.top();
			beforeMedian.pop();
		} else {
			beforeMedian.push(median);
			median = afterMedian.top();
			afterMedian.pop();			
		}
	}

public:
	ContinuousMedian() { medianInitialized = false; }

	void addNumber(int number) {
		if (!medianInitialized)
		{
			median = number;
			medianInitialized = true;
			return;
		}

		if (number <= median) {
			beforeMedian.push(number);
		} else {
			afterMedian.push(number);
		}

		ensureMedianIsCorrect();
	}

	int getMedian() {
		return median;
	}
};

#define CHECK_CONTINUOUS_MEDIAN(numbersArray, expectedMediansArray) { \
	ContinuousMedian median; \
	std::vector<int> numbers = numbersArray; \
	std::vector<int> expectedMedians = expectedMediansArray; \
	for (int i = 0 ; i < numbers.size() ; ++i) { \
		median.addNumber(numbers[i]); \
		int actualMedian = median.getMedian(); \
		BOOST_CHECK_EQUAL(actualMedian, expectedMedians[i]); \
	} \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( continuos_median_tests ) {
	CHECK_CONTINUOUS_MEDIAN(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 5}),
		ARRAY_ARG_PROTECT({1, 1, 2, 2, 3})
	)

	CHECK_CONTINUOUS_MEDIAN(
		ARRAY_ARG_PROTECT({5, 4, 3, 2, 1}),
		ARRAY_ARG_PROTECT({5, 4, 4, 3, 3})
	)

	CHECK_CONTINUOUS_MEDIAN(
		ARRAY_ARG_PROTECT({3, 2, 4, 1, 5}),
		ARRAY_ARG_PROTECT({3, 2, 3, 2, 3})
	)

}