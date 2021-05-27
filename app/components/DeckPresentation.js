import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {colors} from "../utils/helpers";

export default function DeckPresentation(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{props.deck.title}</Text>
      <Text style={styles.smallText}>{props.deck.cards.length} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white
  },
  mainText: {
    color: colors.purple,
    fontSize: 22,
    textAlign: 'center',
  },
  smallText: {
    color: colors.gray,
    fontSize: 15,
    textAlign: 'center',
  },
})