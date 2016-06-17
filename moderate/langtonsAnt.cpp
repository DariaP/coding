#include <iostream>
#include <vector>
#define BOOST_TEST_MODULE LangtonsAntTests
#define BOOST_TEST_MAIN
#define BOOST_TEST_DYN_LINK
#include <boost/test/unit_test.hpp>

template <class T> 
class EndlessRow {
	std::vector<T> negIdxs, posIdxs;

	std::vector<T> &chooseVector(int i) {
		return (i >= 0) ? posIdxs : negIdxs;
	}	

	int calcIdx(int i) {
		return (i >= 0) ? i : -1 * (i + 1);
	}	

public:
	EndlessRow() {}
	void set(int inputI, const T& value) {
		//std::cout << "set " << inputI << std::endl;
		std::vector<T> &values = chooseVector(inputI);
		int i = calcIdx(inputI);
		if (i >= values.size()) {
			values.resize(i + 1);
		}
		values[i] = value;
	}

	T & get(int i) {
		return chooseVector(i)[calcIdx(i)];
	}

	int low() {
		return -1 * negIdxs.size();
	}
	int high() {
		return posIdxs.size() - 1;
	}
};

template <class T> 
class EndlessField {
	EndlessRow<EndlessRow<T>> rows;

	void addRows(int from, int to) {
		//std::cout << "add rows " << from << " "<< to << std::endl;
		EndlessRow<T> newRow;
		for (int i = from ; i <= to ; ++i) {
			rows.set(i, newRow);
		}
	}

public:
	EndlessField() {}

	void set(int i, int j, const T& value) {
		//std::cout << "set" << i << " " << j << " " << value << std::endl;
		if (i < rows.low()) {
			addRows(i, rows.low() - 1);
		} else if (i > rows.high()) {
			addRows(rows.high() + 1, i);
		}

		rows.get(i).set(j, value);
	}

	T get(int i, int j) {
		return rows.get(i).get(j);
	}

	int low() {
		return rows.low();
	}
	int high() {
		return rows.high();
	}

	int low(int i) {
		return rows.get(i).low();
	}
	int high(int i) {
		return rows.get(i).high();
	}

};

class Board {
public:

	enum  CellColor {
		WHITE,
		BLACK
	};

private:
	EndlessField<CellColor> field;

	enum Direction {
		TOP = 0,
		RIGHT = 1,
		BOTTOM = 2,
		LEFT = 3
	};

	void turnLeft() {
		facing = (Direction)((facing + 3) % 4);
	}

	void turnRight() {
		facing = (Direction)((facing + 1) % 4);
	}

	int antPosi, antPosj;
	Direction facing; 

	void setInitColor(int i, int j) {
		if (std::abs(i) % 2 == std::abs(j) % 2) {
			field.set(i, j, CellColor::WHITE);
		} else {
			field.set(i, j, CellColor::BLACK);
		}
	}

	void initNewCells(int newj) {
		if (newj > field.high(0) || newj < field.low(0)) {
			for (int i = field.low() ; i <= field.high() ; ++i) {
				setInitColor(i, newj);
			}
		}
	} 

	void initNewRows(int newi) {
		if (newi > field.high() || newi < field.low()) {
			for (int j = field.low(0) ; j <= field.high(0) ; ++j) {
				setInitColor(newi, j);
			}
		}
	} 

	void flipColor(int i, int j) {
		if (field.get(i, j) == CellColor::WHITE) {
			field.set(i, j, CellColor::BLACK);
		} else {
			field.set(i, j, CellColor::WHITE);
		}
	}

	void moveForward() {
		int inci = 0, incj = 0;
		switch (facing) {
			case Direction::LEFT:
				incj = -1;
				break;		
			case Direction::RIGHT:
				incj = 1;
				break;
			case Direction::TOP:
				inci = 1;
				break;
			case Direction::BOTTOM:
				inci = -1;
				break;
			default:
				break;
		}

		antPosi += inci;
		antPosj += incj;

		if (inci != 0) {
			initNewRows(antPosi);
		} else {
			initNewCells(antPosj);
		}
	}

public:
	Board() {
		setInitColor(0, 0);
		antPosi = 0;
		antPosj = 0;
		facing = RIGHT;
	}

