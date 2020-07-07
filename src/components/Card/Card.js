import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, Animated} from 'react-native';

import styles from './CardStyles';

const Card = (props) => {
  const [rotateCardVal] = useState(new Animated.Value(0));
  const [rotateVal, setRotateVal] = useState(0);

  useEffect(() => {
    rotateCardVal.addListener(({value}) => {
      setRotateVal(value);
    });
  }, [rotateCardVal]);

  useEffect(() => {
    if (props.isFlip) {
      Animated.spring(rotateCardVal, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(rotateCardVal, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [props.isFlip, rotateCardVal]);

  const flip_Animation = () => {
    if (rotateVal >= 90) {
      Animated.spring(rotateCardVal, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(rotateCardVal, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  };

  const onCardPress = () => {
    if (rotateVal < 90) {
      let selectedCard = {};
      selectedCard.id = props.id;
      selectedCard.number = props.number;
      props.onCardPress(selectedCard);
      flip_Animation();
    }
  };

  return (
    <React.Fragment>
      <Animated.View
        style={{
          ...styles.cardWrapper,
          backgroundColor: rotateVal < 90 ? 'green' : '#d0d0d0',
          transform: [
            {
              rotateY: rotateCardVal.interpolate({
                inputRange: [0, 180],
                outputRange: ['180deg', '360deg'],
              }),
            },
          ],
        }}>
        <TouchableOpacity style={styles.cardButton} onPress={onCardPress}>
          {rotateVal >= 90 && (
            <Text style={styles.cardNumber}>{props.number}</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </React.Fragment>
  );
};

export default Card;
