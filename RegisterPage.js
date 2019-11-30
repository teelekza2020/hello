import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Image,TextInput} from 'react-native';
import { Ionicons,SimpleLineIcons,Feather,FontAwesome  } from '@expo/vector-icons';
import HeaderNavigationBar from './HeaderNavigationBar';
import database from '../Database/Database';

export default class RegisterPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      user:'',
      pass:'',
      conpass:'',
      phone:'',
    }
  }
  onPressRegister = () =>{
    account = {
      FirstName : this.state.name,
      UserName : this.state.user,
      Password : this.state.pass,
      PhoneNumber : this.state.phone,
    }
    if(account.FirstName!='' && account.UserName!='' && account.Password!='' && this.state.conpass!='' && account.PhoneNumber!='' ){
      if(account.Password==this.state.conpass){
        database.createAccount(account,this.add_Account_success,this.add_Account_fail);
      }
      else{
        Alert.alert("รหัสผ่านไม่ตรงกัน");
        this.setState({ pass:'', conpass:'' });
      }
    }
    else{
      Alert.alert("กรอกข้อมูลให้ครบถ้วน");
    }
  }
  add_Account_success = () =>{
    Alert.alert("บันทึกข้อมูลสำเร็จ");
    this.props.navigation.navigate("LoginScreen");
  }
  add_Account_fail = () =>{
    Alert.alert("มีชื่อผู้ใช้นี้อยู่แล้ว");
  }
  onChangeTextName = name => this.setState({ name });
  onChangeTextUser = user => this.setState({ user });
  onChangeTextPass = pass => this.setState({ pass });
  onChangeTextConpass = conpass => this.setState({ conpass });
  onChangeTextPhone = phone => this.setState({ phone });
  render() {
    return (
      <View style={{flex: 1,alignContent:'center'}} >
        <HeaderNavigationBar header={""} props={this.props} backScreen="LoginScreen"/>
        <View style={{flex: 1,alignContent:'center',backgroundColor:'#1F1E30'}}>
          <View style={{flex:2.5, alignItems:'center', textAlign:'center'}}>
            <View style={{flex:1}}/>
            <Image source={{ uri: 'https://www.img.in.th/images/d1748057a35ea2b31da2af70126adb6c.png' }} style={{ width:200, height: 100}}></Image>
            <View style={{flex:0.3}}/>
          </View>
          <View style={{flex:5}}>
            <View style={{flex:1,margin:10}}>
              <View style={{flex:1,marginTop:10,marginBottom:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <Feather style={{margin:10}} name={"user"} size={25} color={'#B2B2B2'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput placeholder="Fullname" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextName}>{this.state.name}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#322E53',marginLeft:10,marginRight:10}}/>
              </View>
              <View style={{flex:1,marginBottom:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <Feather style={{margin:10}} name={"mail"} size={25} color={'#B2B2B2'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput placeholder="Username" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextUser}>{this.state.user}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#322E53',marginLeft:10,marginRight:10}}/>
              </View>
              <View style={{flex:1,marginTop:10,marginBottom:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <SimpleLineIcons style={{margin:10}} name={"lock"} size={25} color={'#B2B2B2'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput secureTextEntry={true} placeholder="Password" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextPass}>{this.state.pass}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#322E53',marginLeft:10,marginRight:10}}/>
              </View>
              <View style={{flex:1,marginTop:10,marginBottom:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <SimpleLineIcons style={{margin:10}} name={"lock"} size={25} color={'#B2B2B2'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput secureTextEntry={true} placeholder="Confirm password" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextConpass}>{this.state.conpass}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#322E53',marginLeft:10,marginRight:10}}/>
              </View>
              <View style={{flex:1,marginTop:10,marginBottom:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <FontAwesome style={{marginLeft:15,marginTop:5}} name={"mobile-phone"} size={35} color={'#B2B2B2'} />
                  </View>
                  <View style={{flex:6}}>
                    <TextInput placeholder="Phone number" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left',color:'white'}} onChangeText={this.onChangeTextPhone}>{this.state.phone}</TextInput>
                  </View>
                </View>
                <View style={{flex:0.05,backgroundColor:'#322E53',marginLeft:10,marginRight:10}}/>
              </View>
            </View>
          </View>
          <View style={{flex:0.5}}/>
          <View style={{flex:1,flexDirection:'row',textAlign:'center' ,alignContent:'center'}}>
            <View style={{flex:1}}/>
            <View style={{flex:15}}>
              <TouchableOpacity style={{flex:1,backgroundColor:'#D83256',borderRadius:50,elevation: 10,textAlign:'center',margin:5,borderWidth:1,borderColor:'black'}} onPress={()=>this.onPressRegister()}>
                  <View style={{flex:1}}/>
                  <Text style={{color:'white',alignContent:'flex-start',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>REGISTER</Text>
                  <View style={{flex:1}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:1}}/>
          </View>
          <View style={{flex:1.5}}/>
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
      fontSize:50
  },

})
