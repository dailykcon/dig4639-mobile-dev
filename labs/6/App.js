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
import Timer from './Timer'

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 350,
    marginRight: 540,
    width: 750,
    textAlign: "center"
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
  constructor (props) {
    super()
    this.state = {
      currentState: start_page,
      currentQuestion: 0,
      score: 0
    }
  }

  nextQuestion (x) {
    if (x.correct) {
      this.setState({ score: this.state.score + 1 })
    }
      this.setState({ currentQuestion: this.state.currentQuestion + 1 })
  }

  render () {
    return (
      <Card containerStyle={styles.container}>
        {(this.state.currentState === start_page) ? 

          <>
            <Timer />
            <Text style={styles.header}>DIG4639 Practice Quiz</Text>
            <Text style={styles.question}>Click below to begin!</Text>
            <Button 
              title="Start" 
              buttonStyle={styles.button} 
              onPress={ () => this.setState({ currentState: question_page })}
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