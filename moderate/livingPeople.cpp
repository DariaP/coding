#include <iostream>
#include <algorithm>
#include <queue>
#include <map>
#include <functional>

typedef std::pair<std::string, std::pair<int, int>> Person;
typedef std::priority_queue<Person, std::vector<Person>, std::function<bool(Person&, Person&)>> LivingQueue;

bool bornEarlier(Person& a, Person& b) {
	return a.second.first < b.second.first;
}

bool diedEarlier(Person& a, Person& b) {
	return a.second.first < b.second.first;
}

int compute(std::vector<Person> people) {
	std::sort(people.begin(), people.end(), bornEarlier);

    LivingQueue living(diedEarlier);

	int currentYear = people[0].second.first,
		maxYear = people[0].second.first,
		maxYearLivingPeople = 0;

	for(auto const& person: people) {
		
		int nextYear = person.second.first;

		if (currentYear != nextYear) {

			if (living.size() > maxYearLivingPeople) {
				maxYearLivingPeople = living.size();
				maxYear = currentYear;
			}

			if (living.size() > 0) {
				while (living.top().second.second < nextYear) {
					living.pop();
				}				
			}
		}

		living.push(person);

		currentYear = nextYear;
	}

	if (living.size() > maxYearLivingPeople) {
		return currentYear;
	}
	return maxYear;
}

int main(int argc, char** argv) {
	std::vector<Person> people({
		{"a", {1901, 1950}},
		{"a", {1902, 1951}},
		{"a", {1909, 1912}},
		{"a", {1912, 1956}},
		{"b", {1932, 2010}},
		{"b", {1933, 2010}},
		{"b", {1934, 2035}},
		{"b", {1935, 2010}}
	});

	std::cout << compute(people) << std::endl;
	return 0;
}