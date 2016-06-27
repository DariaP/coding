#include <iostream>
#include <vector>
#include <unordered_set>
#define BOOST_TEST_MODULE ReSpaceTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class Spacing {
public:
	std::vector<std::string> words;
	int charsNotInDictionary;
	Spacing() {
		charsNotInDictionary = 0;
	}
	Spacing(int initCharsNotInDictionary) {
		charsNotInDictionary = initCharsNotInDictionary;
	}
	Spacing(std::string initWord, bool isInDictionary) {
		words.push_back(initWord);
		charsNotInDictionary = isInDictionary ? 0 : initWord.length();
	}
	bool betterThan(const Spacing &another) {
		return charsNotInDictionary < another.charsNotInDictionary;
	}
	void append(const Spacing &another) {
		charsNotInDictionary += another.charsNotInDictionary;
		words.insert(words.end(), another.words.begin(), another.words.end());
	}
};

bool wordInDictionary(std::string word, std::unordered_set<std::string> dictionary) {
	return dictionary.find(word) != dictionary.end();
}

Spacing reSpaceFrom(
	std::string phrase,
	int phraseStart, 
	Spacing *partResults,
	std::unordered_set<std::string> dictionary) 
{

	if (phraseStart == phrase.length()) {
		Spacing empty;
		return empty;
	}

	Spacing result(phrase.length() + 1);

	for (int wordEnd = phraseStart ; wordEnd < phrase.length() ; ++wordEnd) {

		int wordLength = wordEnd - phraseStart + 1;
		std::string word = phrase.substr(phraseStart, wordLength);
		Spacing nextPossibleSpacing(word, wordInDictionary(word, dictionary));
		nextPossibleSpacing.append(partResults[wordEnd + 1]);

		if (nextPossibleSpacing.betterThan(result)) {
			result = nextPossibleSpacing;
		}
	}

	return result;
}

std::vector<std::string> reSpace(
	std::string phrase, 
	std::unordered_set<std::string> dictionary) 
{
	Spacing *partResults = new Spacing[phrase.length() + 1];

	for (int phraseStart = phrase.length() - 1 ; phraseStart >= 0 ; --phraseStart) {
		partResults[phraseStart] = reSpaceFrom(phrase, phraseStart, partResults, dictionary);
	}

	return partResults[0].words;
}

#define CHECK_SPACING(phrase, dictionaryArray, expectedSpacingArray) { \
	std::unordered_set<std::string> dictionary = dictionaryArray; \
	auto actualSpacing = reSpace(phrase, dictionaryArray); \
	std::vector<std::string> expectedSpacing = expectedSpacingArray; \
	BOOST_CHECK_EQUAL_COLLECTIONS(actualSpacing.begin(), actualSpacing.end(), \
		expectedSpacing.begin(), expectedSpacing.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( re_space_tests ) {
	CHECK_SPACING(
		"helloworld",
		ARRAY_ARG_PROTECT({"hello", "world"}),
		ARRAY_ARG_PROTECT({"hello", "world"}))

	CHECK_SPACING(
		"theworld",
		ARRAY_ARG_PROTECT({"hello", "world"}),
		ARRAY_ARG_PROTECT({"t","h","e", "world"}))

	CHECK_SPACING(
		"helloworlds",
		ARRAY_ARG_PROTECT({"hello", "world", "worlds"}),
		ARRAY_ARG_PROTECT({"hello", "worlds"}))

	CHECK_SPACING(
		"helloworlds",
		ARRAY_ARG_PROTECT({"hello", "world", "worlds"}),
		ARRAY_ARG_PROTECT({"hello", "worlds"}))

}