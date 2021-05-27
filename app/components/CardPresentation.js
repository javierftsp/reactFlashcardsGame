import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {colors} from "../utils/helpers";

export default class CardPresentation extends Component {
  state = {
    cardFlipped: false,
    currentQuestion: ""
  }

  flipCard() {
    this.setState((currState) => (
      {cardFlipped: !currState.cardFlipped}
    ))
  }

  isANewCard(card) {
    const { currentQuestion } = this.state
    return currentQuestion !== card.question
  }

  shouldComponentUpdate(nextProps) {
    if (!this.isANewCard(nextProps.card)) {
      return true
    }
    if (!this.state.cardFlipped) {
      return true
    }
    this.setState({
      cardFlipped: false,
      currentQuestion: nextProps.card.question
    })
    return false
  }

  render() {
    const { cardFlipped } = this.state
    const { card } = this.props

    const field = cardFlipped ? "answer" : "question"

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{card[field]}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.flipCard()}>
          <Text style={styles.buttonText}>{ cardFlipped ? "View Question" : "View Answer" }</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white
  },
  button: {
    padding: 10,
    height: 25,
    marginTop: 10,
  },
  buttonText: {
    color: colors.orange,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: colors.purple,
    fontSize: 18,
    textAlign: 'center',
  }
})
