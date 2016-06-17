#include <iostream>
#include <vector>
#define BOOST_TEST_MODULE LettersAndNumbersTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

bool isNumber(char c) {
	return c >= '0' && c <= '9';
}

bool isLetter(char c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

std::vector<std::pair<int, int>> countNumbersAndLetters(std::vector<char> &array) {
	std::vector<std::pair<int, int>> abNums;

	for (char c: array) {
		std::pair<int, int> next;
		if (isNumber(c)) {
			next = {1, 0};
		} else if (isLetter(c)) {
			next = {0, 1};
		} else {
			//TODO: error
		}
		if (abNums.size() != 0) {
			auto prev = abNums[abNums.size() - 1];
			next.first += prev.first;
			next.second += prev.second;
		}
		abNums.push_back(next);
	}

	return abNums;
}

std::pair<int, int> findSubarray(std::vector<char> &array) {

	std::vector<std::pair<int, int>> abCounts = countNumbersAndLetters(array);
	int maxLength = 0, begin = 0;

	for (auto counts: abCounts) {
		if (counts.first == counts.second && counts.first > maxLength) {
			maxLength = counts.first;
		}
	}

	for (int i = 1 ; i < array.size() ; ++i) {
		if (maxLength > array.size() - i) {
			// can't do any better than current solution
			break;
		}
		for (int j = i ; j < array.size() ; ++j) {
			abCounts[j].first -= abCounts[i - 1].first;
			abCounts[j].second -= abCounts[i - 1].second;

			if (abCounts[j].first == abCounts[j].second && abCounts[j].first > maxLength) {
				maxLength = abCounts[j].first;
				begin = i;
			}
		}
	}

	std::pair<int, int> result = {begin, maxLength * 2};
	return result;
}

#define CHECK_LETTERS_AND_NUMBERS(input, begin, length) { \
	std::vector<char> inputVector = input; \
	std::pair<int, int> result = findSubarray(inputVector); \
	BOOST_CHECK_EQUAL(result.first, begin); \
	BOOST_CHECK_EQUAL(result.second, length); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( letters_and_numbers_tests ) {
	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'a','b', 'c', '8','n','9','y','1', '1', 'b', 'b'}), 1, 8)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'a','b', '8', '9'}), 0, 4)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({}), 0, 0)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'1'}), 0, 0)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'a'}), 0, 0)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'a', 'b'}), 0, 0)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'1', 'a', 'b'}), 0, 2)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'1', 'a', 'c',  'b', '2', 'c', '3'}), 3, 4)

	CHECK_LETTERS_AND_NUMBERS(
		ARRAY_ARG_PROTECT({'1', '1', '1', '1', '1', '1', 'a'}), 5, 2)

}