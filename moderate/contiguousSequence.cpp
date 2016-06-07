#include <iostream>
#include <vector>
#define BOOST_TEST_MODULE ContiguousSequenceTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class AlternatingSumsIterator {
	std::vector<int> values;
	int i, sum;

	bool sameSign(int x, int y)
	{
	    return (x >= 0) ^ (y < 0);
	}

	void findNext() {
		sum = values[i];
		while(i < values.size() - 1 && 
			sameSign(values[i + 1], values[i])) {
			sum += values[i + 1];
			i++;
		}
	}
public:
	AlternatingSumsIterator(std::vector<int> initValues) {
		values = initValues;
		i = 0;
		findNext();
	}

	bool hasNext() {
		return (i < values.size());
	}

	int next() {
		int result = sum;
		i++;
		findNext();
		return result;
	}
};

int contiguousSequence(std::vector<int> values) {
	int maxAdj = 0, maxSum = 0;
	AlternatingSumsIterator iterator(values);
	while (iterator.hasNext()){
		int nextValue = iterator.next();
		maxAdj = ((maxAdj + nextValue) > nextValue) ? (maxAdj + nextValue) : nextValue;
		maxSum = (maxAdj > maxSum) ? maxAdj : maxSum;
	}

	return maxSum;
}

#define CHECK_PATTERN_MATCHING(input, correctResult) { \
	std::vector<int> inputVector(input); \
	int result = contiguousSequence(input); \
	BOOST_CHECK_EQUAL(result, correctResult); }

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( contiguous_sequence_tests ) {
	CHECK_PATTERN_MATCHING(ARRAY_ARG_PROTECT({1, 2, 3, 4}), 10);
	CHECK_PATTERN_MATCHING(ARRAY_ARG_PROTECT({1, 2, 3, 4, -2, 1}), 10);
	CHECK_PATTERN_MATCHING(ARRAY_ARG_PROTECT({1, 2, 3, 4, -1, 2}), 11);
	CHECK_PATTERN_MATCHING(ARRAY_ARG_PROTECT({1, -3, 1, 2, 3, 4, -1, 2}), 11);
	CHECK_PATTERN_MATCHING(ARRAY_ARG_PROTECT({10, -3, 1, 2, 3, 4, -1, 2, -8, 1}), 18);
}
