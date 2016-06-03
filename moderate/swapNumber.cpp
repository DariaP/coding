#include <iostream>

void swap(int* a, int* b) {
	*a += *b; //a+b, b
	*b = -1 * (*b - *a); //a+b, a
	*a -= *b; //b, a
}

int main(int argc, char** argv) {
	int a = 3, b = 4;
	swap(&a, &b);
	std::cout << a << " " << b << std::endl;
	return 0;
}