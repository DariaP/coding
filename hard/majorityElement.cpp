#include <iostream>
#include <vector>
#define BOOST_TEST_MODULE MajorityElementTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

bool checkMajorityOfSubarray(
	std::vector<int> numbers, 
	int candidate, 
	int startIdx, int &endIdx)
{
	int equal = 0, nEqual = 0;
//std::cout << "checking: " << candidate << " at pos " << startIdx << std::endl;
	for (int i = startIdx ; i < numbers.size() ; ++i) {
		if (numbers[i] == candidate) {
			equal++;
		} else {
			nEqual++;
		}
//std::cout << equal << " " << nEqual << std::endl;

		if (equal == nEqual) {
			endIdx = i;
			return false;
		}
	}

	endIdx = numbers.size();
	return true;
}

bool isMajorityElement(std::vector<int> numbers, int candidate) {
	//std::cout << "checking again: " << candidate << std::endl;

	int equal = 0, nEqual = 0;

	for (int number: numbers) {
		if (number == candidate) equal++;
		else nEqual++;
	}

	return equal > nEqual;
}

int findMajorityElement(std::vector<int> numbers) {
	int i = 0;
	while (i < numbers.size()) {
		int candidate = numbers[i];
		bool isPossibleMajorityElement = checkMajorityOfSubarray(
			numbers, candidate, i, i);
		if (isPossibleMajorityElement && isMajorityElement(numbers, candidate)) {
			return candidate;
		}
	}
	return -1;
}

#define CHECK_MAJORITY_ELEMENT(array, expectedElement) { \
	std::vector<int> inputVector = array; \
	int actualElement = findMajorityElement(inputVector); \
	BOOST_CHECK_EQUAL(actualElement, expectedElement); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( majority_element_tests ) {
	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 2, 5, 9, 5, 9, 5, 5, 5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({5, 5, 5, 1, 2, 5, 9, 5, 9}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 5, 2, 5, 3, 5, 5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 5, 5, 2, 5, 3, 5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({5, 5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({5, 1, 5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 5, 5}), 5)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({}), -1)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 5}), -1)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 2, 5, 9, 5, 9, 5, 5}), -1)

	CHECK_MAJORITY_ELEMENT(
		ARRAY_ARG_PROTECT({1, 2, 5, 9, 5, 9, 5, 5, 3}), -1)

}