	void makeMove() {
		if (WHITE == field.get(antPosi, antPosj)) {
			turnRight();
		} else {
			turnLeft();
		}
		flipColor(antPosi, antPosj);
		moveForward();
	}

	std::vector<std::vector<CellColor>> getCells() {
		//std::cout << "field size " << field.high() << " " << field.low() << std::endl;
		std::vector<std::vector<CellColor>> result;
		std::vector<CellColor> row;
		for (int i = field.high() ; i >= field.low() ; --i) {
			//std::cout << "row " << i << " size " << field.high(i) << " " << field.low(i) << std::endl;
			result.push_back(row);
			for (int j = field.low(i) ; j <= field.high(i) ; ++j) {
				result[field.high() - i].push_back(field.get(i, j));
			}
		}
		return result;
	}
};

std::vector<std::vector<Board::CellColor>> printKMoves(int k) {
	Board board;
	for (int i = 0 ; i < k ; ++i) {
		board.makeMove();
	}
	
	return board.getCells();
}

template <class T>
std::ostream& operator<<(std::ostream& stream, const std::vector<T> &v) {
	for (auto e : v) {
		stream << e << " ";		
	}
	return stream;
}

#define CHECK_BOARD(k, result, correctResult) { \
	std::vector<std::vector<Board::CellColor>> result = printKMoves(k); \
	std::vector<std::vector<Board::CellColor>> correctVector = correctResult; \
	BOOST_CHECK_EQUAL_COLLECTIONS(result.begin(), result.end(), \
		correctVector.begin(), correctVector.end()); \
}

#define ARRAY_ARG_PROTECT(...) __VA_ARGS__

#define WHITE Board::CellColor::WHITE
#define BLACK Board::CellColor::BLACK

BOOST_AUTO_TEST_CASE( langtons_ant_tests )
{
	CHECK_BOARD(0, result, ARRAY_ARG_PROTECT({{WHITE}}));
	CHECK_BOARD(1, result, ARRAY_ARG_PROTECT({{BLACK}, 
											  {BLACK}}));
	CHECK_BOARD(2, result, ARRAY_ARG_PROTECT({{BLACK, BLACK}, 
											  {WHITE, WHITE}}));
	CHECK_BOARD(3, result, ARRAY_ARG_PROTECT({{BLACK, BLACK}, 
											  {WHITE, BLACK},
											  {WHITE, BLACK}}));
	CHECK_BOARD(4, result, ARRAY_ARG_PROTECT({{BLACK, BLACK, WHITE}, 
											  {WHITE, BLACK, BLACK},
											  {WHITE, WHITE, WHITE}}));
	CHECK_BOARD(5, result, ARRAY_ARG_PROTECT({{BLACK, BLACK, WHITE}, 
											  {WHITE, BLACK, BLACK},
											  {WHITE, WHITE, BLACK},
											  {BLACK, WHITE, BLACK}}));
	CHECK_BOARD(6, result, ARRAY_ARG_PROTECT({{BLACK, BLACK, WHITE, BLACK}, 
											  {WHITE, BLACK, BLACK, WHITE},
											  {WHITE, WHITE, BLACK, BLACK},
											  {BLACK, WHITE, WHITE, WHITE}}));
	CHECK_BOARD(7, result, ARRAY_ARG_PROTECT({{BLACK, BLACK, WHITE, BLACK}, 
											  {WHITE, BLACK, BLACK, WHITE},
											  {WHITE, WHITE, BLACK, BLACK},
											  {BLACK, WHITE, WHITE, BLACK},
										      {WHITE, BLACK, WHITE, BLACK},}));

}
