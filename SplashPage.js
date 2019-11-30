import React from 'react';
import { StyleSheet, Text, View,Alert,Image,AsyncStorage} from 'react-native';
import database from '../Database/Database';

export default class SplashPage extends React.Component {

  constructor(props){
    super(props);
    this.readAsyncStorage();
    this.state = {
      user:'',
      pass:''
    }
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    const pass = await AsyncStorage.getItem('@Password_Fluid');
    if(user != null && pass != null){
      this.setState({user:user, pass:pass});
      account = {
        UserName : this.state.user,
        Password : this.state.pass
      }
      database.checkAccount(account,this.check_Account_success,this.check_Account_fail);
    }
    else{
      this.props.navigation.navigate("LoginScreen");
    }
  }
  check_Account_success=async(account)=>{
    this.props.navigation.navigate("FeedScreen");
  }
  check_Account_fail=()=>{
    Alert.alert("ข้อมูลไม่ถูกต้อง");
  }

  render() {
    return (
        <View style={{flex: 1,alignContent:'center',backgroundColor:'#1F1E30'}} >
          <View style={{flex:1, alignItems:'center', textAlign:'center'}}/>
          <View style={{flex:1, alignItems:'center', textAlign:'center'}}>
            <Image source={{ uri: 'https://www.img.in.th/images/32d6f03bc7078e805110b8b60a2049a1.png' }} style={{ width: 130, height: 130}}></Image>
            <View style={{flex:0.2}}/>
            <Image source={{ uri: 'https://www.img.in.th/images/2a4c9c2c95483bb2bfa3ab69d090a8f8.png' }} style={{ width: 100, height: 50}}></Image>
          </View>
          <View style={{flex:1, alignItems:'center', textAlign:'center'}}/>
        </View>
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
