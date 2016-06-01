#include <cstdlib>
#include <iostream>

char **my2Dalloc(int n, int m) {
	char* data = (char*)malloc(n * m);
	char** pointers = (char**)malloc(n * sizeof(char*));

	for (int i = 0 ; i < n ; ++i) {
		pointers[i] = data + m * i;
	}

	return pointers;
}

void my2Dfree(char** pointers) {
	free(pointers[0]);
	free(pointers);
}

int main(int argc, char** argv) {
	char **data = my2Dalloc(4, 5);
	for (int i = 0 ; i < 4 ; ++i) {
		for (int j = 0 ; j < 5 ; ++j) {
			data[i][j] = 'a' + i + j;
		}
	}
	for (int i = 0 ; i < 4 ; ++i) {
		for (int j = 0 ; j < 5 ; ++j) {
			std::cout << data[i][j] << " ";
		}
		std::cout << std::endl;
	}
	my2Dfree(data);
}