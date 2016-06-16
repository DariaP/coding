#include <iostream>
#include <vector>
#define BOOST_TEST_MODULE MissingNumberTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

enum Bit {
	ZERO = 0,
	ONE = 1
};

Bit bitAt(int number, unsigned int bitIdx) {
	int mask = 1 << bitIdx;
	return (Bit)((number & mask) >> bitIdx);
}

class BitAccessArray {
	std::vector<int> values;

public:
	BitAccessArray(std::vector<int> &initValues) :values(initValues) {}

	Bit get(unsigned int numIdx, unsigned int bitIdx) {
		return bitAt(values[numIdx], bitIdx);
	}

	unsigned int size() {
		return values.size();
	}
};

int findMissingNumber(BitAccessArray &values) {
	int n = values.size(),
		result = 0;

	unsigned int nBits = sizeof(int) * 8;
	int actualBitCounts[nBits],
		allNumbersBitCounts[nBits];

	for (int i = 0 ; i < nBits ; ++i) {
		actualBitCounts[i] = 0;
		allNumbersBitCounts[i] = 0;
	}

	for (int i = 0 ; i < n ; ++i) {
		for (int j = 0 ; j < nBits ; ++j) {
			allNumbersBitCounts[j] += (bitAt(i, j) == Bit::ONE) ? 1 : 0;
			actualBitCounts[j] += (values.get(i, j) == Bit::ONE) ? 1 : 0;
		}
	}
	for (int j = 0 ; j < nBits ; ++j) {
		allNumbersBitCounts[j] += (bitAt(n, j) == Bit::ONE) ? 1 : 0;
	}

	for (int i = nBits - 1 ; i >= 0 ; --i) {
		result = result * 2 + (allNumbersBitCounts[i] - actualBitCounts[i]);
	}

	return result;
}

#define CHECK_MISSING_NUMBER(input, correctResult) { \
	std::vector<int> inputVector = input; \
	BitAccessArray bitAccessArray(inputVector); \
	int result = findMissingNumber(bitAccessArray); \
	BOOST_CHECK_EQUAL(result, correctResult); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( missing_number_tests ) {
	CHECK_MISSING_NUMBER(
		ARRAY_ARG_PROTECT({0, 1, 3, 4, 5, 6}), 2)

	CHECK_MISSING_NUMBER(
		ARRAY_ARG_PROTECT({2, 1, 3, 4, 5, 6}), 0)

	CHECK_MISSING_NUMBER(
		ARRAY_ARG_PROTECT({2, 1, 0, 4, 5, 3}), 6)

	CHECK_MISSING_NUMBER(
		ARRAY_ARG_PROTECT({}), 0)

	CHECK_MISSING_NUMBER(
		ARRAY_ARG_PROTECT({0}), 1)

	CHECK_MISSING_NUMBER(
		ARRAY_ARG_PROTECT({1}), 0)

}