#include <iostream>
#include <vector>
#include <cmath>
#include <unordered_map>
#define BOOST_TEST_MODULE WordDistanceTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

int smallestDistance(std::vector<int> &v1, std::vector<int> &v2) {
	int minDistance = std::abs(v1[0] - v2[0]) - 1;

	auto it1 = v1.begin(), it2 = v2.begin();

	while (it1 != v1.end() && it2 != v2.end()) {
		int nextDistance = std::abs(*it1 - *it2) - 1;
		if (nextDistance < minDistance) {
			minDistance = nextDistance;
		}
		if (*it1 > *it2) {
			it2++;
		} else {
			it1++;
		}
	}

	return minDistance;
}

class Words {
	std::vector<std::string> words;
	std::unordered_map<std::string, std::vector<int>> positions;
	bool preprocessed;

	int calculatePreprocessedDistance(std::string word1, std::string word2) {
		if (positions.find(word1) == positions.end() || 
			positions.find(word2) == positions.end())
		{
			return -1;
		}

		return smallestDistance(positions[word1], positions[word2]);
	}

	int calculateDistance(std::string word1, std::string word2) {
		int lastWord1Position = -1,
			lastWord2Position = -1,
			minDistance = words.size();

		for (int i = 0 ; i < words.size() ; ++i) {
			if (words[i] == word1) {
				if (lastWord2Position != -1 && (i - 1 - lastWord2Position) < minDistance) {
					minDistance = (i - 1 - lastWord2Position);
				}
				lastWord1Position = i;
			} else if (words[i] == word2) {
				if (lastWord1Position != -1 && (i - 1 - lastWord1Position) < minDistance) {
					minDistance = (i - 1 - lastWord1Position);
				}
				lastWord2Position = i;
			}
		}

		return (lastWord1Position == -1 || lastWord2Position == -1) ? -1 : minDistance;
	}


public:
	Words(std::vector<std::string> &initWords) {
		words = initWords;
		preprocessed = false;
	}

	int distance(std::string word1, std::string word2) {
		if (preprocessed == true) {
			return calculatePreprocessedDistance(word1, word2);
		} else {
			return calculateDistance(word1, word2);
		}
	}

	void preprocess() {
		for (int i = 0 ; i < words.size() ; ++i) {
			std::string word = words[i];
			auto it = positions.find(word);
			if (it == positions.end()) {
				std::vector<int> newWordPositions = {i}; 
				positions[word] = newWordPositions;
			} else {
				it->second.push_back(i);
			}
		}
		preprocessed = true;
	}
};

#define CHECK_WORD_DISTANCE(words, word1, word2, expectedDistance) { \
	CHECK_WORD_DISTANCE_PREPROCESS(words, word1, word2, expectedDistance) \
	CHECK_WORD_DISTANCE_NO_PREPROCESS(words, word1, word2, expectedDistance) \
}

#define CHECK_WORD_DISTANCE_NO_PREPROCESS(words, word1, word2, expectedDistance) { \
	std::istringstream issWords(words); \
	std::vector<std::string> wordsVector = { \
		std::istream_iterator<std::string>{issWords}, \
        std::istream_iterator<std::string>{}}; \
	Words w(wordsVector); \
	int actualDistance = w.distance(word1, word2); \
	BOOST_CHECK_EQUAL(actualDistance, expectedDistance); \
}

#define CHECK_WORD_DISTANCE_PREPROCESS(words, word1, word2, expectedDistance) { \
	std::istringstream issWords(words); \
	std::vector<std::string> wordsVector = { \
		std::istream_iterator<std::string>{issWords}, \
        std::istream_iterator<std::string>{}}; \
	Words w(wordsVector); \
	w.preprocess(); \
	int actualDistance = w.distance(word1, word2); \
	BOOST_CHECK_EQUAL(actualDistance, expectedDistance); \
}

BOOST_AUTO_TEST_CASE( majority_element_tests ) {
	CHECK_WORD_DISTANCE(
		"hello world", "hello", "world", 0)

	CHECK_WORD_DISTANCE(
		"hello big world", "hello", "world", 1)

	CHECK_WORD_DISTANCE(
		"hello big world", "world", "hello", 1)

	CHECK_WORD_DISTANCE(
		"hello big beautifull world", "big", "world", 1)

	CHECK_WORD_DISTANCE(
		"i say hello to big beautiful world", "say", "beautiful", 3)

	CHECK_WORD_DISTANCE(
		"i say hello to big beautiful world", "i", "hello", 1)

	CHECK_WORD_DISTANCE(
		"i say hello to big beautiful world hello big beautiful world", "world", "hello", 0)

	CHECK_WORD_DISTANCE(
		"hello world", "hi", "world", -1)

	CHECK_WORD_DISTANCE(
		"hello world", "hi", "big", -1)

	CHECK_WORD_DISTANCE(
		"i say hello to big beautiful world : hello big beautiful world", 
		"world", "huge", -1)

}