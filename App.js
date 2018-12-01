import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import {vibrate} from './utils'
import {Constants} from 'expo';
import {Timer} from './Timer.js';
import {Controls} from './Controls.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workLength: 25,
      breakLength: 5,
      workMinutes: 25,
      workSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      onBreak: false,
      timerRunning: false
    };
  }

  startTimer() {
    if(this.state.timerRunning === false) {
      this.countDown = setInterval(this.decreaseSeconds, 1000);
      this.setState({
        timerRunning: true
      })
    }
  }

  stopTimer() {
    clearInterval(this.countDown);
    this.setState({
      timerRunning: false
    })
  }

  resetTimer() {
    clearInterval(this.countDown);
    this.setState({
      workMinutes: this.state.workLength,
      workSeconds: 0,
      breakMinutes: this.state.breakLength,
      breakSeconds: 0,
      timerRunning: false
    });
  }

  timeUp() {
    this.setState({
      onBreak: !this.state.onBreak,
      workMinutes: this.state.workLength,
      workSeconds: 0,
      breakMinutes: this.state.breakLength,
      breakSeconds: 0
    });
    this.startTimer();
  }

  componentDidUpdate() {
    if ((this.state.workMinutes === 0 && this.state.workSeconds === 0) || (this.state.breakMinutes === 0 && this.state.breakSeconds === 0)) {
      clearInterval(this.countDown);
      vibrate();
      this.timeUp();
    }
  }

  decreaseSeconds = () => {
    // Check if currently on break
    if (!this.state.onBreak){
      if (this.state.workSeconds === 0) {
        this.setState({workSeconds: 59});
        this.decreaseMinutes();
      } else {
        this.setState(prevState => ({
          workSeconds: prevState.workSeconds - 1,
        }));
      }
    } else {
      if (this.state.breakSeconds === 0) {
        this.setState({breakSeconds: 59});
        this.decreaseMinutes();
      } else {
        this.setState(prevState => ({
          breakSeconds: prevState.breakSeconds - 1,
        }));
      }
    }
  }

  decreaseMinutes= () => {
    // Check if currently on break
    if (!this.state.onBreak){
      this.setState(prevState => ({
        workMinutes: prevState.workMinutes - 1,
      }));
    } else {
      this.setState(prevState => ({
        breakMinutes: prevState.breakMinutes - 1,
      }));
    }
  }

  onChanged(val) {
    this.setState({
      workLength: val,
      workMinutes: val
    })
  }

  render() {
    return (
      <View style={styles.AppContainer}>
        <Text style={styles.Heading}>Pomodoro Timer</Text>
        <Text style={styles.SubHeading}>work smarter, not harder</Text>
        {(this.state.onBreak ? 
          <Timer minutes={this.state.breakMinutes} seconds={this.state.breakSeconds} /> 
          :
          <Timer minutes={this.state.workMinutes} seconds={this.state.workSeconds} />
        )}
        <Controls style={styles.flex1} running={this.state.timerRunning}
          startTimer={() => this.startTimer()}
          stopTimer={() => this.stopTimer()}
          resetTimer={() => this.resetTimer()}  
        />
        {this.state.onBreak ? <Text style={styles.flex1}>Break time! 😌</Text> : <Text style={styles.flex1}>Time to grind! 📚</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: '#E0FFFF',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  Heading: {
    fontSize: 48,
    textAlign: 'center',
    paddingTop: 20
  },
  SubHeading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10
  },
  breakText: {
    paddingBottom: 10
  },
  flex1: {flex: 1},
});
