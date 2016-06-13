#include <iostream>
#include <unordered_map>
#define BOOST_TEST_MODULE LRUCacheTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

template <class K>
class DoubleLinkedList {
public:
	DoubleLinkedList *prev, *next;
	K value;
	DoubleLinkedList(K initValue) {
		prev = nullptr;
		next = nullptr;
		value = initValue;
	}

	void remove() {
		if (nullptr != next) next->prev = prev;
		if (nullptr != prev) prev->next = next;
	}

	void append(DoubleLinkedList<K> *node) {
		next = node;
		node->prev = this;
	}

	void prepend(DoubleLinkedList<K> *node) {
		prev = node;
		node->next = this;
	}
};

template <class K,class T>
class Cache {
	typedef std::pair<DoubleLinkedList<K>*, T> TData;

	std::unordered_map<K, TData> data;
	DoubleLinkedList<K> *keysHead, *keysTail;
	int maxSize;

	DoubleLinkedList<K>* removeKey(K key) {
		auto keyList = data[key].first;
		if (keyList == keysHead) {
			keysHead = keyList->next;
		}
		if (keyList == keysTail) {
			keysTail = keyList->prev;
		}
		keyList->remove();
		return keyList;
	}

	void insertKeyToFront(DoubleLinkedList<K>* keyList) {
		if (keysHead) {
			keysHead->prepend(keyList);
		}
		keysHead = keyList;

		if (keysTail == nullptr) {
			keysTail = keyList;
		}
	}

	void moveKeyToFront(K key) {
		auto keyList = removeKey(key);
		insertKeyToFront(keyList);
	}

	void update(K key, T value) {
		moveKeyToFront(key);
		data[key].second = value;
	}

	void add(K key, T value) {
		auto newKeyList = new DoubleLinkedList<K>(key);
		insertKeyToFront(newKeyList);

		TData tdata(newKeyList, value);
		data[key] = tdata;
	}

public:
	Cache(int initMaxSize) {
		maxSize = initMaxSize;
		keysHead = nullptr;
		keysTail = nullptr;
	}

	bool exists(K key) {
		return data.find(key) != data.end();
	}

	void put(K key, T value) {
		if (exists(key)) {
			update(key, value);
		} else {
			if (data.size() == maxSize) {
				K leastUsedKey = keysTail->value;
				remove(leastUsedKey);
			}

			add(key, value);
		}
	}

	const T *get(K key) {
		if (exists(key)) {
			moveKeyToFront(key);
			return &data[key].second;			
		} else {
			return nullptr;
		}
	}

	const T *getTest(K key) {
		if (exists(key)) {
			return &data[key].second;			
		} else {
			return nullptr;
		}
	}

	void remove(K key) {
		if (exists(key)) {
			auto keyList = removeKey(key);
			delete keyList;

			data.erase(key);
		}
	}
};

#define CHECK_KEY_EXISTS(cache, key, value) { \
	bool exists = cache.exists(key); \
	BOOST_CHECK_EQUAL(exists, true); \
	const std::string *cacheValue = cache.getTest(key); \
	BOOST_CHECK_EQUAL(*cacheValue, value); \
}

#define CHECK_KEY_DOESNT_EXIST(cache, key) { \
	bool exists = cache.exists(key); \
	BOOST_CHECK_EQUAL(exists, false); \
	const std::string *cacheValue = cache.getTest(key); \
	BOOST_CHECK_EQUAL((size_t)cacheValue, (size_t)nullptr); \
}

BOOST_AUTO_TEST_CASE( lru_cache_tests )
{
	Cache<int, std::string> c(5);

	c.put(1, "test1");
	CHECK_KEY_EXISTS(c, 1, "test1")

	c.put(2, "test2");
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 1, "test1")

	c.put(3, "test3");
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 1, "test1")

	c.put(4, "test4");
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 1, "test1")

	c.put(5, "test5");
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 1, "test1")

	c.put(6, "test6");
	CHECK_KEY_EXISTS(c, 6, "test6")
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_DOESNT_EXIST(c, 1)

	c.get(2);
	c.put(7, "test7");
	CHECK_KEY_EXISTS(c, 7, "test7")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 6, "test6")
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_DOESNT_EXIST(c, 1)
	CHECK_KEY_DOESNT_EXIST(c, 3)

	c.remove(7);
	c.remove(4);
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 6, "test6")
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_DOESNT_EXIST(c, 1)
	CHECK_KEY_DOESNT_EXIST(c, 3)
	CHECK_KEY_DOESNT_EXIST(c, 7)
	CHECK_KEY_DOESNT_EXIST(c, 4)

	c.put(1, "test1");
	c.put(3, "test3");
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 1, "test1")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 6, "test6")
	CHECK_KEY_EXISTS(c, 5, "test5")

	c.put(4, "test4");
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 1, "test1")
	CHECK_KEY_EXISTS(c, 2, "test2")
	CHECK_KEY_EXISTS(c, 6, "test6")
	CHECK_KEY_DOESNT_EXIST(c, 5)

	c.put(6, "test61");
	CHECK_KEY_EXISTS(c, 6, "test61")
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 1, "test1")
	CHECK_KEY_EXISTS(c, 2, "test2")

	c.put(5, "test5");
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_EXISTS(c, 6, "test61")
	CHECK_KEY_EXISTS(c, 4, "test4")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 1, "test1")
	CHECK_KEY_DOESNT_EXIST(c, 2)

	c.get(3);
	c.put(4, "test41");
	CHECK_KEY_EXISTS(c, 4, "test41")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_EXISTS(c, 6, "test61")
	CHECK_KEY_EXISTS(c, 1, "test1")

	c.put(8, "test8");
	CHECK_KEY_EXISTS(c, 8, "test8")
	CHECK_KEY_EXISTS(c, 4, "test41")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_EXISTS(c, 6, "test61")
	CHECK_KEY_DOESNT_EXIST(c, 1)

	c.put(9, "test9");
	CHECK_KEY_EXISTS(c, 9, "test9")
	CHECK_KEY_EXISTS(c, 8, "test8")
	CHECK_KEY_EXISTS(c, 4, "test41")
	CHECK_KEY_EXISTS(c, 3, "test3")
	CHECK_KEY_EXISTS(c, 5, "test5")
	CHECK_KEY_DOESNT_EXIST(c, 6)

}
