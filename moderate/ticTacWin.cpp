#include <iostream>

enum FieldValue {
	Empty,
	Cross,
	Circle
};

class Field {
private:
	FieldValue *_field;
	int _fieldSize;
public:
	Field(FieldValue *field, int fieldSize) {
		_field = field;
		_fieldSize = fieldSize;
	}
	FieldValue at(int x, int y) {
		return _field[_fieldSize * y + x];
	}
	int size() {
		return _fieldSize;
	}
};

FieldValue checkRows(Field *field);
FieldValue checkColumns(Field *field);
FieldValue checkDiagonals(Field *field);

FieldValue ticTacToeWin(Field *field) {
	FieldValue result;

	result = checkColumns(field);
	if (FieldValue::Empty != result) return result;

	result = checkRows(field);
	if (FieldValue::Empty != result) return result;

	result = checkDiagonals(field);
	if (FieldValue::Empty != result) return result;

	return FieldValue::Empty;
}

FieldValue checkColumns(Field *field) {
	for (int i = 0, j ; i < field->size() ; ++i) {
		for (j = 0 ; j < field->size() ; ++j) {
			if (field->at(i, j) == FieldValue::Empty || 
				field->at(i, j) != field->at(i, 0)) {
				break;
			}
		}
		if (j == field->size()) return field->at(i, 0);
	}
	return FieldValue::Empty;
}

FieldValue checkRows(Field *field) {
	for (int j = 0, i ; j < field->size() ; ++j) {
		for (i = 0 ; i < field->size() ; ++i) {
			if (field->at(i, j) == FieldValue::Empty || 
				field->at(i, j) != field->at(0, j)) {
				break;
			}
		}
		if (i == field->size()) return field->at(0, j);
	}
	return FieldValue::Empty;
}

FieldValue checkDiagonals(Field *field) {
	int i;
	for (i = 0 ; i < field->size() ; ++i) {
		if (field->at(i, i) == FieldValue::Empty || 
			field->at(i, i) != field->at(0, 0)) {
			break;
		}
	}
	if (i == field->size()) return field->at(0, 0);

	for (i = 0 ; i < field->size() ; ++i) {
		if (field->at(i, field->size() - i - 1) == FieldValue::Empty || 
			field->at(i, field->size() - i - 1) != field->at(0, field->size() - 1)) {
			break;
		}
	}
	if (i == field->size()) return field->at(0, field->size() - 1);

	return FieldValue::Empty;
}

int main(int argc, char** argv) {
	FieldValue values[] = {
		FieldValue::Cross, FieldValue::Cross, FieldValue::Circle,
		FieldValue::Empty, FieldValue::Circle, FieldValue::Empty,
		FieldValue::Circle, FieldValue::Empty, FieldValue::Empty
	};
	Field f(values, 3);
	std::cout << ticTacToeWin(&f) << std::endl;
	return 0;
}