import React from 'react';
import {View, Text} from 'react-native';

import styles from './GameInfoStyles';

const GameInfo = ({level, score}) => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.levelWrapper}>
        <Text style={styles.levelLabel}>Level</Text>
        <Text style={styles.levelCount}>{level}</Text>
      </View>
      <View style={styles.scoresWrapper}>
        <Text style={styles.scoresLabel}>Score</Text>
        <Text style={styles.scoresCount}>{score}</Text>
      </View>
    </View>
  );
};

export default GameInfo;
