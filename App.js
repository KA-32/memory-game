/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, AppState} from 'react-native';
import {Provider} from 'react-redux';

import Home from './src/screens/Home';

import store from 'redux-store/store';
import * as ACTIONS from 'redux-store/actions';

const App = () => {
  useEffect(() => {
    ACTIONS.loadGame(store.dispatch);
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async (appState) => {
    if (appState.match(/inactive|background/)) {
      ACTIONS.saveGame(
        {level: store.getState().level + 1, score: store.getState().score + 10},
        store.getState().cards,
        store.dispatch,
      );
    }
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
