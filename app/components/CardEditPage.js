import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Switch, Alert} from 'react-native'
import {connect} from 'react-redux'
import {handleAddCard, handleAddDeck} from '../actions';
import {colors} from '../utils/helpers';

class CardEditPage extends Component {
  state = {
    question: "",
    answer: "",
    answerIsCorrect: false
  }

  handleQuestionChange(value) {
    this.setState(_ => (
      {question: value}
    ))
  }
  handleAnswerChange(value) {
    this.setState(_ => (
      {answer: value}
    ))
  }
  handleSwitchChange(value) {
    this.setState(_ => (
      {answerIsCorrect: value}
    ))
  }

  handleSubmit = () => {
    const {question, answer, answerIsCorrect} = this.state
    const { deckId } = this.props.route.params
    const card = {
      question: question.trim(),
      answer: answer.trim(),
      answerIsCorrect
    }
    if (!card.question) {
      Alert.alert("Required field", "Please enter the Card Question")
      return
    }
    if (!card.answer) {
      Alert.alert("Required field", "Please enter the Card Answer")
      return
    }

    this.props.dispatch(handleAddCard(card, deckId)).then(() => {
      this.props.navigation.navigate('View', { deckId: deckId })
    })

    this.handleQuestionChange("")
    this.handleAnswerChange("")
    this.handleSwitchChange(false)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please fill in the Card information</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Card Question"
          value={this.state.question}
          onChangeText={(v) => this.handleQuestionChange(v)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Card Anwser"
          value={this.state.answer}
          onChangeText={(v) => this.handleAnswerChange(v)}
        />
        <View style={styles.switchInput}>
          <Text style={styles.switchInputText}>is the answer correct?</Text>
          <Switch
            value={this.state.answerIsCorrect}
            onValueChange={(v) => this.handleSwitchChange(v)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Save</Text>
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
  text: {
    color: colors.blue,
    fontSize: 18,
    textAlign: 'center',
  },
  textInput: {
    fontSize: 20,
    borderColor: colors.blue,
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 45,
  },
  switchInput: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  switchInputText: {
    color: colors.gray,
    fontSize: 18,
  }
})

function mapStateToProps ({ decks }) {
  return { decks }
}
export default connect(mapStateToProps)(CardEditPage)
