import * as ACTIONS from 'redux-store/actions/type';

export const initState = {
  level: 1,
  score: 0,
  cards: [{}, {}, {}, {}],
};

export const Reducer = (state = initState, action) => {
  let game = {};

  switch (action.type) {
    case ACTIONS.LOAD_GAME:
      game.level = action.payload.level;
      game.score = action.payload.score;
      game.cards = action.payload.cards;
      return game;

    case ACTIONS.SAVE_PROGRESS:
      return {...action.payload};

    default:
      return state;
  }
};
