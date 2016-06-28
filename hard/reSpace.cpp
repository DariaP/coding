#include <iostream>
#include <vector>
#include <unordered_set>
#define BOOST_TEST_MODULE ReSpaceTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class Spacing {
public:
	int spaceIdx;
	int charsNotInDictionary;

	Spacing(int initCharsNotInDictionary = 0, int initSpaceIdx = -1) {
		charsNotInDictionary = initCharsNotInDictionary;
		spaceIdx = initSpaceIdx;
	}

	bool betterThan(const Spacing &another) {
		return charsNotInDictionary < another.charsNotInDictionary;
	}
	void append(const Spacing &another) {
		charsNotInDictionary += another.charsNotInDictionary;
	}
};

bool wordInDictionary(std::string word, std::unordered_set<std::string> dictionary) {
	return dictionary.find(word) != dictionary.end();
}

Spacing insertSpaceAfterWord(std::string phrase, int wordStart, int wordEnd, 
	std::unordered_set<std::string> dictionary) 
{
	int wordLength = wordEnd - wordStart + 1;
	std::string word = phrase.substr(wordStart, wordLength);
	int charsNotInDictionary = wordInDictionary(word, dictionary) ? 0 : wordLength;

	Spacing resultSpacing(charsNotInDictionary, wordEnd);
	return resultSpacing;
}

Spacing reSpaceFrom(
	std::string phrase,
	int phraseStart, 
	Spacing *partResults,
	std::unordered_set<std::string> dictionary) 
{
	Spacing result(phrase.length() + 1);

	for (int wordEnd = phraseStart ; wordEnd < phrase.length() ; ++wordEnd) {

		Spacing nextPossibleSpacing = insertSpaceAfterWord(phrase, phraseStart, wordEnd, dictionary);

		nextPossibleSpacing.append(partResults[wordEnd + 1]);

		if (nextPossibleSpacing.betterThan(result)) {
			result = nextPossibleSpacing;
		}

	}

	return result;
}

std::vector<std::string> buildSpacedPhrase(std::string phrase, Spacing *partResults) {
	std::vector<std::string> result;

	int prevSpaceIdx = 0,
		nextSpaceIdx;

	while(nextSpaceIdx != phrase.length() - 1) {
		nextSpaceIdx = partResults[prevSpaceIdx].spaceIdx;
		result.push_back(phrase.substr(prevSpaceIdx, nextSpaceIdx - prevSpaceIdx + 1));
		prevSpaceIdx = nextSpaceIdx + 1;
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

	return buildSpacedPhrase(phrase, partResults);
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