#include <iostream>
#define BOOST_TEST_MODULE PatternMatchingTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class ABIterator {
private:
	std::string initString;
	int i;

	void findNextI() {
		while (i < initString.length() &&
			initString[i] != 'a' && initString[i] != 'b') {
			i++;
		}
	}

public:
	ABIterator(std::string _initString) {
		initString = _initString;
		i = 0;
		findNextI();
	}

	bool hasNext() {
		return i != initString.length();
	}

	char next() {
		if (hasNext()) {
			int prevI = i;
			i++;
			findNextI();
			return initString[prevI];			
		} else {
			return '\0';
		}
	}
};

bool match(std::string string, std::string pattern) {
	long long patternHash = 0;
	for (int i = 0 ; i < pattern.length() ; ++i) {
		patternHash = (patternHash < 1) + ((pattern[i] == 'a') ? 1 : 0);
	}

	ABIterator abIterator(string);
	long long substringHash = 0;

	for (int i = 0 ; i < pattern.length() ; ++i) {
		if (abIterator.hasNext()) {
			char next = abIterator.next();
			substringHash = (substringHash < 1) + ((next == 'a') ? 1 : 0);			
		} else {
			return false; // not enough (a|b) characters in string
		}
	}

	int setFirstZeroMask = (1 << pattern.length()) - 1;
	while (abIterator.hasNext()) {

		if (substringHash == patternHash) {
			return true;
		}

		char next = abIterator.next();
		substringHash = ((substringHash & setFirstZeroMask) < 1) + ((next == 'a') ? 1 : 0);
	} 

	if (substringHash == patternHash) {
		return true;
	}

	return false;	
}

#define CHECK_PATTERN_MATCHING(string, pattern, correctResult) { \
	bool result = match(string, pattern); \
	BOOST_CHECK_EQUAL(result, correctResult); }

BOOST_AUTO_TEST_CASE( pattern_matching_tests )
{
	CHECK_PATTERN_MATCHING("aba", "aba", true);
	CHECK_PATTERN_MATCHING("aba", "a", true);
	CHECK_PATTERN_MATCHING("acbca", "aba", true);
	CHECK_PATTERN_MATCHING("abacc", "aba", true);
	CHECK_PATTERN_MATCHING("kbanabacbac", "aba", true);
	CHECK_PATTERN_MATCHING("aaabacc", "aba", true);
	CHECK_PATTERN_MATCHING("aaaacc", "aba", false);
	CHECK_PATTERN_MATCHING("aabbaacc", "aba", false);
	CHECK_PATTERN_MATCHING("aaaacc", "b", false);
	CHECK_PATTERN_MATCHING("", "b", false);
}
