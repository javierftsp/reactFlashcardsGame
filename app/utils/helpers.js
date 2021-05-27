import React from 'react'
import uuid from 'react-uuid'
import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'FlashcardsGame:Notifications'

export function createUuid() {
  return uuid().split("-").join("");
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: createNotificationTrigger()
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

function createNotification () {
  return {
    title: 'Complete your quiz!',
    body: "👋 don't forget to complete your quiz for today!",
  }
}

function createNotificationTrigger() {
  return {
    hour: 20,
    minutes: 0,
    repeats: true,
  }
}

export let colors = {
  gray: '#757575',
  red: '#b71845',
  blue: '#4e4cb8',
  white: '#ffffff',
  purple: '#292477',
  orange: '#f26f28',
}

