import {RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD} from '../actions'
import {combineReducers} from 'redux'

export function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: {
          ...action.deck
        }
      }
    case REMOVE_DECK:
      return removeByKey(state, action.id)
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          ["cards"] : [
            ...state[action.deckId]["cards"],
            action.card
          ]
        }
      }
    default :
      return state
  }
}

function removeByKey (myObj, deleteKey) {
  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current]
      return result
    }, {})
}

export default combineReducers({decks})
