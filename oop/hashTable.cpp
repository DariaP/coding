#include <iostream>
#include <cstdlib>
#include <vector>
#include <map>
#include <memory>

using namespace std;

class HashFunction {
public:
    virtual int hash(int value) =0;
	virtual int maxHash() =0;
};

class ModHashFunction: public HashFunction {
private:
	static const int DEFAULT_CAPACITY = 1000;
	int base;
public:
	ModHashFunction(int initBase = DEFAULT_CAPACITY) {
		base = initBase;
	}

	int maxHash() {
		return base;
	}

	int hash(int value) {
		return value % base;
	}
};

template <class K, class T>
class Data {
public:
	int hash;
	K key;
	T value;
	Data(int _hash, K _key, T _value) {
		hash = _hash;
		key = _key;
		value = _value;
	}
};

template <class K, class T>
ostream& operator<<(ostream& os, const Data<K,T> &data) {
	os << data.key << " " << data.value;
	return os;
}

template <class K, class T>
class LinkedListEntry {
private:
	K key;
	T value;
	LinkedListEntry* next;
public:
	LinkedListEntry(K _key, T _value) {
		key = _key;
		value = _value;
		next = nullptr;
	}
	void setNext(LinkedListEntry *newNext) {
		next = newNext;
	}
	LinkedListEntry *getNext() {
		return next;
	}
	K getKey() {
		return key;
	}
	T getValue() {
		return value;
	}
};

template <class K, class T>
class LinkedList {
private:
	LinkedListEntry<K,T> *root;
public:
	LinkedList() { 
		root = nullptr;
	}
	void add(K key, T value) {
		LinkedListEntry<K,T> *newEntry = new LinkedListEntry<K,T>(key, value);
		newEntry->setNext(root);
		root = newEntry;
	}
	vector<T> find(K key) {
		LinkedListEntry<K,T> *next = root;
		vector<T> result;
		while(nullptr != next) {
			if (next->getKey() == key) {
				result.push_back(next->getValue());
				break;
			}
			next = next->getNext();
		}
		return result;
	}
	void remove(K key) {
		LinkedListEntry<K,T> *prev = nullptr, 
						   *next = root;
		vector<T> result;
		while(nullptr != next) {
			if (next->getKey() == key) {
				if (nullptr == prev) {
					root = root->getNext();
				} else {
					prev->setNext(next->getNext());
				}
				delete next;
				break;
			}
			prev = next;
			next = next->getNext();
		}
	}
	void test_addValuesToVector(int hash, vector<Data<K,T>> *v) {
		LinkedListEntry<K,T> *next = root;
		while(nullptr != next) {
			v->push_back(Data<K,T>(hash, next->getKey(), next->getValue()));
			next = next->getNext();
		}
	}
};

template <class K, class T>
class HashTable {
private:
	HashFunction *hashFunction;
	LinkedList<K,T> *entries;
public:
	HashTable(HashFunction *initHashFunction = new ModHashFunction()) {
		hashFunction = initHashFunction;
		entries = new LinkedList<K,T>[hashFunction->maxHash()];
	}
	void add(K key, T value) {
		int hash = hashFunction->hash((int)key);
		entries[hash].add(key, value);
	}
	vector<T> find(K key) {
		int hash = hashFunction->hash((int)key);
		return entries[hash].find(key);
	}
	void remove(K key) {
		int hash = hashFunction->hash((int)key);
		entries[hash].remove(key);
	}

	vector<Data<K,T>> *test_getAll() {
		vector<Data<K,T>> *result = new vector<Data<K,T>>();
		for (int i = 0 ; i < hashFunction->maxHash() ; ++i) {
			entries[i].test_addValuesToVector(i, result);	
		}
		return result;
	}
};

class TestData {
public:
	int data1;
	string data2;
	TestData() {}
	TestData(int _data1, string _data2) {
		data1 = _data1;
		data2 = _data2;
	}
};

ostream& operator<<(ostream& os, const TestData &data) {
	os << "{" << data.data1 << "," << data.data2 << "}";
	return os;
}

void printFindResult(int key, vector<TestData*> v) {
	cout << key << ": ";
	if (v.size() == 0) {
		cout << "Empty";
	} else if (v.size() > 1) {
		cout << "Error, " << v.size() << " entries";
	} else {
		TestData data = *(v.at(0));
		cout << data;
	}
	cout << endl;
}

void printResult(vector<Data<int, TestData*>> *v) {
	for (auto i = v->begin(); i != v->end(); ++i) {
		TestData data = *(i->value);
    	cout << i->hash << " " << i->key << ":" << data << endl;		
	}
}

int main(int argc, char** argv) {
	HashTable<int, TestData*> table;
	table.add(1, new TestData(1, "test"));
	table.add(10, new TestData(5, "test"));
	table.add(22, new TestData(6, "test"));
	table.add(19876, new TestData(8, "test8"));
	table.add(29876, new TestData(9, "test9"));
	table.add(1876, new TestData(10, "test10"));
	table.add(1022, new TestData(61, "test61"));
	table.add(2022, new TestData(62, "test62"));
	table.add(3022, new TestData(63, "test63"));
	table.remove(1876);
	table.remove(2022);
	table.remove(19876);
	printResult(table.test_getAll());
	printFindResult(1, table.find(1));
	printFindResult(10, table.find(10));
	printFindResult(22, table.find(22));
	printFindResult(19876, table.find(19876));
	printFindResult(29876, table.find(29876));
	printFindResult(1876, table.find(1876));
	printFindResult(1022, table.find(1022));
	printFindResult(2022, table.find(2022));
	printFindResult(3022, table.find(3022));
	printFindResult(2, table.find(2));
	printFindResult(999, table.find(999));
	printFindResult(1001, table.find(1001));
	printFindResult(4022, table.find(4022));
}
