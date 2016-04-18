#include <iostream>
#include <cstdlib>
#include <vector>
#include <memory>

using namespace std;

enum CardSuit {
	HEARTS,
	DIAMONDS,
	CLUBS,
	SPADES
};

enum CardFace {
	ACE = 1,
	KING = 13,
	QUEEN = 12,
	JACK = 11,
	RANK10 = 10,
	RANK9 = 9,
	RANK8 = 8,
	RANK7 = 7,
	RANK6 = 6,
	RANK5 = 5,
	RANK4 = 4,
	RANK3 = 3,
	RANK2 = 2
};

class CardData {
public:
	static const unique_ptr<vector<CardSuit>> suits;
	static const unique_ptr<vector<CardFace>> faces;
};

const unique_ptr<vector<CardSuit>> CardData::suits (new vector<CardSuit>({
	HEARTS, 
	DIAMONDS,
	CLUBS,
	SPADES
}));

const unique_ptr<vector<CardFace>> CardData::faces (new vector<CardFace>({
	ACE,
	KING,
	QUEEN,
	JACK,
	RANK10,
	RANK9,
	RANK8,
	RANK7,
	RANK6,
	RANK5,
	RANK4,
	RANK3,
	RANK2
}));


class Card {
	protected:
	 	CardSuit suit;
		CardFace face;
	public: 
		Card(CardSuit _suit, CardFace _face) {
			suit = _suit;
			face = _face;
		}
};

template <class TCard>
class Deck {
	private:
		vector<TCard> cards;
		int nextCardIdx = 0;

	public:
		static const int size = 52;
		Deck() {
			vector<CardFace> *faces = CardData::faces.get();
			vector<CardSuit> *suits = CardData::suits.get();

			for (int i = 0 ; i < faces->size() ; ++i) {
				for (int j = 0 ; j < suits->size() ; ++j) {
					cards.push_back(TCard(suits->at(j), faces->at(i)));
				}
			} 
		}

		void shuffle () {
			for (int i = nextCardIdx ; i < size ; ++i) {
				;
			}
			// TODO: shuffle cards
		}

		int remainingSize() {
			return size - nextCardIdx;
		}

		TCard getCard() {
			if (nextCardIdx < size) {
				return cards.at(nextCardIdx++);
			} else {
				return NULL;
			}
		}

		unique_ptr<vector<TCard>> getHand(int numOfCards) {
			unique_ptr<vector<TCard>> handCards(new vector<TCard>);
			if ((nextCardIdx + numOfCards) <= size) {
				for (int i = 0 ; i < numOfCards ; ++i) {
					handCards->push_back(cards.at(nextCardIdx++));
				}
			}
			return handCards;
		}
};

template <class TCard>
class Hand {
	protected:
		vector<TCard> cards;

	public:
		Hand() { }

		void addCard(TCard *card) {
			cards.push_back(&card);
		}

		void addCards(vector<TCard> *newCards) {
			cards.insert(cards.end(), newCards->begin(), newCards->end());
		}
};

//------------------------------------------


class BlackJackCard: public Card {
	public:
		BlackJackCard(CardSuit _suit, CardFace _face): Card(_suit, _face) {}

	 	int value() {
	 		switch (this->face) {
	 			case ACE:
	 				return 11;
	 				break;
				case KING:
				case QUEEN:
				case JACK: 
					return 10;
					break;
	 			default:
	 				return this->face;
	 				break;
	 		}
	 		return 0;
	 	}
		friend ostream& operator<<(ostream& os, const BlackJackCard &card);
};

ostream& operator<<(ostream& os, const BlackJackCard &card) {
	os << card.suit << "," << card.face;
	return os;
}

class BlackJackHand: public Hand<BlackJackCard> {
	public:
		int value() {
			int value = 0;
			for(auto it = cards.begin(); it != cards.end(); ++it) {
			    value += it->value();
			}
			return value;
		}

		friend ostream& operator<<(ostream& os, const BlackJackHand &hand);
};

ostream& operator<<(ostream& os, const BlackJackHand &hand)
{
	for (int i =  0 ; i < hand.cards.size() ; ++i) {
	    os << hand.cards.at(i) << ' ';
	}
	return os;
}

void playBlackJack(int numHands) {
	vector<BlackJackHand> hands(numHands);
	Deck<BlackJackCard> deck;

	deck.shuffle();

	BlackJackHand winner = hands.at(0);
	for(int i = 0 ; i < numHands ; ++i) {
	    hands.at(i).addCards(deck.getHand(2).get());
	    cout << "Hand " << i << ": " << hands.at(i) << "\n";
	    if (winner.value() < hands.at(i).value()) {
	    	winner = hands.at(i);
	    }
	}

	cout << "Winner: " << winner << "\n";
}

int main(int argc, char** argv) {
	playBlackJack(4);
	return 0;
}