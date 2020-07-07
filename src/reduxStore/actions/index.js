import * as ACTIONS from 'redux-store/actions/type';
import * as AsyncStorage from 'async-store';

export const saveProgress = async (gameState, dispatch) => {
  if (gameState) {
    dispatch({
      type: ACTIONS.SAVE_PROGRESS,
      payload: gameState,
    });
  }
};

export const loadGame = async (dispatch) => {
  const cards = await AsyncStorage.getData('cards');
  const gameState = await AsyncStorage.getData('gameState');
  if (gameState && cards) {
    dispatch({
      type: ACTIONS.LOAD_GAME,
      payload: {
        level: JSON.parse(gameState).level,
        score: JSON.parse(gameState).score,
        cards: JSON.parse(cards),
      },
    });
  }
};

export const saveGame = (gameState, cards, dispatch) => {
  AsyncStorage.storeGameState(gameState);
  AsyncStorage.storeCards(cards);
  dispatch({
    type: ACTIONS.SAVE_GAME,
    payload: 'Game saved',
  });
};
