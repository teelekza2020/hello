import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Image,TextInput,AsyncStorage} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import { Feather,Foundation,Ionicons,SimpleLineIcons,FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import database from '../Database/Database';

export default class SettingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mydata : [],
      name:'',
      user:'',
      pass:'',
      conpass:'',
      phone:'',
      image:'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png',
    }
    this.readAsyncStorage();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    database.readMyData(user,this.dataFromMe);
    this.setState({user:user});
  }
  dataFromMe=(dataObj)=>{
    this.setState({mydata:dataObj, name:dataObj.FirstName, user:dataObj.UserName, pass:dataObj.Password, conpass:dataObj.Password, phone:dataObj.PhoneNumber});
  }

  onPressLogOut = () =>{
    this.setAsyncStorage();
    this.props.navigation.navigate("SplashScreen");
  }
  onPressSave = () =>{
    account = {
      FirstName:this.state.name,
      Password:this.state.pass,
      PhoneNumber:this.state.phone,
    }
    if(account.FirstName!='' && account.Password!='' && this.state.conpass!='' && account.PhoneNumber!='' ){
      if(account.Password==this.state.conpass){
        database.updateProfile(this.state.user,account,this.Update_success);
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
  Update_success = () =>{
    Alert.alert("แก้ไขข้อมูลสำเร็จ");
    database.readMyData(this.state.user,this.dataFromMe);
  }

  setAsyncStorage=async()=>{
    await AsyncStorage.setItem('@Username_Fluid', null);
    await AsyncStorage.setItem('@Password_Fluid', null);
  }
  onChangeTextName = name => this.setState({ name });
  onChangeTextPass = pass => this.setState({ pass });
  onChangeTextConpass = conpass => this.setState({ conpass });
  onChangeTextPhone = phone => this.setState({ phone });
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={"Settings"} props={this.props} backScreen="LoginScreen"/>
          <View style={{flex: 1,alignContent:'center'}} >
            <View style={{flex: 0.32,alignContent:'center',backgroundColor:'#1F1E30'}} >
              <View style={{flex:0.5}}/>
              <View style={{flex:5.5,flexDirection:'row',alignContent:'center'}}>
                <View style={{flex:0.5}}/>
                <View style={{flex:1.5,textAlign:'center',alignContent:'center'}}>
                  <TouchableOpacity style={{borderRadius:150,textAlign:'center',alignContent:'center'}} >
                    <Image source={{ uri: this.state.image }} style={{ width: 150, height: 150,marginLeft:50,marginRight:50,alignContent:'center' , borderRadius:100 }}></Image>
                  </TouchableOpacity>
                  <Text style={{fontSize:18,margin:10,fontWeight:'bold',color:'white',textAlign:'center',alignContent:'center'}}>{this.state.mydata.FirstName}</Text>
                </View>
                <View style={{flex:0.5}}/>
              </View>
              <View style={{flex:0.5}}/>
            </View>
            <View style={{flex: 0.58,alignContent:'center',backgroundColor:'white'}} >
              <View style={{flex:3}}>
                <View style={{flex:1,margin:10}}>
                  <View style={{flex:1,marginTop:10,marginBottom:10}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <Feather style={{margin:5,marginLeft:5}} name={"user"} size={25} color={'#595959'} />
                      </View>
                      <View style={{flex:6}}>
                        <TextInput placeholder={this.state.mydata.FirstName} placeholderTextColor="#595959" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left'}} onChangeText={this.onChangeTextName}></TextInput>
                      </View>
                    </View>
                    <View style={{flex:0.05,backgroundColor:'#F0F0F0',marginLeft:10,marginRight:10}}/>
                  </View>
                  <View style={{flex:1,marginBottom:10}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <Feather style={{margin:5,marginLeft:5}} name={"mail"} size={25} color={'#595959'} />
                      </View>
                      <View style={{flex:6}}>
                        <Text style={{flex:1,fontSize:18,marginLeft:3,marginTop:7,textAlign:'left'}}>{this.state.mydata.UserName}</Text>
                      </View>
                    </View>
                    <View style={{flex:0.05,backgroundColor:'#F0F0F0',marginLeft:10,marginRight:10}}/>
                  </View>
                  <View style={{flex:1,marginTop:10,marginBottom:10}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <SimpleLineIcons style={{margin:5,marginLeft:5}} name={"lock"} size={25} color={'#595959'} />
                      </View>
                      <View style={{flex:6}}>
                        <TextInput secureTextEntry={true} placeholder={this.state.mydata.Password} placeholderTextColor="#595959" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left'}} onChangeText={this.onChangeTextPass}></TextInput>
                      </View>
                    </View>
                    <View style={{flex:0.05,backgroundColor:'#F0F0F0',marginLeft:10,marginRight:10}}/>
                  </View>
                  <View style={{flex:1,marginTop:10,marginBottom:10}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <SimpleLineIcons style={{margin:5,marginLeft:5}} name={"lock"} size={25} color={'#595959'} />
                      </View>
                      <View style={{flex:6}}>
                        <TextInput secureTextEntry={true} placeholder={this.state.mydata.Password} placeholderTextColor="#595959" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left'}} onChangeText={this.onChangeTextConpass}></TextInput>
                      </View>
                    </View>
                    <View style={{flex:0.05,backgroundColor:'#F0F0F0',marginLeft:10,marginRight:10}}/>
                  </View>
                  <View style={{flex:1,marginTop:10,marginBottom:10}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <FontAwesome style={{marginLeft:10}} name={"mobile-phone"} size={35} color={'#595959'} />
                      </View>
                      <View style={{flex:6}}>
                        <TextInput placeholder={this.state.mydata.PhoneNumber} placeholderTextColor="#595959" style={{flex:1,fontSize:18,marginLeft:3,textAlign:'left'}} onChangeText={this.onChangeTextPhone}></TextInput>
                      </View>
                    </View>
                    <View style={{flex:0.05,backgroundColor:'#F0F0F0',marginLeft:10,marginRight:10}}/>
                  </View>
                </View>
              </View>
              <View style={{flex:1.2}}>
                <View style={{flex:0.25}}/>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}/>
                  <View style={{flex:1,alignContent:'center'}}>
                    <TouchableOpacity style={{flex:1,margin:12,backgroundColor:'#D83256',elevation: 10,borderRadius:50,textAlign:'center',alignContent:'center'}} onPress={()=>this.onPressSave()}>
                      <View style={{flex:1,marginLeft:8,flexDirection:'row',alignContent:'center',textAlign:'center'}}>
                        <Foundation style={{margin:12}} name={"check"} size={20} color={'white'} />
                        <Text style={{marginTop:10,fontSize:18,fontWeight:'bold',color:'white',textAlign:'center'}}>Save</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:1}}/>
                </View>
                <View style={{flex:0.25}}/>
              </View>
            </View>
            <View style={{flex:0.001,borderWidth:0.7, borderColor:'#D4D4D4', backgroundColor:'#F0F0F0'}}/>
            <TouchableOpacity style={{flex: 0.1,alignContent:'center'}} onPress={()=>this.onPressLogOut()}>
            <View style={{flex: 1,flexDirection:'row',alignContent:'center'}} >
                <View style={{flex: 1,alignContent:'center'}} >
                </View>
                <View style={{flex: 1,alignContent:'center'}} >
                  <View style={{flex: 1}}/>
                  <View style={{flex: 1,flexDirection:'row'}}>
                    <View style={{flex: 1}}/>
                    <Feather style={{margin:2}} name={"log-out"} size={20} color={'#717171'} />
                    <Text style={{fontSize:18, fontWeight:'bold', color:'#717171', textAlign:'center'}}>Logout</Text>
                    <View style={{flex: 1}}/>
                  </View>
                  <View style={{flex: 1}}/>
                </View>
                <View style={{flex: 1,alignContent:'center'}} >
                </View>
            </View>
            </TouchableOpacity>
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
