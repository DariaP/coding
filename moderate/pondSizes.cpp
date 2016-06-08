#include <iostream>
#include <vector>
#include <map>
#define BOOST_TEST_MODULE PondSizesTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int processPond(std::vector<std::vector<int>> &land, int x, int y);

std::vector<int> sizes(std::vector<std::vector<int>> land) {
	std::vector<int> ponds;
	for (int i = 0 ; i < land.size() ; ++i) {
		for (int j = 0 ; j < land[0].size() ; ++j) {
			if (land[i][j] == 0) {
				int nextPond = processPond(land, i, j);
				ponds.push_back(nextPond);
			}

		}
	}
	return ponds;
}

std::vector<std::pair<int, int>> incs({
	{-1, 0}, {1, 0}, {0, -1}, {0, 1}
});

int processPond(std::vector<std::vector<int>> &land, int x, int y) {
	std::vector<std::pair<int, int>> pieces({{x, y}});
	land[x][y] = 1;
	int size = 0;

	while(pieces.size() != 0) {
		std::pair<int, int> piece = pieces[pieces.size() - 1];
		pieces.pop_back();
		size++;
		for (auto inc: incs) {
			std::pair<int, int> nextPiece({
				piece.first + inc.first,
				piece.second + inc.second
			});
			if (nextPiece.first >=0 && nextPiece.first < land.size() &&
				nextPiece.second >=0 && nextPiece.second < land[0].size() &&
				land[nextPiece.first][nextPiece.second] == 0) {
				land[nextPiece.first][nextPiece.second] = 1;
				pieces.push_back(nextPiece);
			}
		}
	}
	return size;
}

#define CHECK_POND_SIZES(land, ponds) { \
	std::vector<std::vector<int>> landVector = land; \
	std::vector<int> pondsVector(ponds); \
	std::vector<int> result = sizes(landVector); \
	BOOST_CHECK_EQUAL_COLLECTIONS(result.begin(), result.end(), \
                              pondsVector.begin(), pondsVector.end()); }

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( pond_sizes_tests )
{
	CHECK_POND_SIZES(
		ARRAY_ARG_PROTECT({{0, 1}, {0, 1}}), 
		ARRAY_ARG_PROTECT({2})
	)
	CHECK_POND_SIZES(
		ARRAY_ARG_PROTECT({{0, 1, 2}, {0, 0, 1}, {1, 1, 0}}), 
		ARRAY_ARG_PROTECT({3, 1})
	)
	CHECK_POND_SIZES(
		ARRAY_ARG_PROTECT({{0, 0, 0, 3}, {0, 1, 0, 1}, {0, 0, 0, 3}, {1, 1, 1, 0}}), 
		ARRAY_ARG_PROTECT({8, 1})
	)
	BOOST_CHECK_EQUAL(1, 1);
}
