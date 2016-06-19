#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#define BOOST_TEST_MODULE NameFrequenciesTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

typedef std::unordered_map<std::string, int> NameFrequencies;
typedef std::pair<std::string, std::string> NamePair;
typedef std::vector<NamePair> NamePairs;
typedef std::vector<std::string> NameVector;

class NameGroups: public std::unordered_map<std::string, NameVector> {
public:
	bool has(std::string name) {
		return (find(name) != end());
	}

	void add (std::string name1, std::string name2) {
		if (has(name1)) {
			operator[](name1).push_back(name2);
		} else {
			operator[](name1) = {name2};
		}	
	}
};

class NameSet {
	std::unordered_set<std::string> names;
public:
	bool has(std::string name) {
		return (names.find(name) != names.end());
	}

	void add (std::string name) {
		names.insert(name);
	}
};

NameGroups groupNamePairs(NamePairs namePairs) {
	NameGroups result;

	for (NamePair pair : namePairs) {
		result.add (pair.first, pair.second);
		result.add (pair.second, pair.first);
	}

	return result;
}

NameFrequencies countFrequencies(
	NamePairs namePairs,
	NameFrequencies initFrequencies)
{
	NameGroups nameGroups = groupNamePairs(namePairs);
	NameSet seenNames;
	NameFrequencies result;
	std::vector<std::string> dfsNamesStack;

	for (auto nameFrequency: initFrequencies) {
		std::string name = nameFrequency.first;

		if (!seenNames.has(name)) {
			// found new component of the names graph, 
			// start dfs and count sum of frequencies
			dfsNamesStack.push_back(name);
			result[name] = 0;

			while (dfsNamesStack.size() != 0) {
				std::string nextName = dfsNamesStack[dfsNamesStack.size() - 1];
				dfsNamesStack.pop_back();

				if (!seenNames.has(nextName)) {
					seenNames.add(nextName);

					if (initFrequencies.find(nextName) != initFrequencies.end()) {
						result[name] += initFrequencies[nextName];						
					}

					for (auto linkedName: nameGroups[nextName]) {
						dfsNamesStack.push_back(linkedName);
					}
				}
			}
		}
	}

	return result;
}

#define CHECK_NAME_FREQUENCIES(names, frequencies, correctResult) { \
	NamePairs namesVector = names; \
	NameFrequencies freqVector = frequencies; \
	auto result = countFrequencies(namesVector, freqVector); \
	NameFrequencies correctResultVector = correctResult; \
	BOOST_CHECK_EQUAL(correctResultVector.size(), result.size()); \
	for (auto nameFr: correctResultVector) { \
		bool hasResult = (result.find(nameFr.first) != result.end()); \
		if (hasResult) { \
			BOOST_CHECK_EQUAL(result[nameFr.first], nameFr.second); \
		} \
	} \
}

namespace std {
	ostream& operator<<(ostream& stream, const pair<std::string, int> &p) {
		stream << "{" << p.first << ": " << p.second << "}";
		return stream;
	}
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( name_frequencies_tests ) {
	CHECK_NAME_FREQUENCIES(
		ARRAY_ARG_PROTECT({{"John", "Jon"}, {"John", "Johnny"}, {"Kate", "Cate"}, {"Kate", "Kat"}}),
		ARRAY_ARG_PROTECT({{"John", 10}, {"Johnny", 4}, {"Chris", 8}, {"Cate", 5}}),
		ARRAY_ARG_PROTECT({{"John", 14}, {"Chris", 8}, {"Cate", 5}}))

	CHECK_NAME_FREQUENCIES(
		ARRAY_ARG_PROTECT({{"John", "Jon"}, {"John", "Johnny"}, {"Kate", "Cate"}, {"Kate", "Kat"}}),
		ARRAY_ARG_PROTECT({{"John", 10}, {"Chris", 8}, {"Cate", 5}}),
		ARRAY_ARG_PROTECT({{"John", 10}, {"Chris", 8}, {"Cate", 5}}))

	CHECK_NAME_FREQUENCIES(
		ARRAY_ARG_PROTECT({{"John", "Jon"}, {"John", "Johnny"}, {"Kate", "Cate"}, {"Kate", "Kat"}}),
		ARRAY_ARG_PROTECT({{"John", 10}, {"Johnny", 4}, {"Jon", 2}, 
			{"Chris", 8}, {"Cate", 5}, {"Kate", 3}, {"Kat", 1}}),
		ARRAY_ARG_PROTECT({{"John", 16}, {"Chris", 8}, {"Cate", 9}}))

	CHECK_NAME_FREQUENCIES(
		ARRAY_ARG_PROTECT({{"John", "Jon"}, {"John", "Johnny"}, {"Kate", "Cate"}, {"Kate", "Kat"}}),
		ARRAY_ARG_PROTECT({{"John", 10}, {"Johnny", 4}, {"Jon", 2}, 
			{"Chris", 8}, {"Cate", 5}, {"Kat", 1}}),
		ARRAY_ARG_PROTECT({{"John", 16}, {"Chris", 8}, {"Cate", 6}}))

}