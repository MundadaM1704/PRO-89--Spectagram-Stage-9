import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import DrawerNavigator from './navigation/DrawerNavigator';
import TabNavigator from './navigation/TabNavigator';
import StackNavigator from './navigation/StackNavigator';
import CreatePost from './screens/CreatePost';
import DashboardScreen from './screens/DashboardScreen';
import Feed from './screens/Feed';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';
import PostCard from './screens/PostCard';
import PostScreen from './screens/PostScreen';
import Profile from './screens/Profile';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}
