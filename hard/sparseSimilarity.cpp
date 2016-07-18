#include <iostream>
#include <vector>
#include <unordered_map>
#include <functional>
#define BOOST_TEST_MODULE SparseSimilarityTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

typedef int DocId;
typedef int DocData;

namespace std {
	ostream& operator<<(ostream& stream, const pair<pair<DocId, DocId>, double> &p) {
		stream << "{" << p.first.first << ", " << p.first.second << "}: " << p.second;
		return stream;
	}
}

class DocSimilarities {
  std::unordered_map<DocId, std::unordered_map<DocId, double>> values;

public:
  DocSimilarities() {}
  void setSimilarity(DocId id1, DocId id2, double similarity) {
    if (values.find(id1) == values.end()) {
      values[id1] = std::unordered_map<int, double>();
    }
    values[id1][id2] = similarity;
  }
  void incSimilarity(DocId id1, DocId id2) {
    if (values.find(id1) == values.end()) {
      values[id1] = std::unordered_map<int, double>();
    }
    if (values[id1].find(id2) == values[id1].end()) {
      values[id1][id2] = 1;
    } else {
      values[id1][id2]++;
    }
  }

  void forEach(std::function<void(DocId, DocId, double)> callback) {
      for (auto id1AndSimilarities: values) {
        DocId id1 = id1AndSimilarities.first;
        for (auto id2AndSimilarities: id1AndSimilarities.second) {
          DocId id2 = id2AndSimilarities.first;
          double similarity = id2AndSimilarities.second;
          callback(id1, id2, similarity);
        }
      }
  }

  int size() {
    int result = 0;
    for (auto id: values) {
      result += id.second.size();
    }
    return result;
  }

  std::unordered_map<DocId, std::unordered_map<DocId, double>>::iterator begin() {
    return values.begin();
  }

  std::unordered_map<DocId, std::unordered_map<DocId, double>>::iterator end() {
    return values.end();
  }

  std::vector<std::pair<std::pair<DocId, DocId>, double>> pairs() {

    std::vector<std::pair<std::pair<DocId, DocId>, double>> result;

    forEach([&result] (DocId id1, DocId id2, double similarity) mutable {

      result.push_back(std::pair<std::pair<DocId, DocId>, double> (
        std::pair<DocId, DocId> (id1, id2),
        similarity
      ));
    });

    return result;
  }

};

class Document {
public:
  DocId id;
  std::vector<DocData> data;
  Document() {}
  Document(DocId initId, std::vector<DocData> &initData):
    data(initData.begin(), initData.end()),
    id(initId) { }
};

std::unordered_map<DocData, std::vector<DocId>> mapValuesToDocIds(
  std::unordered_map<DocId, Document> docs
)
{
  std::unordered_map<DocId, std::vector<DocData>> result;

  for (auto idAndDoc: docs) {
    DocId docId = idAndDoc.first;
    Document doc = idAndDoc.second;
    for (DocData value: doc.data) {
      if (result.find(value) == result.end()) {
        result[value] = std::vector<DocId>();
      }
      result[value].push_back(docId);
    }
  }
  return result;
}

DocSimilarities computeIntersections(std::unordered_map<DocId, Document> docs) {
  std::unordered_map<DocData, std::vector<DocId>> docsWithValues =
    mapValuesToDocIds(docs);

  DocSimilarities result;

  for (auto docsWithValue: docsWithValues) {
    std::vector<DocId> docs = docsWithValue.second;

    for (auto it1 = docs.begin() ; it1 != docs.end() ; it1++) {
      for (auto it2 = it1 + 1 ; it2 != docs.end() ; it2++) {
        result.incSimilarity(*it1, *it2);
      }
    }
  }

  return result;
}

std::vector<std::pair<std::pair<DocId, DocId>, double>>
computeSimilarities(std::unordered_map<DocId, Document> docs) {
  DocSimilarities result = computeIntersections(docs);

  result.forEach([&docs, &result] (DocId id1, DocId id2, double similarity) mutable {
    double docsUnion = docs.at(id1).data.size() + docs.at(id2).data.size() - similarity;
    result.setSimilarity(id1, id2, similarity / docsUnion);
  });

  return result.pairs();
}

#define CHECK_SPARSE_SIMILARITY(docIdValues, docDataValues, expectedSimilaritiesValues) { \
  std::vector<std::vector<DocData>> docData = docDataValues; \
  std::vector<DocId> docIds = docIdValues; \
  std::unordered_map<DocId, Document> docs; \
  for (int i = 0 ; i < docIds.size() ; ++i) { \
    docs[docIds[i]] = Document(docIds[i], docData[i]); \
  } \
  std::vector<std::pair<std::pair<DocId, DocId>, double>> expectedSimilarities = \
    expectedSimilaritiesValues; \
  auto actualSimilarities = computeSimilarities(docs); \
  BOOST_CHECK_EQUAL_COLLECTIONS(expectedSimilarities.begin(), expectedSimilarities.end(), \
    actualSimilarities.begin(), actualSimilarities.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( sparse_similarity_tests ) {

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1}),
    ARRAY_ARG_PROTECT({
      {1, 2},
      {4, 5}
    }), {}
  );

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1}),
    ARRAY_ARG_PROTECT({
      {1},
      {4}
    }), {}
  );

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10}),
    ARRAY_ARG_PROTECT({
      {1, 2}
    }), {}
  );

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1}),
    ARRAY_ARG_PROTECT({
      {1},
      {1}
    }),
    ARRAY_ARG_PROTECT({
      {{10, 1}, 1.0}
    })
  );

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1}),
    ARRAY_ARG_PROTECT({
      {1, 2},
      {2, 3}
    }),
    ARRAY_ARG_PROTECT({
      {{10, 1}, 1.0 / 3}
    })
  );

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1}),
    ARRAY_ARG_PROTECT({
      {1, 2},
      {2, 1}
    }),
    ARRAY_ARG_PROTECT({
      {{10, 1}, 1.0}
    })
  );

	CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1, 12}),
    ARRAY_ARG_PROTECT({
      {1, 2, 3},
      {2, 1},
			{}
    }),
    ARRAY_ARG_PROTECT({
      {{10, 1}, 2.0 / 3.0}
    })
  );

  CHECK_SPARSE_SIMILARITY(
    ARRAY_ARG_PROTECT({10, 1, 4, 15}),
    ARRAY_ARG_PROTECT({
      {1, 2, 3, 4, 5},
      {4, 5, 8},
      {1, 19, 22, 100},
      {8}
    }),
    ARRAY_ARG_PROTECT({
      {{10, 1}, 2.0 / 6},
      {{10, 4}, 1.0 / 8},
      {{15, 1}, 1.0 / 3}
    })
  );
}
