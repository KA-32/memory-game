import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardWrapper: {
    width: '30%',
    height: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowOffset: {width: 3, height: 4},
    shadowColor: '#e0e0e0',
    shadowOpacity: 0.6,
    elevation: 2,
    borderRadius: 5,
  },
  cardButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});

export default styles;
