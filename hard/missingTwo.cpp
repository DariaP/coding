#include <iostream>
#include <vector>
#include <numeric>
#include <cmath>
#define BOOST_TEST_MODULE MissingTwoTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

namespace std {
	ostream& operator<<(ostream& stream, const pair<int, int> p) {
		stream << "{" << p.first << ", " << p.second << "}";
		return stream;
	}

	bool operator==(const pair<int, int> p1, const pair<int, int> p2) {
		return (p1.first == p2.first && p1.second == p2.second) ||
			(p1.first == p2.second && p1.second == p2.first);
	}

}

int findMissingOne(std::vector<int> numbers) {

	int expectedSum = (numbers.size() + 2) * (numbers.size() + 1) / 2,
	    actualSum = std::accumulate(numbers.begin(), numbers.end(), 0);

	return expectedSum - actualSum;
}

int sumOfSquares(int n) {
	int result = 0;
	for (int i = 1 ; i <= n ; ++i) {
		result += i * i;
	}
	return result;
}

int sumOfSquares(std::vector<int> numbers) {
	int result = 0;
	for (int i = 0 ; i < numbers.size() ; ++i) {
		result += numbers[i] * numbers[i];
	}
	return result;
}

std::pair<int, int> solveQuadraticEcuation(int a, int b, int c) {
	int Dsqrt = std::sqrt(b * b - 4 * a * c);

	std::pair<int, int> result(
		(-1 * b + Dsqrt) / (2 * a),
		(-1 * b - Dsqrt) / (2 * a)
	);

	return result;
}

std::pair<int, int> findMissingTwo(std::vector<int> numbers) {
	int expectedSum = (numbers.size() + 3) * (numbers.size() + 2) / 2,
	    actualSum = std::accumulate(numbers.begin(), numbers.end(), 0),
	    expectedSqSum = sumOfSquares(numbers.size() + 2),
	    actualSqSum = sumOfSquares(numbers);

	int resultsSum = expectedSum - actualSum,
		resultSqrsSum = expectedSqSum - actualSqSum;

 	return solveQuadraticEcuation(
		2,
		-2 * resultsSum,
		resultsSum * resultsSum - resultSqrsSum
	);
}


#define CHECK_MISSING_ONE(numbersArray, expectedNumber) { \
	std::vector<int> numbers = numbersArray; \
	int actualNumber = findMissingOne(numbers); \
	BOOST_CHECK_EQUAL(actualNumber, expectedNumber); \
}

#define CHECK_MISSING_TWO(numbersArray, expectedNumber1, expectedNumber2) { \
	std::vector<int> numbers = numbersArray; \
	auto actualNumbers = findMissingTwo(numbers); \
	std::pair<int, int> expectedNumbers(expectedNumber1, expectedNumber2); \
	BOOST_CHECK_EQUAL(actualNumbers, expectedNumbers); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( missing_two_tests ) {
	CHECK_MISSING_ONE(
		ARRAY_ARG_PROTECT({1, 2, 3, 5, 6, 7, 8}),
		4)

	CHECK_MISSING_ONE(
		ARRAY_ARG_PROTECT({}),
		1)

	CHECK_MISSING_ONE(
		ARRAY_ARG_PROTECT({3, 2}),
		1)

	CHECK_MISSING_ONE(
		ARRAY_ARG_PROTECT({3, 1, 2}),
		4)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({1, 3, 5, 6, 7, 8}),
		4, 2)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({1, 3}),
		4, 2)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({1, 3}),
		2, 4)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({2, 3}),
		1, 4)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({2, 3, 5}),
		1, 4)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({}),
		1, 2)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({2}),
		1, 3)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({1}),
		2, 3)

	CHECK_MISSING_TWO(
		ARRAY_ARG_PROTECT({1, 2, 3}),
		4, 5)

}