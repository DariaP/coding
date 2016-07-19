#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE HistogramVolumeTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int volumeBetween(std::vector<int> &histogram, int from, int to) {
	int height = std::min(histogram[from], histogram[to]),
		length = to - from - 1,
		volume = height * length;

	for (int i = from + 1 ; i < to ; ++i) {
		volume -= histogram[i];
	}

	return volume;
}

int findMax(std::vector<int> &histogram, int from, int to) {
	int maxIdx = from;

	for (int i = from + 1 ; i <= to ; ++i) {
		if (histogram[i] > histogram[maxIdx]) {
			maxIdx = i;
		}
	}

	return maxIdx;
}

int fillToTheLeft(std::vector<int> &histogram, int rightIdx) {
	int maxIdx = rightIdx,
		leftMaxIdx = findMax(histogram, 0, maxIdx - 1),
		volume = 0;

	while (maxIdx != 0 && histogram[maxIdx] != 0) {
		volume += volumeBetween(histogram, leftMaxIdx, maxIdx);
		maxIdx = leftMaxIdx;
		leftMaxIdx = findMax(histogram, 0, leftMaxIdx - 1);
	}

	return volume;
}

int fillToTheRight(std::vector<int> &histogram, int leftIdx) {
	int maxIdx = leftIdx,
		rightMaxIdx = findMax(histogram, maxIdx + 1, histogram.size() - 1),
		volume = 0;

	while (maxIdx != histogram.size() - 1 && histogram[maxIdx] != 0) {
		volume += volumeBetween(histogram, maxIdx, rightMaxIdx);
		maxIdx = rightMaxIdx;
		rightMaxIdx = findMax(histogram, rightMaxIdx + 1, histogram.size() - 1);
	}

	return volume;
}

int histogramVolume(std::vector<int> &histogram) {
	int totalVolume = 0;

	int maxIdx = findMax(histogram, 0, histogram.size() - 1);

	totalVolume += fillToTheLeft(histogram, maxIdx);
	totalVolume += fillToTheRight(histogram, maxIdx);

	return totalVolume;
}

#define CHECK_HISTOGRAM_VOLUME(histogramArray, expectedVolume) { \
	std::vector<int> histogram = histogramArray; \
	int actualVolume = histogramVolume(histogram); \
	BOOST_CHECK_EQUAL(actualVolume, expectedVolume); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( histogram_volume_tests ) {
	CHECK_HISTOGRAM_VOLUME(
		ARRAY_ARG_PROTECT({0, 0, 4, 0, 0, 6, 0, 0, 3, 0, 5, 0, 1, 0, 0, 0}),
		26)
}
