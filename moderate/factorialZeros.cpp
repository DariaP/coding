#include <iostream>

int factorialZeros(int inputNumber) {
	int numberOfZeroes = 0,
		number = inputNumber;
	while (number / 5 > 0) {
		numberOfZeroes += number / 5;
		number = number / 5;
	}
	return numberOfZeroes;
}

int main(int argc, char** argv) {
	std::cout << factorialZeros(10) << std::endl;
	std::cout << factorialZeros(15) << std::endl;
	std::cout << factorialZeros(20) << std::endl;
	std::cout << factorialZeros(25) << std::endl;
	std::cout << factorialZeros(125) << std::endl;
	return 0;
}