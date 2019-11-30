import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,FlatList,Image} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShowLogoFind from '../Option/ShowLogoFind';
import ShowPerson from '../Option/ShowPerson';
import ShowListFindFriends from '../Option/ShowListFindFriends';
import database from '../Database/Database';

export default class FindFriendsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pass:'',
      detail : <ShowLogoFind/>,
      mydata : [],
      arrayholder : [],
    }
    this.readAsyncStorage();
    this.onRealTime();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    database.readMyData(user,this.dataFromMe);
  }
  onRealTime = () =>{
    database.readPerson(this.state.user,this.updatePerson);
    setTimeout(()=>{this.onRealTime()},2000);
  }
  dataFromMe=(dataObj)=>{
    this.setState({mydata:dataObj});
  }
  SearchFilterFunction = (text) => {
    if(text == "")
      this.setState({detail:<ShowLogoFind/>});
    else{
      const newData = this.state.arrayholder.filter(function(item) {
        const itemData = item.FirstName ? item.FirstName.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({detail:<ShowListFindFriends dataSource={newData} click={this.onPressPerson}/>});
    }
  }
  onPressPerson = (text) => {
    this.setState({detail:<ShowPerson dataSource={text} click={this.addFriends} click2={this.deleteFriends}/>});
  }
  addFriends=(friends)=>{
    database.addFriends(this.state.mydata,friends,this.add_Success);
  }
  add_Success=()=>{
    Alert.alert("เพิ่มเพื่อนสำเร็จ")
  }
  deleteFriends=(friends)=>{
    database.deleteFriends(this.state.mydata,friends,this.add_Success);
  }
  delete_Success=()=>{
    Alert.alert("ลบเพื่อนสำเร็จ")
  }
  updatePerson=(dataObj)=>{
    this.setState({arrayholder:dataObj})
    console.log(this.state.arrayholder);
  }
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={"Social"} props={this.props} backScreen="buttomFriends"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'white',marginTop:10}} >
            <View style={{flex: 0.4,alignContent:'center'}} >
              <View style={{flex: 1,flexDirection:'row',alignContent:'center',backgroundColor:'#F0F0F0',margin:7,borderRadius:15}}>
                <View style={{flex: 0.45,textAlign:'center',alignContent:'center'}} >
                  <MaterialCommunityIcons style={{margin:10}} name={"magnify"} size={25} color={'#D4D4D4'} />
                </View>
                <View style={{flex: 3.55,textAlign:'center',alignContent:'center',marginRight:15}}>
                  <TextInput placeholder="Search Fluid" style={{height:45,width:200,fontSize:18,marginLeft:3}} onChangeText={(text)=>this.SearchFilterFunction(text)}></TextInput>
                </View>
              </View>
            </View>
            <View style={{flex: 3.6,textAlign:'center',alignContent:'center'}} >
                {this.state.detail}
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
      fontSize:13,
      color:'#D4D4D4',
  },

})
