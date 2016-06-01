#include <cstdlib>
#include <iostream>
#include <bitset>

void print_bits(void* data) {
	std::bitset<8 * sizeof(char *)> bits((size_t)data);
	std::cout << bits << std::endl;
}

void* align_malloc(int size, int alignment) {
	int alloc_size = size + (alignment - 1) + sizeof(char*);

	void *memory = malloc(alloc_size);
	size_t mask = ~(alignment - 1);
	void *aligned_memory = (void *) (((size_t)memory + (alignment - 1)) & mask);

	*((size_t*)aligned_memory - 1) = (size_t)memory;

	return aligned_memory;
}

void align_free(void* aligned_memory) {
	size_t memory = *((size_t*)aligned_memory - 1);
	free((void *)memory);
}

int main(int argc, char** argv) {
	char *data = (char *)align_malloc(100, 16);

	print_bits(data);

	data[0] = 'a';
	data[99] = 'b';

	std::cout << data[0] << " " << data[99] << std::endl;

	align_free(data);
}