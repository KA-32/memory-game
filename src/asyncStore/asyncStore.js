import AsyncStorage from '@react-native-community/async-storage';

export const storeCards = async (cards) => {
  try {
    await AsyncStorage.setItem('cards', JSON.stringify(cards));
    return true;
  } catch (e) {
    console.log('Error: Unable to store cards in async store');
    return false;
  }
};

export const storeGameState = async (gameState) => {
  var state = {};
  try {
    state.level = gameState.level;
    state.score = gameState.score;
    await AsyncStorage.setItem('gameState', JSON.stringify(state));
    return true;
  } catch (e) {
    console.log('Error: Unable to store game state in async store');
    return false;
  }
};

export const getData = async (data) => {
  try {
    const dataAsync = await AsyncStorage.getItem(data);
    return dataAsync;
  } catch (e) {
    console.log('Error: Unable to fetch cards in async store');
    return false;
  }
};
