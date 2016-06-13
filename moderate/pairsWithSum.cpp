#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE PairsWithSumTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

std::vector<std::pair<int, int>> pairsWithSum_sort(const std::vector<int> &inputValues, int sum) {
	std::vector<std::pair<int, int>> result;

	std::vector<int> values(inputValues);
	std::sort(values.begin(), values.end());

	int iBegin = 0, iEnd = values.size() - 1;

	while (iBegin < iEnd) {
		int nextSum = values.at(iBegin) + values.at(iEnd);

		if (nextSum == sum) {

			int iEndCopy = iEnd;
			do { 
				std::pair<int, int> nextPair(values.at(iBegin), values.at(iEnd));
				result.push_back(nextPair);
				iEnd--;
			} while ((values[iEnd] == values[iEnd + 1]) && (iEnd != iBegin));

			iEnd = iEndCopy;
			iBegin++;
		} else if (nextSum > sum) {
			iEnd--;
		} else {
			iBegin++;
		}
	}

	return result;
}

/*std::vector<std::pair> pairsWithSum_hash(vector<int> values, int sum) {

}*/

bool leastPair(const std::pair<int,int> &left, const std::pair<int,int> &right) {
	if (left.first == right.first) {
		return left.second < right.second;
	}
	return left.first < right.first;
}

#define CHECK_PAIRS(input, sum, correctResult) { \
	std::vector<int> inputVector = input; \
	std::vector<std::pair<int,int>> correctResultVector = correctResult; \
	std::sort(correctResultVector.begin(), correctResultVector.end(), leastPair); \
	std::vector<std::pair<int,int>> resultVector = pairsWithSum_sort(inputVector, sum); \
	std::sort(resultVector.begin(), resultVector.end(), leastPair); \
	BOOST_CHECK_EQUAL_COLLECTIONS(resultVector.begin(), resultVector.end(), \
       correctResultVector.begin(), correctResultVector.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

namespace boost
{
    namespace test_tools
    {
        template<typename T,typename U>
        struct tt_detail::print_log_value<std::pair<T, U> >
        {
            void operator()(std::ostream& os, std::pair<T, U> const& pr)
            {
                os << "<" << std::get<0>(pr) << "," << std::get<1>(pr) << ">";
            }
        };
    }
}

BOOST_AUTO_TEST_CASE( pairs_with_sum_tests )
{
	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({2, 4, 1, 5, 3, 6}), 7, 
		ARRAY_ARG_PROTECT({{1, 6}, {2, 5}, {3, 4}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({2, 4, 1, 5, 3, 7}), 8, 
		ARRAY_ARG_PROTECT({{1, 7}, {3, 5}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({2, 4, 1, 3, 7}), 9, 
		ARRAY_ARG_PROTECT({{2, 7}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({2, 4, 1, 3, 7}), 7, 
		ARRAY_ARG_PROTECT({{3, 4}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({}), 7, 
		ARRAY_ARG_PROTECT({}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 2}), 3, 
		ARRAY_ARG_PROTECT({{1, 2}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({2, 4, 1, 3, 7}), 22, 
		ARRAY_ARG_PROTECT({}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 2}), 22, 
		ARRAY_ARG_PROTECT({}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 1}), 2, 
		ARRAY_ARG_PROTECT({{1, 1}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 3, 3}), 4, 
		ARRAY_ARG_PROTECT({{1, 3}, {1, 3}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 1, 3, 3}), 4, 
		ARRAY_ARG_PROTECT({{1, 3}, {1, 3}, {1, 3}, {1, 3}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 2, 1, 3, 3}), 4, 
		ARRAY_ARG_PROTECT({{1, 3}, {1, 3}, {1, 3}, {1, 3}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 1, 1}), 2, 
		ARRAY_ARG_PROTECT({{1, 1}, {1, 1}, {1, 1}}))

	CHECK_PAIRS(
		ARRAY_ARG_PROTECT({1, 2, 2, 2, 3}), 4, 
		ARRAY_ARG_PROTECT({{1, 3}, {2, 2}, {2, 2}, {2, 2}}))

}
