#include <iostream>
#include <vector>
#include <queue>
#define BOOST_TEST_MODULE KSmallestTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

void swap(std::vector<int> &numbers, int i, int j) {
	int buffer = numbers[i];
	numbers[i] = numbers[j];
	numbers[j] = buffer;
}

int partition(std::vector<int> &numbers, int start, int end) {
    int pivot = numbers[start],
    	left = start + 1, 
    	right = end;

    while( left < right ) {
        if(numbers[left] > pivot && numbers[right] <= pivot) {
            swap(numbers, left, right);
        }
        if(numbers[left] <= pivot) {
        	left++;
        }
        if(numbers[right] > pivot) {
        	right--;
        }
    }

	if (numbers[left] <= numbers[start]) {
	    swap(numbers, left, start);
	    return left;		
	}
    swap(numbers, left - 1, start);
    return left - 1;
}

std::vector<int> findKSmallest_partition(std::vector<int> &numbers, int k) {
	std::vector<int> result;

	if (k == 0 || k > numbers.size()) {
		return result;
	}

	int start = 0, end = numbers.size() - 1;
	
	while(end != start) {
		int centerIdx = partition(numbers, start, end);

		if (centerIdx <= (k - 1)) {
			for (int i = start ; i <= centerIdx ; ++i) {
				result.push_back(numbers[i]);
			}
		}

		if (centerIdx == (k - 1) ) {
			return result;
		} else if (centerIdx < (k - 1)) {
			start = centerIdx + 1;
		} else {
			end = centerIdx - 1;
		}
	}

	result.push_back(numbers[end]);
	return result;
}

std::vector<int> findKSmallest(std::vector<int> numbers, int k) {
	if (k == 0 || k > numbers.size()) {
		std::vector<int> empty;
		return empty;
	}

	std::priority_queue<int> minKElements(numbers.begin(), numbers.begin() + k);

	for (int i = k + 1 ; i < numbers.size() ; ++i) {
		int number = numbers[i];
		if (number < minKElements.top()) {
			minKElements.push(number);
			if(minKElements.size() > k) {
				minKElements.pop();
			}
		}
	}

	std::vector<int> result;
	while(!minKElements.empty()) {
		result.push_back(minKElements.top());
		minKElements.pop();
	}
	return result;
}

#define CHECK_PARTITION(numbersArray, expectedIdx) { \
	std::vector<int> numbers = numbersArray; \
	auto actualIdx = partition(numbers, 0, numbers.size() - 1); \
	BOOST_CHECK_EQUAL(actualIdx, expectedIdx); \
	for (int i = 0 ; i < actualIdx ; ++i) { \
		BOOST_CHECK_MESSAGE(numbers[i] < numbers[actualIdx], \
			"expected " << numbers[i] << " to be less than " << numbers[actualIdx]); \
	} \
	for (int i = actualIdx + 1 ; i < numbers.size() ; ++i) { \
		BOOST_CHECK_MESSAGE(numbers[i] > numbers[actualIdx], \
			"expected " << numbers[i] << " to be more than " << numbers[actualIdx]); \
	} \
}

#define CHECK_K_SMALLEST(numbersArray, k, expectedKSmallestArray) { \
	std::vector<int> expectedKSmallest = expectedKSmallestArray; \
	std::vector<int> numbers = numbersArray; \
	auto actualKSmallest = findKSmallest_partition(numbers, k); \
	BOOST_CHECK_EQUAL(actualKSmallest.size(), expectedKSmallest.size()); \
	for (auto number: expectedKSmallest) { \
		bool actualHasNumber = hasNumber(actualKSmallest, number); \
		BOOST_CHECK_MESSAGE(actualHasNumber == true, "expected " << number << " to be in result"); \
	} \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

bool hasNumber(std::vector<int> v, int number) {
	for (int n: v) {
		if (n == number) return true;
	}
	return false;
}

BOOST_AUTO_TEST_CASE( k_smallest_tests ) {

	CHECK_PARTITION(ARRAY_ARG_PROTECT({4, 5, 3, 1, 9, 2, 8, 7, 6}),
		3)

	CHECK_PARTITION(ARRAY_ARG_PROTECT({7, 5, 3, 1, 9, 2, 8, 4, 6}),
		6)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({1, 5, 3, 4, 9, 2, 8, 7, 6}), 3, 
		ARRAY_ARG_PROTECT({1, 2, 3})
	)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({1, 2, 3}), 3, 
		ARRAY_ARG_PROTECT({3, 2, 1})
	)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({}), 3, 
		ARRAY_ARG_PROTECT({})
	)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({1, 2, 3}), 0, 
		ARRAY_ARG_PROTECT({})
	)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({1, 2, 3}), 1, 
		ARRAY_ARG_PROTECT({1})
	)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({3, 1, 2}), 1, 
		ARRAY_ARG_PROTECT({1})
	)

	CHECK_PARTITION(ARRAY_ARG_PROTECT({3, 1, 2}),
		2)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({3, 1, 2}), 2, 
		ARRAY_ARG_PROTECT({1, 2})
	)

	CHECK_K_SMALLEST(
		ARRAY_ARG_PROTECT({1, 2, 3, 4, 5}), 3, 
		ARRAY_ARG_PROTECT({1, 2, 3})
	)

}