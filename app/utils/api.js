import {AsyncStorage} from 'react-native'

const DECKS_STORAGE_KEY = 'FlashcardsGame.Decks_test13'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function addDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = formatDeckResults(results)
      data["decks"][deck.id] = deck
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let data = formatDeckResults(results)
      data["decks"][id] = undefined
      delete data["decks"][id]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCard(card, deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = formatDeckResults(results)
      data["decks"][deckId].cards.push(card)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

function formatDeckResults(results) {
  return results === null
    ? getInitialData()
    : JSON.parse(results)
}

function getInitialData() {
  return {
    decks: {
      "56747f5c8f884b0ba56e63f02b1e": {
        id: "56747f5c8f884b0ba56e63f02b1e",
        title: 'Deck 1',
        cards: [
          {
            question: 'Q 1',
            answer: 'A 3',
            answerIsCorrect: false
          },
          {
            question: 'Q 2',
            answer: 'A 2',
            answerIsCorrect: true
          },
          {
            question: 'Q 3',
            answer: 'A 1',
            answerIsCorrect: false
          }
        ]
      },
      "5351d12d4ec2c847bd24ea0d4c245": {
        id: "5351d12d4ec2c847bd24ea0d4c245",
        title: 'Deck 2',
        cards: []
      }
    }
  }
}
