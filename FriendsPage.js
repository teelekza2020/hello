import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,FlatList,Image,AsyncStorage} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShowLogoFind from '../Option/ShowLogoFind';
import ShowPerson from '../Option/ShowPerson';
import ShowListFriends from '../Option/ShowListFriends';
import database from '../Database/Database';

export default class FriendsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mydata : [],
      arrayholder : [],
      user:'',
      detail : <ShowListFriends dataSource={this.arrayholder} click={this.onPressFriend}/>,
    }
    this.readAsyncStorage();
    this.onRealTime();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    database.readMyData(user,this.dataFromMe);
    this.setState({user:user});
  }
  onRealTime = () =>{
    database.readFriends(this.state.user,this.updateFriends);
    setTimeout(()=>{this.onRealTime()},2000);
  }
  SearchFilterFunction = (text) => {
    const newData = this.state.arrayholder.filter(function(item) {
      const itemData = item.FirstName ? item.FirstName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({detail:<ShowListFriends dataSource={newData} click={this.onPressFriend}/>});
  }
  onPressFriend = (text) => {
    this.props.navigation.navigate('ChatScreen', {Friend : text});
  }
  dataFromMe=(dataObj)=>{
    this.setState({mydata:dataObj});
  }
  updateFriends=(dataObj)=>{
    this.setState({arrayholder:dataObj});
    this.setState({detail : <ShowListFriends dataSource={dataObj} click={this.onPressFriend}/>});
  }
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={"Chats"} props={this.props} backScreen="buttomFeed"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'white',marginTop:10}} >
            <View style={{flex: 0.5,alignContent:'center'}} >
              <View style={{flex: 1,flexDirection:'row',alignContent:'center',margin:7}}>
                <View style={{flex: 0.6,textAlign:'center',alignContent:'center'}} >
                  <Image source={{ uri: 'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png' }} style={{ width: 55, height: 55,marginLeft:2.5, borderRadius:100 }}></Image>
                </View>
                <View style={{flex: 3.4,textAlign:'center',alignContent:'center'}}>
                  <Text style={{height:50,width:200,fontSize:25,margin:7,color:'black',fontWeight: 'bold'}}>{this.state.mydata.FirstName}</Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.4,alignContent:'center'}} >
              <View style={{flex: 1,flexDirection:'row',alignContent:'center',backgroundColor:'#F0F0F0',margin:7,borderRadius:15}}>
                <View style={{flex: 0.45,textAlign:'center',alignContent:'center'}} >
                  <MaterialCommunityIcons style={{margin:10}} name={"magnify"} size={25} color={'#D4D4D4'} />
                </View>
                <View style={{flex: 3.55,textAlign:'center',alignContent:'center',marginRight:15}}>
                  <TextInput placeholder="Search my friends" style={{height:45,width:200,fontSize:18,marginLeft:3}} onChangeText={(text)=>this.SearchFilterFunction(text)}></TextInput>
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
      fontSize:50
  },

})
