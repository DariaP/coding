#include <iostream>
#include <vector>
#include <unordered_map>
#define BOOST_TEST_MODULE T9Tests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

std::unordered_map<int, std::vector<char>> chars = {
	{2, {'a', 'b', 'c'}},
	{3, {'d', 'e', 'f'}},
	{4, {'g', 'h', 'i'}},
	{5, {'j', 'k', 'l'}},
	{6, {'m', 'n', 'o'}},
	{7, {'p', 'q', 'r', 's'}},
	{8, {'t', 'u', 'v'}},	
	{9, {'w', 'x', 'y', 'z'}}
};

class WordsMap {
	static const std::unordered_map<char, int> charValues; 
	std::unordered_map<int, std::vector<std::string>*> words;

	bool hasKey(int key) {
		return words.find(key) != words.end();
	}
public:
	WordsMap() {}
	void addWord(std::string word) {
		int key = computeKey(word);
		auto it = words.find(key);
		if (it == words.end()) {
			words[key] = new std::vector<std::string>();
			it = words.find(key);
		}
		it->second->push_back(word);
	}

	std::vector<std::string>* getWords(int key) {
		if (hasKey(key)) {
			return new std::vector<std::string>(*words[key]);
		}
		return new std::vector<std::string>();
	}

	int computeKey(std::string word) {
		int key = 0;
		for (char c: word) {
			key = key * 10 + WordsMap::charValues.at(c);
		}
		return key;
	}

};

const std::unordered_map<char, int> WordsMap::charValues = {
	{'a', 2}, {'b', 2}, {'c', 2},
	{'d', 3}, {'e', 3}, {'f', 3},
	{'g', 4}, {'h', 4}, {'i', 4},
	{'j', 5}, {'k', 5}, {'l', 5},
	{'m', 6}, {'n', 6}, {'o', 6},
	{'p', 7}, {'q', 7}, {'r', 7}, {'s', 7},
	{'t', 8}, {'u', 8}, {'v', 8},	
	{'w', 9}, {'x', 9}, {'y', 9}, {'z', 9}
};


std::vector<std::string> *findAll(WordsMap &dictionary,  int key) {
	return dictionary.getWords(key);
}

#define CHECK_T9(words, key, correctResult) { \
	WordsMap dict; \
	for (std::string word: words) { \
		dict.addWord(word); \
	} \
	std::vector<std::string> *result = findAll(dict, key); \
	std::vector<std::string> correctResultVector(correctResult); \
	BOOST_CHECK_EQUAL_COLLECTIONS(result->begin(), result->end(), \
        correctResultVector.begin(), correctResultVector.end()); \
    delete result; \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( t_9_tests )
{
	CHECK_T9(ARRAY_ARG_PROTECT({"tree", "man", "flower", "used"}), 
		8733, ARRAY_ARG_PROTECT({"tree", "used"}));
	CHECK_T9(ARRAY_ARG_PROTECT({"tree", "man", "flower", "used"}), 
		708, ARRAY_ARG_PROTECT({}));
	CHECK_T9(ARRAY_ARG_PROTECT({"tree", "man", "manual", "an", "flower", "used"}), 
		626, ARRAY_ARG_PROTECT({"man"}));
}
