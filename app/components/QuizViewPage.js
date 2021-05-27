import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import CardPresentation from './CardPresentation'
import {CommonActions} from "@react-navigation/native";
import {clearLocalNotification, colors, setLocalNotification} from "../utils/helpers";

class QuizViewPage extends Component {
  state = {
    currentCard: 0
  }

  correctReplies = 0

  getDeck() {
    const { deckId } = this.props.route.params
    return this.props.decks[deckId]
  }

  processReply(value) {
    const { currentCard } = this.state
    const deck = this.getDeck()
    const card = deck.cards[currentCard]
    if (card.answerIsCorrect === value) {
      this.correctReplies++;
    }

    if (currentCard < deck.cards.length - 1) {
      this.setState((currState) => (
        {currentCard: currState.currentCard + 1}
      ))
      return
    }

    this.completeQuiz()
  }

  completeQuiz() {
    clearLocalNotification()
      .then(setLocalNotification)

    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'List'
          },
          {
            name: 'QuizResult',
            params: {
              deck: this.getDeck(),
              correctReplies: this.correctReplies
            },
          },
        ],
      })
    )
  }

  render() {
    const { currentCard } = this.state
    const deck = this.getDeck()
    const card = deck.cards[currentCard]

    return (
    <View style={styles.container}>
      <Text>{currentCard+1} / {deck.cards.length}</Text>
      <CardPresentation card={card} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.processReply(true)}
      >
        <Text style={styles.buttonText}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.red}}
        onPress={() => this.processReply(false)}
      >
        <Text style={styles.buttonText}>Incorrect</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 8,
    height: 45,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
})

function mapStateToProps ({ decks }) {
  return { decks }
}
export default connect(mapStateToProps)(QuizViewPage)
