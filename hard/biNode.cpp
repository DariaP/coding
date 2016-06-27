#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE BiNodeTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

template <class T>
class BiNode {
public:
	BiNode<T> *prev, *next;
	T value;
	BiNode(T initValue) {
		value = initValue;
		prev = nullptr;
		next = nullptr;
	}
};

template <class T>
BiNode<T> *makeTreeHelper(std::vector<T> inOrderValues, int start, int end) {

	if (start > end) {
		return nullptr;
	}

	int rootIdx = start + (end - start) / 2;
	BiNode<T> *root = new BiNode<T>(inOrderValues[rootIdx]);
	root->prev = makeTreeHelper(inOrderValues, start, rootIdx - 1);
	root->next = makeTreeHelper(inOrderValues, rootIdx + 1, end);
	return root;
}

template <class T>
BiNode<T> *makeTree(std::vector<T> inOrderValues) {
	return makeTreeHelper(inOrderValues, 0, inOrderValues.size() - 1);
}

template <class T>
using List = std::pair<BiNode<T>*,BiNode<T>*>;

template <class T>
List<T> makeList(BiNode<T> *treeRoot) {
	List<T> result = {nullptr, nullptr};
	addToList(result, treeRoot);
	return result;
}

template <class T>
void addToList(List<T> &partResult, BiNode<T> *node) {
	if (node == nullptr) {
		 return;
	}

	addToList(partResult, node->prev);

	if (partResult.second) {
		partResult.second->next = node;
		node->prev = partResult.second;		
	}
	partResult.second = node;
	if (!partResult.first) {
		partResult.first = node;
	}

	addToList(partResult, node->next);
}

template <class T>
std::vector<T> listElements(BiNode<T> *head) {
	std::vector<T> result;
	BiNode<T> *node = head;
	while (node != nullptr) {
		result.push_back(node->value);
		node = node->next;
	}
	return result;
}

template <class T>
std::vector<T> listElementsReverse(BiNode<T> *tail) {
	std::vector<T> result;
	BiNode<T> *node = tail;
	while (node != nullptr) {
		result.push_back(node->value);
		node = node->prev;
	}
	return result;
}

#define CHECK_BI_NODE(elements) { \
	std::vector<int> elementsVector = elements; \
	BiNode<int> *tree = makeTree(elementsVector); \
	List<int> list = makeList(tree); \
	std::vector<int> listElementsVector = listElements(list.first); \
	BOOST_CHECK_EQUAL_COLLECTIONS(elementsVector.begin(), elementsVector.end(), \
		listElementsVector.begin(), listElementsVector.end()); \
	std::vector<int> elementsVectorReverse = elements; \
	std::reverse(elementsVectorReverse.begin(),elementsVectorReverse.end()); \
	std::vector<int> listElementsReverseVector = listElementsReverse(list.second); \
	BOOST_CHECK_EQUAL_COLLECTIONS(elementsVectorReverse.begin(), elementsVectorReverse.end(), \
		listElementsReverseVector.begin(), listElementsReverseVector.end()); \
}

#define CHECK_BI_NODE_TREE(elements, tree) \
	std::vector<int> elementsVector = elements; \
	List<int> list = makeList(tree); \
	std::vector<int> listElementsVector = listElements(list.first); \
	BOOST_CHECK_EQUAL_COLLECTIONS(elementsVector.begin(), elementsVector.end(), \
		listElementsVector.begin(), listElementsVector.end()); \
	std::vector<int> elementsVectorReverse = elements; \
	std::reverse(elementsVectorReverse.begin(),elementsVectorReverse.end()); \
	std::vector<int> listElementsReverseVector = listElementsReverse(list.second); \
	BOOST_CHECK_EQUAL_COLLECTIONS(elementsVectorReverse.begin(), elementsVectorReverse.end(), \
		listElementsReverseVector.begin(), listElementsReverseVector.end()); \


#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( bi_node_tests ) {
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3, 4}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3, 4, 5}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6, 7}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6, 7, 8}))
	CHECK_BI_NODE(ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6, 7, 8, 9}))

	{
		BiNode<int> node1(1);
		BiNode<int> node2(2);
		BiNode<int> node3(3);

		node3.prev = &node2;
		node2.prev = &node1;
		CHECK_BI_NODE_TREE(ARRAY_ARG_PROTECT({1, 2, 3}), &node3)
	}

	{
		BiNode<int> node1(1);
		BiNode<int> node2(2);
		BiNode<int> node3(3);

		node3.prev = &node2;
		node2.next = &node1;
		CHECK_BI_NODE_TREE(ARRAY_ARG_PROTECT({2, 1, 3}), &node3)
	}

	{
		BiNode<int> node1(1);
		BiNode<int> node2(2);
		BiNode<int> node3(3);

		node3.next = &node2;
		node2.next = &node1;
		CHECK_BI_NODE_TREE(ARRAY_ARG_PROTECT({3, 2, 1}), &node3)
	}

	{
		BiNode<int> node1(1);
		BiNode<int> node2(2);
		BiNode<int> node3(3);
		BiNode<int> node4(4);
		BiNode<int> node5(5);
		BiNode<int> node6(6);
		BiNode<int> node7(7);


		node6.next = &node7;
		node6.prev = &node5;
		node5.prev = &node1;
		node1.next = &node3;
		node3.prev = &node2;
		node3.next = &node4;
		CHECK_BI_NODE_TREE(ARRAY_ARG_PROTECT({1, 2, 3, 4, 5, 6, 7}), &node6)
	}

}