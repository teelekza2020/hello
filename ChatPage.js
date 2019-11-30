import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,FlatList,Image,AsyncStorage} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShowListChat from '../Option/ShowListChat';
import database from '../Database/Database';

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props)
    var friend = this.props.navigation.getParam('Friend','No-Friend');
    this.state = {
      friend : friend,
      user : '',
      dataSource : [],
      chat : '',
      detail:<ShowListChat dataSource={this.dataSource} checkLength={this.checkLength}/>,
    }
    this.readAsyncStorage();
    this.onRealTime();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    this.setState({user:user});
  }
  onRealTime = () =>{
    database.readChatFriends(this.state.user,this.state.friend,this.updateChats);
    setTimeout(()=>{this.onRealTime()},1000);
  }
  onPressSendMessage=()=>{
    database.addChat(this.state.user,this.state.friend,this.state.chat);
  }
  checkLength=(text)=>{
    var h = 60+(Math.ceil((text.length/28)-1)*20);
    return h;
  }
  updateChats=(dataObj)=>{
    this.setState({dataSource:dataObj});
    this.setState({detail : <ShowListChat dataSource={dataObj} checkLength={this.checkLength}/>});
  }
  onChangeTextChat = chat => this.setState({ chat });
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={this.state.friend.FirstName} props={this.props} backScreen="buttomFriends"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'white'}} >
            <View style={{flex: 3.6}}>
              {this.state.detail}
            </View>
            <View style={{flex: 0.4,textAlign:'center',alignContent:'center'}}>
              <View style={{flex: 1,flexDirection:'row',alignContent:'center',backgroundColor:'#F0F0F0',borderColor:'gray',borderWidth:1,margin:10,borderRadius:35}}>
                <View style={{flex: 3.53,textAlign:'center',alignContent:'center',marginRight:15}}>
                  <TextInput placeholder="Type a message..." style={{height:45,width:330,fontSize:18,marginLeft:10}} onChangeText={this.onChangeTextChat}>{this.state.chat}</TextInput>
                </View>
                <View style={{flex: 0.47,textAlign:'center',alignContent:'center'}} >
                  <View style={{flex:1}}/>
                  <TouchableOpacity style={{borderRadius:100}} onPress={()=>this.onPressSendMessage()}>
                    <Image source={{ uri: 'https://www.img.in.th/images/1c04464430f769d81475bcc0134f7578.png' }} style={{ width: 40, height: 40, borderRadius:100,alignContent:'flex-start' }}></Image>
                  </TouchableOpacity>
                  <View style={{flex:1}}/>
                </View>
              </View>
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
