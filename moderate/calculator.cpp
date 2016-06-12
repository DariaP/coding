#include <iostream>
#include <cstdlib>
#include <functional>
#define BOOST_TEST_MODULE CalculatorTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

typedef std::pair<int, std::function<int(int,int)>> Operator;
class Operators {
	static const std::map<char, Operator> operators;
	static const std::map<char,int> ranks;
public:
	static bool has(char op) {
		return operators.find(op) != operators.end();
	}

	static int rank(char op) {
		return operators.at(op).first;
	}

	static int apply(char op, int a, int b) {
		return operators.at(op).second(a, b);
	}
};

const std::map<char, Operator> Operators::operators = {
	{'+', {1, [](int a, int b) { return a + b; }}},
	{'-', {1, [](int a, int b) { return a - b; }}},
	{'/', {2, [](int a, int b) { return a / b; }}},
	{'*', {2, [](int a, int b) { return a * b; }}},
};

const std::map<char,int> Operators::ranks = {

};

class Operation {
public:
	int number;
	char op;
	Operation(int _number, char _op) {
		number = _number;
		op = _op;
	}
	int apply(int otherNumber) {
		return Operators::apply(op, number, otherNumber);
	}
};


class OpStack {
	std::vector<Operation> opStack;

public:
	OpStack() {}

	void apply(int number, char op) {
		Operation newOperation(number, op);

		int i = opStack.size() - 1;
		while (i >= 0) {
			Operation next = opStack[i--];
			if (Operators::rank(next.op) >= Operators::rank(op)) {
				newOperation.number = next.apply(newOperation.number);
				opStack.pop_back();
			} else {
				break;
			}
		}

		opStack.push_back(newOperation);
	}

	int result(int lastNumber) {
		int i = opStack.size() - 1,
			result = lastNumber;

		while (i >= 0) {
			result = opStack[i--].apply(result);
		}

		return result;
	}

	bool isValidOperator(char op) {
		return Operators::has(op);
	}
};


int calculate(std::string strExpression) {
	char *expr = new char[strExpression.length() + 1];
	std::strcpy(expr, strExpression.c_str());

	OpStack opStack;

	while(*expr != '\0') {
		int number = std::strtol(expr, &expr, 10);
		
		while (*expr == ' ' || *expr == '\t') expr++;

		if (*expr != '\0') {
			char op = *expr++;

			if (!opStack.isValidOperator(op)) {
				return 0; // throw exception
			}

			opStack.apply(number, op);
		} else {
			return opStack.result(number);
		}
	}

	return 0;
}

#define CHECK_STACK(input, last, correctResult) { \
	std::vector<std::pair<int, char>> ops = input; \
	OpStack stack; \
	for (auto it = ops.begin() ; it != ops.end() ; ++it) { \
		stack.apply(it->first, it->second); \
	} \
	int result = stack.result(last); \
	BOOST_CHECK_EQUAL(result, correctResult); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( calculator_tests )
{
	BOOST_CHECK_EQUAL(Operators::apply('+', 1, 2), 3);
	BOOST_CHECK_EQUAL(Operators::apply('-', 3, 2), 1);
	BOOST_CHECK_EQUAL(Operators::apply('/', 6, 2), 3);
	BOOST_CHECK_EQUAL(Operators::apply('*', 4, 2), 8);

	CHECK_STACK(ARRAY_ARG_PROTECT({{1, '+'}}), 2, 3);
	CHECK_STACK(ARRAY_ARG_PROTECT({{3, '-'}}), 2, 1);
	CHECK_STACK(ARRAY_ARG_PROTECT({{1, '+'}, {2, '-'}}), 1, 2);
	CHECK_STACK(ARRAY_ARG_PROTECT({{3, '*'}}), 2, 6);
	CHECK_STACK(ARRAY_ARG_PROTECT({{3, '/'}}), 2, 1);
	CHECK_STACK(ARRAY_ARG_PROTECT({{1, '*'}, {2, '/'}}), 2, 1);
	CHECK_STACK(ARRAY_ARG_PROTECT({{1, '+'}, {2, '/'}}), 2, 2);
	CHECK_STACK(ARRAY_ARG_PROTECT({{3, '*'}, {2, '-'}}), 1, 5);
	CHECK_STACK(ARRAY_ARG_PROTECT({
		{3, '*'}, {2, '*'}}), 2, 12);
	CHECK_STACK(ARRAY_ARG_PROTECT({
		{3, '*'}, {2, '*'}, {2, '-'}, {2, '/'}, {3, '+'}}), 1, 13);


	BOOST_CHECK_EQUAL(calculate("1+2"), 3);
	BOOST_CHECK_EQUAL(calculate("6/2"), 3);
	BOOST_CHECK_EQUAL(calculate("7*12"), 84);
	BOOST_CHECK_EQUAL(calculate("124/11"), 11);
	BOOST_CHECK_EQUAL(calculate("1+2-1"), 2);
	BOOST_CHECK_EQUAL(calculate("3+15/5"), 6);
	BOOST_CHECK_EQUAL(calculate("1*8-2/2"), 7);
	BOOST_CHECK_EQUAL(calculate("3+5+7-4/2"), 13);
	BOOST_CHECK_EQUAL(calculate(""), 0);
	BOOST_CHECK_EQUAL(calculate("abc"), 0);
	BOOST_CHECK_EQUAL(calculate("1 + 2a"), 0);
	BOOST_CHECK_EQUAL(calculate("1 + 2"), 3);
}
