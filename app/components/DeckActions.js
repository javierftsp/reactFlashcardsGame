import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {colors} from '../utils/helpers'

export default function DeckActions(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onAddCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.button, backgroundColor: colors.blue}} onPress={props.onStartQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.button, backgroundColor: colors.white}} onPress={props.onRemoveDeck}>
        <Text style={styles.linkText}>Delete Deck</Text>
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
  linkText: {
    color: colors.red,
    fontSize: 18,
    textAlign: 'center',
  }
})