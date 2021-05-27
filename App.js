import React, {Component} from 'react'
import {View} from 'react-native'
import DecksListPage from './app/components/DecksListPage'
import DeckEditPage from './app/components/DeckEditPage'
import DeckViewPage from './app/components/DeckViewPage'
import CardEditPage from './app/components/CardEditPage'
import QuizViewPage from './app/components/QuizViewPage'
import QuizResultPage from './app/components/QuizResultPage'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {AntDesign} from '@expo/vector-icons'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './app/reducers'
import middleware from './app/middleware'
import { setLocalNotification } from './app/utils/helpers'

const HomeStack = createStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="List"
        component={DecksListPage}
        options={{title: 'Decks'}}
      />
      <HomeStack.Screen
        name="View"
        component={DeckViewPage}
      />
      <HomeStack.Screen
        name="AddCard"
        component={CardEditPage}
        options={{title: 'Add Card'}}
      />
      <HomeStack.Screen
        name="StartQuiz"
        component={QuizViewPage}
        options={{title: 'Quiz'}}
      />
      <HomeStack.Screen
        name="QuizResult"
        component={QuizResultPage}
        options={{title: 'Quiz Completed', headerLeft: null}}
      />
    </HomeStack.Navigator>
  )
}

const AddDeckStack = createStackNavigator()
function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen
        name="Add"
        component={DeckEditPage}
        options={{title: 'Add Deck'}}
      />
    </AddDeckStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    let store = createStore(reducer, middleware)
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                  let icons = {
                    'List': 'bars',
                    'Add': 'plussquareo'
                  }
                  let iconName = icons[route.name] || ''
                  return <AntDesign name={iconName} size={size} color={color}/>
                }
              })}
            >
              <Tab.Screen name="List" component={HomeStackScreen}/>
              <Tab.Screen name="Add" component={AddDeckStackScreen}/>
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}