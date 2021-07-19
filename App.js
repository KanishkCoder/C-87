import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateStory from './screens/CreateStory';
import Feed from './screens/Feed';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerNavigator from './navigation/DrawerNavigator'


import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen'
import Loading from './screens/LoadingScreen'
import Dashboard from './screens/DashboardScreen'

import * as firebase from 'firebase'
import { firebaseConfig } from './config';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const appSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return (
    <AppNavigator/>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/