#include <fstream>
#include <iostream>
#include <algorithm>

int linesCount(std::string filename);

void printLastKLines(std::string filename, int k) {

	std::ifstream infile(filename);

	if (!infile) {
		std::cout << "Error opening file: " << strerror(errno) << std::endl;
	}

	int nLines = linesCount(filename), i = 0;
    std::string line;
	while (std::getline(infile, line)) {
		i++;
		if (i > (nLines - k - 1)) {
			std::cout << line << std::endl;
		}
	}
}

int linesCount(std::string filename) {
	std::ifstream infile(filename);

	if (!infile) {
		std::cout << "Error opening file: " << strerror(errno) << std::endl;
	}

    return std::count(
	    std::istreambuf_iterator<char>(infile),
	    std::istreambuf_iterator<char>(), 
    	'\n'
    );
}

int main(int argc, char** argv) {
	printLastKLines("printKLines.cpp", 10);
	return 0;
}