import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,Image,ScrollView,AsyncStorage} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import ShowListComment from '../Option/ShowListComment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import database from '../Database/Database';

export default class CommentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource : [],
      name : '',
      user : '',
      message : '',
      comment : '',
      idpost:'',
      detail:<ShowListComment dataSource={this.dataSource} checkLength={this.checkLength}/>,
    }
    this.readAsyncStorage();
  }
  componentDidMount(){
    const { navigation } = this.props;
    var namepost = navigation.getParam('NamePost','No-User');
    var text = navigation.getParam('Message','No-Message');
    var idpost = navigation.getParam('Idpost','No-ID');
    this.setState({name:namepost, message:text, idpost:idpost});
    this.onRealTime();
  }
  readAsyncStorage=async()=>{
    const user = await AsyncStorage.getItem('@Username_Fluid');
    this.setState({user:user});
  }
  onRealTime = () =>{
    database.readComment(this.state.idpost,this.updateComment);
    setTimeout(()=>{this.onRealTime()},1000);
  }
  checkLength=(text)=>{
    var h = 70+(Math.ceil((text.length/26)-1)*20);
    return h;
  }
  onPressSendComment = () =>{
    database.createComment(this.state.idpost,this.state.user,this.state.comment,this.Comment_success);
  }
  Comment_Success=()=>{
    this.updateComment();
  }
  updateComment=(dataObj)=>{
    this.setState({dataSource:dataObj});
    this.setState({detail:<ShowListComment dataSource={dataObj} checkLength={this.checkLength}/>});
  }
  onChangeTextComment = comment => this.setState({ comment });
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={"Post"} props={this.props} backScreen="buttomFeed"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'white'}} >
            <View style={{flex:0.3}}>
              <View style={{flex:0.8}}>
                <View style={{flex:0.5}}>
                  <View style={{flex: 1,flexDirection:'row',alignContent:'center',margin:7,height: 60}}>
                    <View style={{flex: 0.6,textAlign:'center',alignContent:'center'}} >
                      <Image source={{ uri: 'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png' }} style={{ width: 55, height: 55,marginLeft:7.5,marginTop:10 , borderRadius:100 }}></Image>
                    </View>
                    <View style={{flex: 3.4,textAlign:'center',alignContent:'center',marginRight:15}}>
                      <Text style={{height:50,width:200,fontSize:18,margin:7,marginTop:26,marginLeft:15,color:'black',fontWeight: 'bold'}}>{this.state.name}</Text>
                    </View>
                  </View>
                </View>
                <ScrollView style={{flex:5,marginTop:40,marginLeft:15,marginRight:15}}>
                  <Text style={{fontSize:16}}>{this.state.message}</Text>
                </ScrollView>
              </View>
              <View style={{flex:0.2}}>
                <View style={{flex:0.1,backgroundColor:'#F0F0F0'}}/>
                <View style={{flex:0.8,flexDirection:'row',backgroundColor:'white'}}>
                  <MaterialCommunityIcons style={{margin:5,marginLeft:20}} name={"comment-outline"} size={20} color={'#626262'} />
                  <Text style={{margin:5,fontSize:15,color:'#787878'}}>comment</Text>
                </View>
                <View style={{flex:0.1,backgroundColor:'#F0F0F0'}}/>
              </View>
            </View>
            <View style={{flex:0.6}}>
              {this.state.detail}
            </View>
            <View style={{flex:0.1}}>
              <View style={{flex: 1,flexDirection:'row',alignContent:'center',backgroundColor:'#F0F0F0',borderColor:'gray',borderWidth:1,margin:10,borderRadius:35}}>
                <View style={{flex: 3.53,textAlign:'center',alignContent:'center',marginRight:15}}>
                  <TextInput placeholder="Comment..." style={{height:45,width:330,fontSize:18,marginLeft:10}} onChangeText={this.onChangeTextComment}>{this.state.comment}</TextInput>
                </View>
                <View style={{flex: 0.47,textAlign:'center',alignContent:'center'}} >
                  <View style={{flex:1}}/>
                  <TouchableOpacity style={{borderRadius:100}} onPress={()=>this.onPressSendComment()}>
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
