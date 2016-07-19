#include <iostream>
#include <vector>
#include <unordered_map>
#define BOOST_TEST_MODULE WordRectangleTests
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
  TrieNode rootNode;

  TrieNode* getPrefix(std::string prefix) {
    TrieNode *nextNode = &rootNode;

		for (char letter: prefix) {
			if (!nextNode->hasLetter(letter)) {
				return nullptr;
			}
			nextNode = nextNode->letters[letter];
		}

		return nextNode;
  }

public:

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
		TrieNode *lastNode = getPrefix(word);
    return lastNode != nullptr && lastNode->isWord;
	}

  bool hasPrefix(std::string prefix) {
    return getPrefix(prefix) != nullptr;
	}

	Trie() {}
	Trie(std::vector<std::string> words) {
		for (auto word: words) {
			addWord(word);
		}
	}
};

//------------------------------------------------------------

class WordsQueues {
  std::vector<std::vector<int>> idxs;
  int size;

  void initIdxsForPos(int pos) {
    for (int i = 0 ; i < size ; ++i) {
      if (pos >= idxs.size()) {
        idxs.push_back(std::vector<int>());
      }
      idxs[pos].push_back(i);
    }
  }

public:
  WordsQueues(int initSize): size(initSize) {
    idxs.push_back(std::vector<int>());
    initIdxsForPos(0);
  }

  bool hasWord(int pos) {
    return (idxs[pos].size() != 0);
  }

  int get(int pos) {
    int result = idxs[pos][idxs[pos].size() - 1];
    idxs[pos].pop_back();
    initIdxsForPos(pos + 1);
    return result;
  }

  bool empty() {
    return (idxs[0].size() == 0);
  }
};
//------------------------------------------------------------

class WordsRectangle {
  std::vector<int> idxs;
  std::vector<std::string> &words;
public:
  WordsRectangle(std::vector<std::string> &initWords): words(initWords) {}

  std::vector<std::string> value() {
    std::vector<std::string> result;
    for (int idx: idxs) {
      result.push_back(words[idx]);
    }
    return result;
  }

  void addNextWord(WordsQueues &wordsQueues) {
    while (!wordsQueues.hasWord(idxs.size())) {
      idxs.pop_back();
    }

    idxs.push_back(wordsQueues.get(idxs.size()));

    /*for (int idx: idxs) {
      std::cout << words[idx]<<std::endl;
    }*/

  }

  void removeLastWord() {
    idxs.pop_back();
  }

  std::string getPrefix(int prefixPos) {
    std::stringstream prefixStream;

    for (int i = 0 ; i < idxs.size() ; ++i) {
      int wordIdx = idxs[i];
      prefixStream << words[wordIdx][prefixPos];
    }

    return prefixStream.str();
  }

  std::vector<std::string> getPrefixes() {
    std::vector<std::string> result;

    if (idxs.empty()) {
      return result;
    }

    for (int i = 0 ; i < words[idxs[0]].length() ; ++i) {
        result.push_back(getPrefix(i));
    }

    return result;
  }
};
//------------------------------------------------------------

int findMaxLength(std::vector<std::string> words) {
  int result = 0;
  for (auto word: words) {
    if(word.length() > result) {
      result = word.length();
    }
  }
  return result;
}

//------------------------------------------------------------

std::vector<std::vector<std::string>> groupByLength(
  std::vector<std::string> words
) {
  int maxLength = findMaxLength(words);

  std::vector<std::vector<std::string>> result(maxLength);

  for (auto word: words) {
    result[word.length() - 1].push_back(word);
  }

  return result;
}
//------------------------------------------------------------

bool allPrefixesExist(WordsRectangle &rect, Trie &allWords) {
  for (std::string prefix: rect.getPrefixes()) {
    if (!allWords.hasPrefix(prefix)) {
      return false;
    }
  }
  return true;
}
//------------------------------------------------------------

bool allPrefixesAreWords(WordsRectangle &rect, Trie &allWords) {
  for (std::string prefix: rect.getPrefixes()) {
    if (!allWords.hasWord(prefix)) {
      return false;
    }
  }
  return true;
}
//------------------------------------------------------------

std::vector<std::string> findInGroup(
  std::vector<std::string> &group,
  Trie &allWords
) {

  WordsQueues wordsQueues(group.size());
  WordsRectangle result(group);

  while(!wordsQueues.empty()) {
    result.addNextWord(wordsQueues);

    /*for (auto p: result.getPrefixes()) {
      std::cout << p<<std::endl;
    }
    std::cout << allPrefixesAreWords(result, allWords) << std::endl;

    std::cout << std::endl;*/

    if (allPrefixesAreWords(result, allWords)) {
      return result.value();
    }

    if (!allPrefixesExist(result, allWords)) {
      result.removeLastWord();
    }
  }

  return std::vector<std::string>();
}
//------------------------------------------------------------

std::vector<std::string> findLargestRectangle(std::vector<std::string> words) {

  std::vector<std::vector<std::string>> groups = groupByLength(words);
  Trie allWords(words);

  for (auto i = groups.rbegin(); i != groups.rend(); ++i ) {
    auto group = *i;
    std::vector<std::string> result = findInGroup(group, allWords);
    if (result.size() != 0) {
      return result;
    }
  }

  return std::vector<std::string>();
}
//=============================================================

#define CHECK_WORD_RECTANGLE(wordsArray, expectedRectangleValues) { \
  std::vector<std::string> words = wordsArray; \
  std::vector<std::string> expectedRectangle = expectedRectangleValues; \
  auto actualRectangle = findLargestRectangle(words); \
  BOOST_CHECK_EQUAL_COLLECTIONS(expectedRectangle.begin(), expectedRectangle.end(), \
    actualRectangle.begin(), actualRectangle.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( sparse_similarity_tests ) {

  CHECK_WORD_RECTANGLE(
    ARRAY_ARG_PROTECT({
      "def", "ghi", "adg", "beh", "cfi", "abc"
    }),
    ARRAY_ARG_PROTECT({
      "abc", "def", "ghi"
    })
  )

  CHECK_WORD_RECTANGLE(
    ARRAY_ARG_PROTECT({
      "defd", "ghid", "adg", "beh", "cfi", "abcd", "ddd"
    }),
    ARRAY_ARG_PROTECT({
      "abcd", "defd", "ghid"
    })
  )

  CHECK_WORD_RECTANGLE(
    ARRAY_ARG_PROTECT({
      "defd", "ghid", "adg", "beh", "cfi", "abcd", "ddd", "test", "a", "some", "cat"
    }),
    ARRAY_ARG_PROTECT({
      "abcd", "defd", "ghid"
    })
  )

  CHECK_WORD_RECTANGLE(
    ARRAY_ARG_PROTECT({
      "defd", "ghid", "adg", "beh", "cfi", "ddd", "test", "a", "some", "cat"
    }),
    ARRAY_ARG_PROTECT({
      "ddd", "ddd", "ddd"
    })
  )

  CHECK_WORD_RECTANGLE(
    ARRAY_ARG_PROTECT({
      "defd", "ghid", "adg", "beh", "test", "a", "some", "cat"
    }),
    ARRAY_ARG_PROTECT({
      "a"
    })
  )

  CHECK_WORD_RECTANGLE(
    ARRAY_ARG_PROTECT({
      "defd", "ghid", "adg", "beh", "test", "some", "cat"
    }),{})

  CHECK_WORD_RECTANGLE({},{})

}
