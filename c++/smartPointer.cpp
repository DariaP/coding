#include <iostream>

template <class T>
class SmartPointer {
	T* data;
	int* counter;
public:
	SmartPointer(T *initData) {
		data = initData;
		counter = new int[1];
		*counter = 0;
	}
    SmartPointer(const SmartPointer<T> &source) {
    	data = source.data;
    	this->counter = source.counter;
    	(*this->counter)++;
    }
    SmartPointer& operator= (const SmartPointer<T> &cSource);

	char* getData() {
		return data;
	}
	void debug() {
		std::cout << *this->counter << std::endl;
	}

	~SmartPointer() {
		(*this->counter)--;
		if(*this->counter == 0) {
			delete[] data;
		}
	}
};

template <class T>
SmartPointer<T>& SmartPointer<T>::operator= (const SmartPointer<T> &source) {
	*(source.counter)++;
    return *this;
}

template <class T>
void testFunction(SmartPointer<T> inputData) {
	inputData.debug();
}

int main(int argc, char** argv) {
	SmartPointer<char> a = new char[10];
	a.debug();
	SmartPointer<char> b = a;
	a.debug();
	b.debug();
	testFunction(b);
	b.debug();
	b.~SmartPointer();
	a.debug();
	return 0;
}