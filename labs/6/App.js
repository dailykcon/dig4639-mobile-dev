/*
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
*/

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Button } from 'react-native-elements'
import questions from './questions.json'
const AVAILABLE_TIME = 10
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 350,
    marginRight: 540,
    width: 750,
  },

  header: {
    fontSize: 50,
    padding: 30,
    fontFamily: "Trebuchet MS",
    fontWeight: "bold",
    textAlign: "center"
  },

  button: {
    padding: 20,
    backgroundColor: "green",
    margin: 20,
    borderRadius: 30
  },

  question: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10
  },

  score: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold"
  }
})

const start_page = 0
const question_page = 1

export default class App extends React.Component {
  timer = () => {};

  constructor (props) {
    super()
    this.state = {
      currentState: start_page,
      currentQuestion: 0,
      score: 0,
      remainingTime: AVAILABLE_TIME
    }
  }

  nextQuestion (x) {
    this.countdownTimer()
    if (x.correct) {
      this.setState({ score: this.state.score + 1 })
    }
      this.setState({ currentQuestion: this.state.currentQuestion + 1 })
  }

  countdownTimer(){
    this.setState({remainingTime: AVAILABLE_TIME });
    clearInterval(this.timer);
    this.timer = setInterval(() =>{
      if(this.state.remainingTime === 0){
        this.nextQuestion({correct:false});
      } else {
        this.setState(prevState => {
          return {remainingTime: prevState.remainingTime - 1}});
      }
      },1000);
  }
 
  render () {
    return (
      <Card containerStyle={styles.container}>
        <Text>Remaining time :{this.state.remainingTime}</Text>
        {(this.state.currentState === start_page) ? 
          <>
            
            <Text style={styles.header}>DIG4639 Practice Quiz</Text>
            <Text style={styles.question}>Click below to begin!</Text>
            <Button 
              title="Start" 
              buttonStyle={styles.button} 
              onPress={ () => {
                this.setState({ currentState: question_page })
                this.countdownTimer()
            }}
            />
          </>
          : (this.state.currentQuestion < questions.length) ? 
            <>
              <Text style={styles.question}>{questions[this.state.currentQuestion].question}</Text>
              <View>
                {questions[this.state.currentQuestion].answers.map((ans, i) => {
                  return <Button title={ans.text} key={i} buttonStyle={styles.button} onPress={() => this.nextQuestion(ans)} />
                })}
              </View>
            </>
          : 
            
            <>
              <Text style={styles.score}>Score: {this.state.score}/{questions.length}</Text>
              <Button title="Start Over" buttonStyle={styles.button} onPress={() => this.setState({ currentState: start_page, currentQuestion: 0, score: 0 })}/>
            </>
        }
      </Card>
    )
  }
}