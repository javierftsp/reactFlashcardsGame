import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {handleAddDeck} from '../actions'
import {createUuid, colors} from '../utils/helpers'

class DeckEditPage extends Component {
  state = {
    title: ""
  }

  handleChange = (value) => {
    this.setState(_ => (
      {title: value}
    ))
  }

  handleSubmit = () => {
    let title = this.state.title.trim()
    if (!title) {
      Alert.alert("Required field", "Please enter the Deck Title")
      return
    }
    this.handleChange("")
    let deck = {
      id: createUuid(),
      title: title,
      cards: []
    }
    this.props.dispatch(handleAddDeck(deck)).then(() => {
      this.props.navigation.navigate('View', { deckId: deck.id })
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please enter the Deck Title</Text>
        <TextInput style={styles.textInput} placeholder="Deck Title" value={this.state.title} onChangeText={this.handleChange}/>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text  style={styles.buttonText} >Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    color: colors.purple,
    fontSize: 18,
    textAlign: 'center',
  },
  textInput: {
    fontSize: 20,
    borderColor: colors.purple,
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 45,
  }
})

function mapStateToProps ({ decks }) {
  return { decks }
}
export default connect(mapStateToProps)(DeckEditPage)
