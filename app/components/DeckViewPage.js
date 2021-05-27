import React, {Component} from 'react'
import {View, Text, Alert, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import DeckPresentation from './DeckPresentation'
import DeckActions from './DeckActions'
import {handleRemoveDeck} from '../actions'
import {colors} from "../utils/helpers";

class DeckViewPage extends Component {
  componentDidMount() {
    const deck = this.getDeck()
    this.props.navigation.setOptions({title: deck.title})
  }

  getDeck() {
    const { deckId } = this.props.route.params
    return this.props.decks[deckId]
  }

  addCard() {
    const deck = this.getDeck()
    this.props.navigation.navigate(
      'AddCard', { deckId: deck.id }
    )
  }
  startQuiz() {
    const deck = this.getDeck()
    if (deck.cards.length == 0) {
      Alert.alert("No Cards", "Sorry this deck has no cards created yet.")
      return
    }
    this.props.navigation.navigate(
      'StartQuiz', { deckId: deck.id }
    )
  }
  removeDeck() {
    Alert.alert(
      "Remove Deck",
      "Are you sure you want to remove this Deck",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Remove", onPress: () => {
            const deck = this.getDeck()
            this.props.dispatch(handleRemoveDeck(deck.id))
            this.props.navigation.navigate("List")
          }
        }
      ]
    );
  }

  render() {
    const deck = this.getDeck()
    if (!deck) {
      return <View><Text>Missing Deck</Text></View>
    }
    return (
      <View style={styles.container}>
        <DeckPresentation deck={deck}></DeckPresentation>
        <DeckActions
          onAddCard={() => this.addCard()}
          onStartQuiz={() => this.startQuiz()}
          onRemoveDeck={() => this.removeDeck()}
        ></DeckActions>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
})

function mapStateToProps ({ decks }) {
  return { decks }
}
export default connect(mapStateToProps)(DeckViewPage)
