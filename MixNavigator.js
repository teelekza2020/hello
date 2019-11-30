import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Feed from './FeedPage.js';
import Comment from './CommentPage.js';
import Friends from './FriendsPage.js';
import Post from './PostPage.js';
import Chat from './ChatPage.js';
import FindFriends from './FindFriendsPage.js';
import Sensor from './SensorPage.js';
import Setting from './SettingPage.js';
import Login from './LoginPage.js';
import Register from './RegisterPage.js';
import Splash from './SplashPage.js';
import SplashSensor from './SplashSensorPage.js';
import SplashSetting from './SplashSettingPage.js';

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons,MaterialCommunityIcons,Ionicons,EvilIcons } from '@expo/vector-icons';

let seq = 0;

const switchsensor = createSwitchNavigator({
  SplashSensorScreen:{screen:SplashSensor,navigationOptions: {
  header: null}},
  SensorScreen:{screen:Sensor,navigationOptions: {
  header: null}},
});
const stackfeed = createStackNavigator({
  FeedScreen:{screen:Feed,navigationOptions: {
  header: null}},
});
const stackfriends = createStackNavigator({
  FriendsScreen:{screen:Friends,navigationOptions: {
  header: null}},
});
const stackfind = createStackNavigator({
  FindFriendsScreen:{screen:FindFriends,navigationOptions: {
  header: null}},
});
const stacksensor = createSwitchNavigator({
  SSsorScreen:{screen:SplashSensor,navigationOptions: {
  header: null}},
});
const stacksetting = createSwitchNavigator({
  SSettingScreen:{screen:SplashSetting,navigationOptions: {
  header: null}},
});
const BottomTab = createBottomTabNavigator({
    buttomFeed:{screen:stackfeed,navigationOptions: {
    title: 'Home'}},
    buttomFriends:{screen:stackfriends,navigationOptions: {
    title: 'Chats'}},
    buttomFind:{screen:stackfind,navigationOptions: {
    title: ''}},
    buttomSensor:{screen:stacksensor,navigationOptions: {
    title: 'Sensor'}},
    buttomSetting:{screen:stacksetting,navigationOptions: {
    title: 'Setting'}},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName, iconSize;
        if (routeName == 'buttomFeed') {
          iconName = 'home';
          iconSize = 35;
          return <MaterialIcons name={iconName} size={iconSize} color={tintColor} />;
        }
        else if (routeName == 'buttomFriends') {
          iconName = 'chat';
          iconSize = 30;
          return <MaterialIcons name={iconName} size={iconSize} color={tintColor} />;
        }
        else if(routeName == 'buttomFind'){
          iconName = 'plus-circle';
          iconSize = 60;
          if(seq%2==1)
            tintColor = '#D83256';
          else
            //tintColor = 'red';
            tintColor = '#D83256';
          seq++;
          return <MaterialCommunityIcons name={iconName} style={{marginTop:15}} size={iconSize} color={tintColor} />;
        }
        else if(routeName == 'buttomSensor'){
          iconName = 'ios-pulse';
          iconSize = 32;
          return <Ionicons name={iconName} size={iconSize} color={tintColor} />;
        }
        else if(routeName == 'buttomSetting'){
          iconName = 'gear';
          iconSize = 35;
          return <EvilIcons name={iconName} size={iconSize} color={tintColor} />;
        }
      },
    }),

    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#D83256',
      inactiveTintColor: 'gray',
      style:{margin:10},
      labelStyle:{fontSize:15},
      tabStyle:{height:50,width:5,opacity:.8,borderColor:null}
    }

})
const detail = createStackNavigator({
  DetailScreen:{screen:BottomTab,navigationOptions: {header:null}},
  PostScreen:{screen:Post,navigationOptions: {
  header: null}},
  CommentScreen:{screen:Comment,navigationOptions: {
  header: null}},
  ChatScreen:{screen:Chat,navigationOptions: {
  header: null}},
  SensorScreen:{screen:Sensor,navigationOptions: {
  header: null}},
  SettingScreen:{screen:Setting,navigationOptions: {
  header: null}},
});
const start = createStackNavigator({
  LoginScreen:{screen:Login,navigationOptions: {
  header: null}},
  RegisterScreen:{screen:Register,navigationOptions: {
  header: null}},
});
const navigate = createSwitchNavigator({
  SplashScreen:{screen:Splash,navigationOptions: {
  header: null}},
  HomeScreen:{screen:start,navigationOptions: {
  header: null}},
  DetailScreen:{screen:detail,navigationOptions: {
  header: null}},
});
export default createAppContainer(navigate);
