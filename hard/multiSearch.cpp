#include <iostream>
#include <vector>
#include <unordered_map>
#include <typeinfo>
#define BOOST_TEST_MODULE MultiSearchTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class TrieNode {
public:
	bool isWord;
	std::unordered_map<char, TrieNode*> letters;

	bool hasLetter(char c) const {
		return letters.find(c) != letters.end();
	}
	TrieNode() {
		isWord = false;
	}
	~TrieNode() {
		for (auto letter: letters) {
			delete letter.second;
		}
	}

};

class Trie {
public:
	TrieNode rootNode;

	void addWord(std::string word) {
		TrieNode *nextTrie = &rootNode;
		for (char letter: word) {
			if (!nextTrie->hasLetter(letter)) {
				nextTrie->letters[letter] = new TrieNode();
			}
			nextTrie = nextTrie->letters[letter];
		}
		nextTrie->isWord = true;
	}
	Trie() {}
	Trie(std::vector<std::string> words) {
		for (auto word: words) {
			addWord(word);
		}
	}
};

class SubstringIdxs: public std::unordered_map<std::string, std::vector<int>> {
public:
	void addWord(std::string word, int idx) {
		if (find(word) == end()) {
			std::vector<int> empty;
			this->operator[](word) = empty;
		}
		this->operator[](word).push_back(idx);
	}

	std::vector<std::vector<int>> getIdxs(std::vector<std::string> words) {
		std::vector<std::vector<int>> result;

		for (auto word: words) {
			if (find(word) == end()) {
				std::vector<int> empty;
				result.push_back(empty);
			} else {
				result.push_back(at(word));
			}
		}

		return result;
	}
};

void findWords(const Trie &wordsTrie, const std::string &substring, int startIdx,
	SubstringIdxs &wordsIdxs)
{
	const TrieNode *nextTrie = &wordsTrie.rootNode;

	for (int i = 0 ; i < substring.length() ; ++i) {
		if (nextTrie->isWord) {
			wordsIdxs.addWord(substring.substr(0, i), startIdx);
		}

		char letter = substring[i];

		if (nextTrie->hasLetter(letter)) {
			nextTrie = nextTrie->letters.at(letter);
		} else {
			return;
		}
	}

	if (nextTrie->isWord) {
		wordsIdxs.addWord(substring, startIdx);
	}

}

std::vector<std::vector<int>> multiSearch(std::string word, std::vector<std::string> shortWords) {
	Trie wordsTrie(shortWords);
	SubstringIdxs wordsIdxs;

	for (int i = 0 ; i < word.length() ; ++i) {
		std::string nextSubstring = word.c_str() + i;
		findWords(wordsTrie, nextSubstring, i, wordsIdxs);
	}

	return wordsIdxs.getIdxs(shortWords);
}

namespace std {
	ostream& operator<<(ostream& stream, vector<int> v) {
		stream << "{";
		for (int i : v) {
			stream << i << " ";
		}
		stream << "}";
		return stream;
	}
}
#define CHECK_MULTI_SEARCH(word, wordsArray, expectedIdxsArray) { \
	std::vector<std::string> shortWords = wordsArray; \
	std::vector<std::vector<int>> expectedIdxs = expectedIdxsArray; \
	std::vector<std::vector<int>> actualIdxs = multiSearch(word, shortWords); \
	BOOST_CHECK_EQUAL_COLLECTIONS(expectedIdxs.begin(), expectedIdxs.end(), \
		actualIdxs.begin(), actualIdxs.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( multi_search_tests ) {
	CHECK_MULTI_SEARCH(
		"helloworld",
		ARRAY_ARG_PROTECT({"hello", "hi", "world", "wo", "low", "test", "blablabla", "wod"}),
		ARRAY_ARG_PROTECT({{0},     {},   {5},     {5},  {3},   {},     {},          {}}))

	CHECK_MULTI_SEARCH(
		"helloworld",
		ARRAY_ARG_PROTECT({"l",                          "hi", "world"}),
		ARRAY_ARG_PROTECT({ARRAY_ARG_PROTECT({2, 3, 8}), {},   {5}}))

	CHECK_MULTI_SEARCH(
		"hello",
		ARRAY_ARG_PROTECT({""}),
		{ARRAY_ARG_PROTECT({0, 1, 2, 3, 4})})

	CHECK_MULTI_SEARCH(
		"",
		ARRAY_ARG_PROTECT({""}),
		{{}})

}