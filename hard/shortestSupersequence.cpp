#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#define BOOST_TEST_MODULE ShortestSupersequenceTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class Interval {
public:
	int start, end;
	Interval(int s, int e) {
		start = s;
		end = e;
	}
	int length() {
		return end - start + 1;
	}
	bool operator==(const Interval &another) const {
		return start == another.start && end == another.end;
	}
};

namespace std {
	ostream& operator<<(ostream& stream, const Interval& i) {
		stream << "[" << i.start << ", " << i.end << "]";
		return stream;
	}
}

class Supersequence {
	const std::unordered_set<int> &requiredValues;
	const std::vector<int> &array;

	Interval i;

	std::unordered_map<int, int> counters;
	bool hasAllValues;
	bool inValidState;
	int lastMissingNumber;

public:
	Supersequence(const std::unordered_set<int> &rv, const std::vector<int> &a): 
		i(0, -1), 
		requiredValues(rv),
		inValidState(false),
		hasAllValues(false),
		array(a) {} 

	bool isRequiredValue(int value) {
		return requiredValues.find(value) != requiredValues.end();
	}

	bool hasCounter(int requiredValue) {
		return counters.find(requiredValue) != counters.end();	
	}

	bool isValidSupersequence() {
		return inValidState && hasAllValues;
	}

	void initEnd() {
		int numOfFoundReqValues = 0;

		while (numOfFoundReqValues != requiredValues.size()) {
			i.end++;

			if (i.end == array.size()) {
				return;
			}

			int nextValue = array.at(i.end);
			if (isRequiredValue(nextValue)) {
				if (hasCounter(nextValue)) {
					counters[nextValue] ++;
				} else {
					counters[nextValue] = 1;
					numOfFoundReqValues++;
				}
			}
		}
		hasAllValues = true;
		inValidState = true;
	}

	void incStart() {
		if (!inValidState || i.start == array.size()) {
			return;
		}

		int removedValue = array.at(i.start);
		if (isRequiredValue(removedValue)) {
			counters[removedValue]--;
			if (counters[removedValue] == 0) {
				hasAllValues = false;
				lastMissingNumber = removedValue;
			}
		}

		i.start++;
	}

	bool reachedEndOfArray() {
		//std::cout << i << std::endl;
		return i.end == array.size();
	}

	void adjustEnd() {
		if (!inValidState || hasAllValues) {
			return;
		}

		while(array.at(i.end) != lastMissingNumber) {

			i.end++;
			if(i.end == array.size()) {
				break;
			}

			int addedValue = array.at(i.end);
			if (isRequiredValue(addedValue)) {
				counters[addedValue]++;
			}			
		}
	}

	int length() {
		return i.length();
	}

	Interval interval() {
		return i;
	}
};

Interval findShortestSupersequence(std::unordered_set<int> &requiredValues, 
	std::vector<int> &array)
{
	if (requiredValues.size() == 0) {
		return Interval(0, -1);
	}

	Supersequence currentSeq(requiredValues, array);
	currentSeq.initEnd();

	bool arrayDoesntHaveAllReqValues = !currentSeq.isValidSupersequence();
	if (arrayDoesntHaveAllReqValues) {
		return Interval(-1, -1);
	}

	Interval result(0, array.size() - 1);
	while (!currentSeq.reachedEndOfArray()) {
		if (currentSeq.length() < result.length()) {
			result = currentSeq.interval();
		}
		currentSeq.incStart();
		currentSeq.adjustEnd();
	}

	return result;
} 

#define CHECK_SHORTEST_SUPERSEQUENCE(array, requiredValues, expectedStart, expectedEnd) { \
	std::unordered_set<int> reqValuesVector = requiredValues; \
	std::vector<int> arrayVector = array; \
	Interval actualInterval = findShortestSupersequence(reqValuesVector, arrayVector); \
	Interval expectedInterval(expectedStart, expectedEnd); \
	BOOST_CHECK_EQUAL(actualInterval, expectedInterval); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( shortest_supersequence_tests ) {

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6}),
		ARRAY_ARG_PROTECT({4, 3}),
		2, 3)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6}),
		ARRAY_ARG_PROTECT({4, 2}),
		1, 3)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 1, 5, 2, 6}),
		ARRAY_ARG_PROTECT({1, 2}),
		0, 1)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 8, 5, 2, 6}),
		ARRAY_ARG_PROTECT({1, 6}),
		0, 7)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 1, 5, 2, 6}),
		ARRAY_ARG_PROTECT({1, 6}),
		4, 7)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 1, 5, 2, 6}),
		ARRAY_ARG_PROTECT({1, 16}),
		-1, -1)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 1, 5, 2, 6}),
		{},
		0, -1)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 1, 5, 2, 6}),
		ARRAY_ARG_PROTECT({1, 3, 4}),
		2, 4)

	CHECK_SHORTEST_SUPERSEQUENCE(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 4, 1, 3, 5, 2, 6}),
		ARRAY_ARG_PROTECT({1, 3, 4}),
		4, 6)

}