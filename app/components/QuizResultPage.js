import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {CommonActions} from '@react-navigation/native'
import {colors} from '../utils/helpers'

export default function QuizResultPage(props) {

  const { correctReplies, deck } = props.route.params

  const redoQuiz = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'List'
          },
          {
            name: 'View',
            params: {
              deckId: deck.id
            },
          },
          {
            name: 'StartQuiz',
            params: {
              deckId: deck.id
            },
          },
        ],
      })
    )
  }

  const viewDeck = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'List'
          },
          {
            name: 'View',
            params: {
              deckId: deck.id
            },
          },
        ],
      })
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`You have ${correctReplies} correct`}</Text>
      <Text style={styles.text}>{`over ${deck.cards.length} quizzes.`}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => redoQuiz()}
      >
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.blue}}
        onPress={() => viewDeck()}
      >
        <Text style={styles.buttonText}>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  button: {
    backgroundColor: colors.purple,
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
  text: {
    color: colors.blue,
    fontSize: 18,
    textAlign: 'center',
  },
})
