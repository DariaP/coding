#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#define BOOST_TEST_MODULE LongestWordTests
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

	bool hasWord(std::string word) {
		TrieNode *nextNode = &rootNode;

		for (char letter: word) {
			if (!nextNode->hasLetter(letter)) {
				return false;
			}
			nextNode = nextNode->letters[letter];
		}

		return nextNode->isWord;
	}

	Trie() {}
	Trie(std::vector<std::string> words) {
		for (auto word: words) {
			addWord(word);
		}
	}
};

bool consistsOfOtherWords(std::string word, Trie &trie) {
	TrieNode *nextNode = &trie.rootNode;

	for (int i = 0 ; i < word.length() ; ++i) {
		char letter = word[i];

		if (nextNode->isWord) {
			if (trie.hasWord(word.substr(i)) 
				|| consistsOfOtherWords(word.substr(i), trie))
			{
				return true;
			}
		}
		if (!nextNode->hasLetter(letter)) {
			return false;
		}
		nextNode = nextNode->letters[letter];
	}

	return false;
}

std::string findLongestWord(std::vector<std::string> words) {

	Trie trie(words);

	std::sort(words.begin(), words.end(), 
		[]( std::string s1, std::string s2 ) { 
			return s1.length() > s2.length(); 
		}
	);

	for (auto word: words) {
		if (consistsOfOtherWords(word, trie)) {
			return word;
		}
	}

	return "";
}


#define CHECK_LONGEST_WORD(wordsArray, expectedWord) { \
	std::vector<std::string> words = wordsArray; \
	std::string actualWord = findLongestWord(words); \
	BOOST_CHECK_EQUAL(actualWord, expectedWord); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( longest_word_tests ) {
	CHECK_LONGEST_WORD(
		ARRAY_ARG_PROTECT({"cat", "banana", "dog", "nana", "walk", "walker", "dogwalker"}),
		"dogwalker")

	CHECK_LONGEST_WORD(
		ARRAY_ARG_PROTECT({"cat", "banana", "dog", "ba", "nana", "walk", "walker", "dogwalker"}),
		"dogwalker")

	CHECK_LONGEST_WORD(
		ARRAY_ARG_PROTECT({"cat", "banana", "dog", "ba", "nana", "walk", "walker", "dogwalker", "bananawalk"}),
		"bananawalk")

	CHECK_LONGEST_WORD({}, "")

	CHECK_LONGEST_WORD(
		ARRAY_ARG_PROTECT({"cat", "banana", "dog", "nana", "walk", "walker"}),
		"")

}