#include <iostream>
#include <cmath>
#define BOOST_TEST_MODULE MaxTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

#include <map>

class EnglishIntBuilder {
private:
	static std::map<int, std::string> numbersNames;
	static const int TEN = 10,
		HUNDRED = 100,
		THOUSAND = 1000,
		MILLION = 1000000;

	static std::string ending(int number) {
		return (number > 1) ? "s" : "";
	}

	static std::string parseMillions(int number) {

		if (number < MILLION) {
			return parseThousands(number);
		} else {
			std::stringstream result;
			result << parseHundreds(number / MILLION) << " million" << ending(number / MILLION);
			if (number % MILLION != 0) {
				result << " " << parseThousands(number % MILLION);
			}
			return result.str();		
		}
	}

	static std::string parseThousands(int number) {
		if (number < THOUSAND) {
			return parseHundreds(number);
		} else {
			std::stringstream result;
			result << parseHundreds(number / THOUSAND) << " thousand" << ending(number / THOUSAND);
			if (number % THOUSAND != 0) {
				result << " " << parseHundreds(number % THOUSAND);
			}
			return result.str();		
		}
	}

	static std::string parseTens(int number) {
		if (number < 20) {
			return numbersNames[number];
		} else {
			std::stringstream result;
			result << numbersNames[TEN * (number / TEN)];
			if (number % TEN != 0) {
				result << "-" << numbersNames[number % TEN];
			}
			return result.str();
		}	
	}

	static std::string parseHundreds(int number) {
		if (number < HUNDRED) {
			return parseTens(number);
		} else {
			std::stringstream result;
			result << numbersNames[number / HUNDRED] << " hundred" << ending(number / HUNDRED);
			if (number % HUNDRED != 0) {
				result << " " << parseTens(number % HUNDRED);
			}
			return result.str();
		}
	}

public:
	static std::string englishInt(int number) {
		return parseMillions(number);
	}
};

std::map<int, std::string> EnglishIntBuilder::numbersNames = {
	{0, "zero"},
	{1, "one"}, 
	{2, "two"},
	{3, "three"},
	{4, "four"},
	{5, "five"},
	{6, "six"},
	{7, "seven"},
	{8, "eight"},
	{9, "nine"},
	{10, "ten"},
	{11, "eleven"},
	{12, "twelve"},
	{13, "thirteen"},
	{14, "fourteen"},
	{15, "fifteen"},
	{16, "sixteen"},
	{17, "seventeen"},
	{18, "eighteen"},
	{19, "nineteen"},
	{20, "twenty"},
	{30, "thirty"},
	{40, "fourty"},
	{50, "fifty"},
	{60, "sixty"},
	{70, "seventy"},
	{80, "eighty"},
	{90, "ninety"},
	{100, "hundred"},
	{1000, "thousand"},
	{1000000, "million"}
};


BOOST_AUTO_TEST_CASE( max_tests )
{
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(0), "zero");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(1), "one");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(5), "five");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(8), "eight");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(10), "ten");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(19), "nineteen");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(20), "twenty");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(21), "twenty-one");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(87), "eighty-seven");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(99), "ninety-nine");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(100), "one hundred");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(288), "two hundreds eighty-eight");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(302), "three hundreds two");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(500), "five hundreds");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(999), "nine hundreds ninety-nine");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(1000), "one thousand");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(2588), "two thousands five hundreds eighty-eight");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(3002), "three thousands two");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(5030), "five thousands thirty");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(9999), "nine thousands nine hundreds ninety-nine");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(999999), "nine hundreds ninety-nine thousands nine hundreds ninety-nine");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(1009456), "one million nine thousands four hundreds fifty-six");
	BOOST_CHECK_EQUAL(EnglishIntBuilder::englishInt(32134009), "thirty-two millions one hundred thirty-four thousands nine");

}
