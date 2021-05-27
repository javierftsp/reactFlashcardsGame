import {getDecks, addDeck, removeDeck, addCard} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

function _receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks()
      .then(({decks}) => {
        dispatch(_receiveDecks(decks))
      })
  }
}

function _addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function handleAddDeck (deck) {
  return (dispatch, getState) => {
    return addDeck(deck)
      .then(() => dispatch(_addDeck(deck)))
  }

}

function _removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  }
}

export function handleRemoveDeck (id) {
  return (dispatch, getState) => {
    return removeDeck(id)
      .then(() => dispatch(_removeDeck(id)))
  }
}

function _addCard(card, deckId) {
  return {
    type: ADD_CARD,
    card,
    deckId,
  }
}

export function handleAddCard (card, deckId) {
  return (dispatch, getState) => {
    return addCard(card, deckId)
      .then(() => dispatch(_addCard(card, deckId)))
  }
}
