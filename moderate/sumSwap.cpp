#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE SumSwapTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int sum(std::vector<int> array) {
	int result = 0;
	for (int value: array) {
		result += value;
	}
	return result;
}

class SortedIndecesIterator {
	std::vector<int> indeces;
	int i = 0;
public:
	SortedIndecesIterator(std::vector<int> &array) {
		for (int i = 0 ; i < array.size() ; ++i) {
			indeces.push_back(i);
		}

		auto compareIndeces = [array](int a, int b) { return array[a] < array[b]; };
		std::sort(indeces.begin(), indeces.end(), compareIndeces);		
	}

	bool end() {
		return i >= indeces.size();
	}

	SortedIndecesIterator& operator++() {
		i++;
		return *this;
	}

	int get() {
		return indeces[i];
	}
};

std::pair<int, int> findPairWithDifference(std::vector<int> array1, 
	std::vector<int> array2,
	int diff) {

	SortedIndecesIterator indeces1(array1), indeces2(array2);

	while (!indeces1.end() && !indeces2.end()) {
		int i1 = indeces1.get(), i2 = indeces2.get();

		if (array1[i1] - array2[i2] == diff) {
			std::pair<int, int> result(i1, i2);
			return result;
		} else if (array1[i1] - array2[i2] > diff) {
			++indeces2;
		} else {
			++indeces1;
		}
	}

	std::pair<int, int> pairDoesNotExist(-1, -1);
	return pairDoesNotExist;
}

std::pair<int, int> findSwapPair(std::vector<int> array1, std::vector<int> array2) {
	int sum1 = sum(array1), sum2 = sum(array2),
		sum = sum1 + sum2;

	if (sum % 2 != 0) {
		std::pair<int, int> pairDoesNotExist(-1, -1);
		return pairDoesNotExist;
	}

	return findPairWithDifference(array1, array2, sum1 - sum / 2);
}

#define CHECK_SUM_SWAP(input1, input2, correctResult) { \
	std::vector<int> inputVector1(input1); \
	std::vector<int> inputVector2(input2); \
	std::pair<int, int> result = findSwapPair(inputVector1, inputVector2); \
	std::pair<int, int> correctResultPair(correctResult); \
	BOOST_CHECK_EQUAL(result.first, correctResultPair.first); \
	BOOST_CHECK_EQUAL(result.second, correctResultPair.second);}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( sum_swap_tests )
{
	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({1, 3, 3, 4}), 
				   ARRAY_ARG_PROTECT({1, 2, 2, 4}),
				   ARRAY_ARG_PROTECT({1, 1}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({1, 2, 2, 2}), 
				   ARRAY_ARG_PROTECT({9, 4}),
				   ARRAY_ARG_PROTECT({0, 1}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({7, 1, 0, 1}), 
				   ARRAY_ARG_PROTECT({9, 4}),
				   ARRAY_ARG_PROTECT({0, 0}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({9, 4}), 
				   ARRAY_ARG_PROTECT({1, 2, 2, 2}),
				   ARRAY_ARG_PROTECT({1, 0}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({1, 2, 3, 4}), 
				   ARRAY_ARG_PROTECT({1, 2, 3, 4}),
				   ARRAY_ARG_PROTECT({0, 0}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({1, 2, 3, 4}), 
				   ARRAY_ARG_PROTECT({1, 2, 3, 5}),
				   ARRAY_ARG_PROTECT({-1, -1}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({1, 2, 3, 4}), 
				   ARRAY_ARG_PROTECT({8}),
				   ARRAY_ARG_PROTECT({-1, -1}));

	CHECK_SUM_SWAP(ARRAY_ARG_PROTECT({4}), 
				   ARRAY_ARG_PROTECT({1, 8}),
				   ARRAY_ARG_PROTECT({-1, -1}));
}
