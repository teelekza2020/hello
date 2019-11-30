import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,Image,AsyncStorage} from 'react-native';
import { SimpleLineIcons,Feather } from '@expo/vector-icons';
import database from '../Database/Database';

export default class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:'',
      pass:''
    }
    this.readAsyncStorage();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    const pass = await AsyncStorage.getItem('@Password_Fluid');
    if(user!=null && pass!=null){
      this.props.navigation.navigate("FeedScreen");
    }
  }
  onPressGotoRegisterPage = () =>{
    this.props.navigation.navigate("RegisterScreen");
  }
  onPressLogin = () =>{
    account = {
      UserName : this.state.user,
      Password : this.state.pass
    }
    if(account.UserName!='' && account.Password!=''){
      database.checkAccount(account,this.check_Account_success,this.check_Account_fail);
    }
    else{
      Alert.alert("กรอกข้อมูลให้ครบถ้วน");
    }
  }
  check_Account_success=async(account)=>{
    await AsyncStorage.setItem('@Username_Fluid', account.UserName);
    await AsyncStorage.setItem('@Password_Fluid', account.Password);
    this.props.navigation.navigate("FeedScreen");
  }
  check_Account_fail=()=>{
    Alert.alert("ข้อมูลไม่ถูกต้อง");
  }
  onChangeTextUser = user => this.setState({ user });
  onChangeTextPass = pass => this.setState({ pass });
  render() {
    return (
        <View style={{flex: 1,alignContent:'center',backgroundColor:'#1F1E30'}} >
          <View style={{flex:3.5, alignItems:'center', textAlign:'center'}}>
            <View style={{flex:1}}/>
            <Image source={{ uri: 'https://www.img.in.th/images/32d6f03bc7078e805110b8b60a2049a1.png' }} style={{ width: 130, height: 130}}></Image>
            <View style={{flex:0.3}}/>
          </View>
          <View style={{flex:1.5, alignItems:'center', textAlign:'center'}}>
            <View style={{flex:2}}/>
            <Image source={{ uri: 'https://www.img.in.th/images/05486add16a3b1648cb0ea6e79549698.png' }} style={{ width:200, height: 100}}></Image>
          </View>
          <View style={{flex:2.5}}>
            <View style={{flex:1,margin:10}}>
              <View style={{flex:1,marginTop:10,marginBottom:10}}>
                <View style={{flex:0.6,marginLeft:10,marginRight:10}}/>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <Feather style={{margin:10}} name={"mail"} size={25} color={'black'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput placeholder="Username" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextUser}>{this.state.user}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#1F1E30',marginLeft:10,marginRight:10,borderWidth:1,borderColor:'black'}}/>
              </View>
              <View style={{flex:1,marginBottom:10}}>
                <View style={{flex:0.6,marginLeft:10,marginRight:10}}/>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <SimpleLineIcons style={{margin:10}} name={"lock"} size={25} color={'black'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput secureTextEntry={true} placeholder="Password" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextPass}>{this.state.pass}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#1F1E30',marginLeft:10,marginRight:10,borderWidth:1,borderColor:'black'}}/>
              </View>
            </View>
          </View>
          <View style={{flex:1,flexDirection:'row',textAlign:'center' ,alignContent:'center'}}>
            <View style={{flex:1}}/>
            <View style={{flex:15}}>
              <TouchableOpacity style={{flex:1,backgroundColor:'#D83256',borderRadius:50,elevation: 10,textAlign:'center',margin:12,borderWidth:1,borderColor:'black'}} onPress={()=>this.onPressLogin()}>
                  <View style={{flex:1}}/>
                  <Text style={{color:'white',alignContent:'flex-start',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>LOG IN</Text>
                  <View style={{flex:1}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:1}}/>
          </View>
          <View style={{flex:1.5}}/>
          <View style={{flex:1,flexDirection:'row',textAlign:'center' ,alignContent:'center'}}>
            <View style={{flex:1.5,flexDirection:'row',alignContent:'flex-end'}}>
                <View style={{flex:1}}/>
                <Text style={styles.txt,{color:'gray',alignContent:'flex-end'}}>Don’t have an account? </Text>
            </View>
            <View style={{flex:1,flexDirection:'row',alignContent:'flex-start'}}>
                <TouchableOpacity onPress={()=>this.onPressGotoRegisterPage()}>
                    <Text style={styles.txt,{color:'white',alignContent:'flex-start'}}>Register</Text>
                </TouchableOpacity>
                <View style={{flex:1}}/>
            </View>
          </View>
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
      fontSize:10,
  },

})
