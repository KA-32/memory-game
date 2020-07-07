import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import Header from '../components/Header';
import GameInfo from '../components/GameInfo';
import Timer from '../components/Timer';
import MemoryCards from '../components/MemoryCards';

import * as ACTIONS from 'redux-store/actions';

import styles from './HomeStyles';

const Home = (props) => {
  const [currentLevel, setLevel] = useState(props.level);
  const [currentScore, setScore] = useState(props.score);
  const [cardsCount, setCardsCount] = useState(props.cards.length);
  const [memoryCards, setCards] = useState(props.cards);
  const [isTimedOut, setTimeoutStatus] = useState(false);
  const [timerVal, setTimerVal] = useState(props.level);
  console.log('redux', props);

  useEffect(() => {
    setLevel(props.level);
    setScore(props.score);
    setCards(props.cards);
    setTimerVal(props.level);
    setCardsCount(props.cards.length);
  }, [props.score, props.level, props.cards]);

  useEffect(() => {
    setCards(getCards(cardsCount));
  }, []);

  const getCards = (count) => {
    let mod = count / 2;
    let cards = [];
    for (let i = 1; i <= count; i++) {
      let card = {};
      card.id = 'id' + i;
      card.number = (i % mod) + 1;
      card.isFlip = false;
      cards.push(card);
    }
    props.saveProgress({
      level: currentLevel,
      score: currentScore,
      cards: cards,
    });
    return cards;
  };

  const onChangeLevel = () => {
    let increaseCountCardsNumber = cardsCount + 2;
    setCardsCount(increaseCountCardsNumber);
    setCards(getCards(increaseCountCardsNumber));
  };
  
  const increaseScore = () => {
    setTimerVal(currentLevel + 1);
    setLevel(currentLevel + 1);
    setScore(currentScore + 10);
  };

  //Close game on timeout.
  const onTimeout = () => {
    setTimeoutStatus(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Memory Game" />
      <GameInfo level={currentLevel} score={currentScore} />
      <Timer time={timerVal} onTimeout={onTimeout} />
      <MemoryCards
        isTimedOut={isTimedOut}
        cards={memoryCards}
        onChangeLevel={onChangeLevel}
        increaseScore={increaseScore}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    level: state.level,
    score: state.score,
    cards: state.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProgress: (state) => ACTIONS.saveProgress(state, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
