import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import DeckPresentation from './DeckPresentation'
import {handleInitialData} from '../actions'
import {colors} from "../utils/helpers";

class DecksListPage extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    let {decks} = this.props

    if (!decks) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          {Object.values(decks).map((deck) => (
            <TouchableOpacity key={deck.id} onPress={() => this.props.navigation.navigate(
              'View', { deckId: deck.id }
            )}>
              <DeckPresentation deck={deck}></DeckPresentation>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
})

function mapStateToProps ({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(DecksListPage)
