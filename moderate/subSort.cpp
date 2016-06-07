#include <iostream>
#define BOOST_TEST_MODULE SubSortTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

#include <vector>

std::pair<int,int> subSortIndices(std::vector<int> array) {
	int start = 0, end = array.size() - 1;

	do {
		start++;
	} while (start < array.size() && array[start - 1] < array[start]);

	if (start == array.size()) { // array is sorted
		std::pair<int,int> result;
		result.first = start;
		result.second = start;
		return result;
	}

	do {
		end--;
	} while (end > start && array[end] < array[end + 1]);

	for (int i = start ; i <= end ; ++i) {
		while(start > 0 && array[i] < array[start - 1]) {
			start--;
		}
	}

	for (int i = start ; i <= end ; ++i) {
		while(start > 0 && array[i] < array[start - 1]) {
			start--;
		}
	}

	for (int i = end ; i >= start ; --i) {
		while(array[i] > array[end + 1] && end < array.size() - 1) {
			end++;
		}
	}

	std::pair<int,int> result;
	result.first = start;
	result.second = end;
	return result;
}

#define CHECK_SUB_SORT(input, start, end) { \
	std::vector<int> array = input; \
	std::pair<int,int> result = subSortIndices(array); \
	BOOST_CHECK_EQUAL(result.first, start); \
	BOOST_CHECK_EQUAL(result.second, end); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( sub_sort_tests ) {
	CHECK_SUB_SORT(ARRAY_ARG_PROTECT({1, 2, 3, 4}), 4, 4)
	CHECK_SUB_SORT(ARRAY_ARG_PROTECT({1, 3, 2, 4}), 1, 2)
	CHECK_SUB_SORT(ARRAY_ARG_PROTECT({1, 4, 2, 3}), 1, 3)
	CHECK_SUB_SORT(ARRAY_ARG_PROTECT({3, 1, 2, 4}), 0, 2)

}
