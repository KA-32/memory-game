import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';

import styles from './TimerStyles.js';

/**
 * TODO:Need to implement Timer.
 */
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDate: moment
        .duration()
        .add({days: 0, hours: 0, minutes: this.props.time, seconds: 0}), // add 9 full days, 3 hours, 40 minutes and 50 seconds
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    };
  }

  updateTimer = () => {
    const x = setInterval(() => {
      let {eventDate} = this.state;

      if (eventDate <= 0) {
        clearInterval(x);
        this.props.onTimeout();
      } else {
        eventDate = eventDate.subtract(1, 's');
        const days = eventDate.days();
        const hours = eventDate.hours();
        const mins = eventDate.minutes();
        const secs = eventDate.seconds();

        this.setState({
          days,
          hours,
          mins,
          secs,
          eventDate,
        });
      }
    }, 1000);
  };

  componentDidMount() {
    this.updateTimer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.time !== prevProps.time) {
      this.setState(
        {
          eventDate: moment
            .duration()
            .add({days: 0, hours: 0, minutes: this.props.time, seconds: 0}), // add 9 full days, 3 hours, 40 minutes and 50 seconds
          days: 0,
          hours: 0,
          mins: 0,
          secs: 0,
        },
        () => {
          this.updateTimer();
        },
      );
    }
  }

  render() {
    const {mins, secs} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.time}>{`${mins} : ${secs}`}</Text>
      </View>
    );
  }
}

export default Timer;
