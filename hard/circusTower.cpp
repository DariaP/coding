#include <iostream>
#include <vector>
#include <algorithm>
#define BOOST_TEST_MODULE CircusTowerTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

class Athlete: public std::pair<int, int> {
public:
	int height() const { return first; }
	int weight() const { return second; }
	Athlete() {}
	Athlete(int initWeight, int initHeight): std::pair<int, int> (initWeight, initHeight) {}
};

namespace std {
	ostream& operator<<(ostream& stream, const Athlete &a) {
		stream << "{" << a.height() << ", " << a.weight() << "}";
		return stream;
	}
}

typedef std::vector<Athlete> Athletes;

class Tower {
public:
	int prevAthleteIdx;
	int size;
	Tower() {
		prevAthleteIdx = -1;
		size = 1;
	}
};

std::vector<Athlete> getAthletesInTower(
	const std::vector<Tower> &towers, 
	const std::vector<Athlete> &athletes,
	int topAthleteIdx) 
{
	std::vector<Athlete> result;

	int nextAthleteIdx = topAthleteIdx;
	while (nextAthleteIdx != -1) {
		result.push_back(athletes[nextAthleteIdx]);
		nextAthleteIdx = towers[nextAthleteIdx].prevAthleteIdx;
	}

	return result;
}

int findBiggestTower(const std::vector<Tower> &towers) {
	int result = 0;
	for (int i = 0 ; i < towers.size() ; ++i) {
		if (towers[i].size > towers[result].size) {
			result = i;
		}
	}
	return result;
}

std::vector<Athlete> findLongestSubsequenceByWeights(const Athletes &athletes) {

	std::vector<Tower> towers(athletes.size());

	for (int i = athletes.size() - 1; i >= 0 ; --i) {
		Athlete nextTopAthlete = athletes[i];
		for (int j = i + 1 ; j < athletes.size() ; ++j) {
			Athlete prevTopAthlete = athletes[j];
			if (prevTopAthlete.weight() > nextTopAthlete.weight() && 
				(towers[j].size + 1) >  towers[i].size)
			{
				towers[i].prevAthleteIdx = j;
				towers[i].size = towers[j].size + 1;
			}
		}
	}

	int topAthlete = findBiggestTower(towers);
	std::vector<Athlete> tower = getAthletesInTower(towers, athletes, topAthlete);
	return tower;
}

void sortByHeight(Athletes &athletes) {
	std::sort(athletes.begin(), athletes.end(), 
		[](Athlete &a1, Athlete&a2) { return a1.height() < a2.height(); });
}

std::vector<Athlete> findTower(Athletes athletes) {
	sortByHeight(athletes);
	return findLongestSubsequenceByWeights(athletes);
}

#define CHECK_CIRCUS_TOWER(athletesArray, bestTowerArray) { \
	std::vector<Athlete> bestTower(bestTowerArray); \
	Athletes athletes = athletesArray; \
	std::vector<Athlete> outputTower = findTower(athletes); \
	BOOST_CHECK_EQUAL_COLLECTIONS(bestTower.begin(), bestTower.end(), \
	 outputTower.begin(), outputTower.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

BOOST_AUTO_TEST_CASE( circus_tower_tests ) {
	CHECK_CIRCUS_TOWER(
		ARRAY_ARG_PROTECT({{65, 100}, {70, 150}, {56, 90}, {75, 190}, {60, 95}, {68, 110}}),
		ARRAY_ARG_PROTECT({{56, 90}, {60, 95}, {65, 100}, {68, 110}, {70, 150}, {75, 190}}));

	/*CHECK_CIRCUS_TOWER(
		ARRAY_ARG_PROTECT({{65, 100}, {56, 90}, {75, 190}, {60, 95}, {68, 110}}),
		ARRAY_ARG_PROTECT({{56, 90}, {60, 95}, {65, 100}, {68, 110}, {70, 150}, {75, 190}}));*/

}