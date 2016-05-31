#include <iostream>

void reverse(char* str) {
	int length = strlen(str) - 1,
		halfLength = length / 2;
	for(int i = 0; i < halfLength ; ++i) {
		char buff = str[i];
		str[i] = str[length - 1 - i];
		str[length - 1 - i] = buff;
	}
}

char *setCharStr(std::string initStr) {
	char *str = new char[initStr.length()];
	std::strcpy(str, initStr.c_str());
	return str;
}

int main(int argc, char** argv) {
	char *str = setCharStr("test string\n");
	reverse(str);
	std::cout << str;
	delete[] str;

	str = setCharStr("abcdef\n");
	reverse(str);
	std::cout << str;
	delete[] str;

	return 0;
}