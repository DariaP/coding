#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#define BOOST_TEST_MODULE WordTransformerTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class WordsGraph {
  std::vector<std::string> words;
  std::unordered_map<std::string, int> wordIdxs;
  std::unordered_map<int, std::vector<int>> links;

  bool hasLinks(int idx) {
      return links.find(idx) != links.end();
  }

  bool hasWord(std::string word) {
      return wordIdxs.find(word) != wordIdxs.end();
  }

  void ensureHasLinks(std::string word) {
    if (!hasWord(word)) {
      wordIdxs[word] = words.size();
      words.push_back(word);
    }

    int idx = wordIdxs[word];

    if (!hasLinks(idx)) {
      std::vector<int> emptyLinks;
      links[idx] = emptyLinks;
    }
  }

  void expand(std::unordered_map<int, std::vector<int>> &paths,
    std::vector<bool> &seenWords)
  {
    std::unordered_map<int, std::vector<int>> newPaths;

    for (auto node : paths) {
      if (hasLinks(node.first)) {
        for (int linkedWord: links[node.first]) {
          if (!seenWords[linkedWord]) {
            //std::cout << words[linkedWord] << " ";
            newPaths[linkedWord] = node.second;
            newPaths[linkedWord].push_back(node.first);
            seenWords[linkedWord] = true;
          }
        }
      }
    }
    //std::cout << std::endl;
    paths = newPaths;
  }

  int commonNode(std::unordered_map<int, std::vector<int>> &paths1,
    std::unordered_map<int, std::vector<int>> &paths2) {
      for (auto node: paths1) {
        if (paths2.find(node.first) != paths2.end()) {
          return node.first;
        }
      }
      return -1;
    }

  std::vector<std::string> joinPaths(
    std::unordered_map<int, std::vector<int>> &pathsFrom,
    std::unordered_map<int, std::vector<int>> &pathsTo,
    int commonNodeIdx
  ) {
    std::vector<std::string> result;

    auto pathFrom = pathsFrom[commonNodeIdx];
    for (int idx: pathFrom) {
      result.push_back(words[idx]);
    }

    result.push_back(words[commonNodeIdx]);

    auto pathTo = pathsTo[commonNodeIdx];
    for(auto idx = pathTo.rbegin(); idx != pathTo.rend(); ++idx)
    {
      result.push_back(words[*idx]);
    }

    return result;
  }
public:
  WordsGraph() {}

  void addLink(std::string word1, std::string word2) {
    ensureHasLinks(word1);
    ensureHasLinks(word2);

    links[wordIdxs[word1]].push_back(wordIdxs[word2]);
    links[wordIdxs[word2]].push_back(wordIdxs[word1]);
  }

  std::vector<std::string> shortestPath(std::string fromWord, std::string toWord) {

    if (!hasWord(fromWord) || !hasWord(toWord) ||
      fromWord.length() != toWord.length()) {
        return {};
    }

    std::unordered_map<int, std::vector<int>>
      pathsFrom = {{wordIdxs[fromWord], {}}},
      pathsTo = {{wordIdxs[toWord], {}}};

    std::vector<bool> seenWordsFrom(words.size(), false);
    std::vector<bool> seenWordsTo(words.size(), false);
    seenWordsFrom[wordIdxs[fromWord]] = true;
    seenWordsTo[wordIdxs[toWord]] = true;

    int commonNodeIdx = -1;

    while (!pathsFrom.empty() && !pathsTo.empty()) {

      //std::cout << pathsFrom.size() << std::endl;
      expand(pathsFrom, seenWordsFrom);
      //std::cout << pathsFrom.size() << std::endl;

      commonNodeIdx = commonNode(pathsFrom, pathsTo);
      if (commonNodeIdx != -1) {
        break;
      }

      expand(pathsTo, seenWordsTo);
      commonNodeIdx = commonNode(pathsFrom, pathsTo);
      if (commonNodeIdx != -1) {
        break;
      }
    }

    if (-1 != commonNodeIdx) {
      return joinPaths(pathsFrom, pathsTo, commonNodeIdx);
    } else {
      return {};
    }
  }
};

bool differInOneLetter(std::string word1, std::string word2) {
  if (word1.length() != word2.length()) {
    return false;
  }

  bool haveDifferentLetters = false;
  for (int i = 0 ; i < word1.length() ; ++i) {
    if (word1[i] != word2[i]) {
      if (haveDifferentLetters) {
        return false;
      } else {
        haveDifferentLetters = true;
      }
    }
  }

  return true;
}

std::vector<std::string> findTransformPath(std::string fromWord, std::string toWord,
  std::vector<std::string> dictionary)
{
  WordsGraph graph;
  for (auto word1 = dictionary.begin() ; word1 != dictionary.end() ; ++word1) {
    for (auto word2 = word1 + 1 ; word2 != dictionary.end() ; ++word2) {
      if (differInOneLetter(*word1, *word2)) {
        graph.addLink(*word1, *word2);
      }
    }
  }

  return graph.shortestPath(fromWord, toWord);
}

#define CHECK_WORD_TRANSFORMER(word1, word2, dictionary, expectedPath) {\
	std::vector<std::string> dictionaryV = dictionary; \
	std::vector<std::string> actualPath = findTransformPath(word1, word2, dictionaryV); \
  std::vector<std::string> expectedPathV = expectedPath; \
	BOOST_CHECK_EQUAL_COLLECTIONS(actualPath.begin(), actualPath.end(), \
		expectedPathV.begin(), expectedPathV.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( word_transformer_tests ) {
  CHECK_WORD_TRANSFORMER("damp", "like",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "life"}),
    ARRAY_ARG_PROTECT({"damp", "lamp", "limp", "lime", "like"})
  )

  CHECK_WORD_TRANSFORMER("damp", "none",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "life"}),
    {}
  )

  CHECK_WORD_TRANSFORMER("damp", "some",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "life"}),
    {}
  )

  CHECK_WORD_TRANSFORMER("damp", "hi",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "life"}),
    {}
  )

  CHECK_WORD_TRANSFORMER("word", "fail",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "life"}),
    {}
  )

  CHECK_WORD_TRANSFORMER("word", "none",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "life"}),
    {}
  )

  CHECK_WORD_TRANSFORMER("none", "node",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "life"}),
    ARRAY_ARG_PROTECT({"none", "node"})
  )

  CHECK_WORD_TRANSFORMER("none", "node",
    ARRAY_ARG_PROTECT({
      "like", "step", "apple",
      "hello", "damp", "water",
      "the", "lamp", "limp",
      "lime", "hi", "node", "none", "nose", "life"}),
    ARRAY_ARG_PROTECT({"none", "node"})
  )

}
