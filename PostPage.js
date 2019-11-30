import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,Image,ScrollView,AsyncStorage} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import ShowListComment from '../Option/ShowListComment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import database from '../Database/Database';

export default class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : '',
      text : '',
    }
    this.readAsyncStorage();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    this.setState({user:user});
  }
  onPressPost = () => {
    database.createPost(this.state.user,this.state.text,this.Post_success,this.Post_fail);
  }
  Post_success= () =>{
    Alert.alert("โพสสำเร็จแล้ว")
    this.props.navigation.navigate('FeedScreen');
  }
  Post_fail= () =>{

  }
  onChangeTextPost = text => this.setState({ text });
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={"Post"} props={this.props} backScreen="buttomFeed"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'white'}} >
            <View style={{flex:0.9}}>
              <ScrollView style={{flex:1,marginTop:10,marginLeft:15,marginRight:15}}>
                <Text style={{fontSize:16}}>{this.state.text}</Text>
              </ScrollView>
            </View>
            <View style={{flex:0.1}}>
              <View style={{flex: 1,flexDirection:'row',alignContent:'center',backgroundColor:'#F0F0F0',borderColor:'gray',borderWidth:1,margin:10,borderRadius:35}}>
                <View style={{flex: 3.53,textAlign:'center',alignContent:'center',marginRight:15}}>
                  <TextInput placeholder="Type a message...." style={{height:45,width:330,fontSize:18,marginLeft:10}} onChangeText={this.onChangeTextPost}>{this.state.text}</TextInput>
                </View>
                <View style={{flex: 0.47,textAlign:'center',alignContent:'center'}} >
                  <View style={{flex:1}}/>
                  <TouchableOpacity style={{borderRadius:100}} onPress={()=>this.onPressPost()}>
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
