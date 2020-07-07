import React, {useState, useEffect, memo} from 'react';
import {ScrollView, View} from 'react-native';

import Card from '../Card';

import styles from './MemoryCardsStyles';

const MemoryCards = (props) => {
  const [memoryCards, setMemoryCards] = useState([]);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [storeCardId, setCardId] = useState([]);
  const [isSameCard, setSameCard] = useState(false);

  useEffect(() => {
    if (props.cards) {
      setMemoryCards(props.cards);
    }
    if (props.isTimedOut) {
      let updatedCards = memoryCards.map((selectedCard) => {
        let card = {};
        card.number = selectedCard.number;
        card.id = selectedCard.id;
        card.isFlip = false;
        return card;
      });
      setMemoryCards([...updatedCards]);
    }
  }, [props]);

  useEffect(() => {
    let isCardsFlipped = false;
    let levelComplete;
    for (let i = 0; i < memoryCards.length; i++) {
      if (memoryCards[i].isFlip) {
        isCardsFlipped = true;
      } else {
        isCardsFlipped = false;
        break;
      }
    }

    if (levelComplete) {
      clearTimeout(levelComplete);
    }

    if (isCardsFlipped) {
      levelComplete = setTimeout(() => {
        props.onChangeLevel();
        props.increaseScore();
      }, 2000);
    }
  }, [memoryCards]);

  useEffect(() => {
    let timer;
    if (cardsFlipped.length === 2) {
      if (timer) {
        clearTimeout(timer);
      }
      setSameCard(true);
      //If cards are same, then store in array and update the isFlip to true
      setCardId([cardsFlipped[0].id, cardsFlipped[1].id]);
      if (cardsFlipped[0].number === cardsFlipped[1].number) {
        setSameCard(true);
        setCardsFlipped([]);
      } else {
        timer = setTimeout(() => {
          setSameCard(false);
        }, 1000);
        setCardsFlipped([]);
      }
    }
  }, [cardsFlipped]);

  //If cards are same then update cards array.
  useEffect(() => {
    if (storeCardId.length > 0) {
      let updatedCards = memoryCards.map((selectedCard) => {
        let card = {};
        card.number = selectedCard.number;
        card.id = selectedCard.id;
        if (isSameCard && storeCardId.includes(selectedCard.id)) {
          card.isFlip = true;
        } else if (!isSameCard && storeCardId.includes(selectedCard.id)) {
          card.isFlip = false;
        } else {
          card.isFlip = selectedCard.isFlip;
        }
        return card;
      });
      setMemoryCards([...updatedCards]);
    }
  }, [storeCardId, isSameCard]);

  //handle card touch.
  const onCardPress = (card) => {
    let selectedCards = [...cardsFlipped];
    selectedCards.push(card);
    setCardsFlipped(selectedCards);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.cardsWrapper}>
        {memoryCards.map((card) => {
          return <Card key={card.id} {...card} onCardPress={onCardPress} />;
        })}
      </View>
    </ScrollView>
  );
};

export default MemoryCards;
