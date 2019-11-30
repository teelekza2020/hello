import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';

export default class SplashSensorPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        this.props.navigation.navigate("SettingScreen")
    );
  }
}

const styles = StyleSheet.create({
   btn:{
      alignItems: 'center',
      height:50,
      backgroundColor: '#86A8E7',
      padding: 10,
      margin:10,
      borderRadius: 50,
      borderColor:'white',
      borderWidth : 1
  },
  txt:{
      textAlign: 'center',
      fontSize:50
  },

})
