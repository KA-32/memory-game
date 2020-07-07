import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  levelWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  levelCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DB999D',
  },
  scoresWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  scoresLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  scoresCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DB999D',
  },
});

export default styles;
