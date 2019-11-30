import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Image,AsyncStorage} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import ShowListPost from '../Option/ShowListPost';
import database from '../Database/Database';

export default class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      dataSource : [],
      user:'',
      detail:<ShowListPost dataSource={this.dataSource} checkLength={this.checkLength} click={this.onPressComment}/>,
    }
    this.onRealTime();
  }
  onRealTime = () =>{
    database.readPost(this.updateFeed);
    setTimeout(()=>{this.onRealTime()},1000);
  }
  onPressPost = () =>{
    this.props.navigation.navigate("PostScreen");
  }
  onPressComment = (name,text,id) =>{
    this.props.navigation.navigate("CommentScreen", {NamePost:name, Message: text, Idpost: id});
  }
  checkLength=(text)=>{
    var h = 70+(Math.ceil((text.length/26)-1)*20);
    return h;
  }
  updateFeed = (dataObj) =>{
    this.setState({dataSource:dataObj});
    this.setState({detail:<ShowListPost dataSource={dataObj} checkLength={this.checkLength} click={this.onPressComment}/>});
  }
  render() {
    return (

        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header="Social" props={this.props} backScreen="buttomFeed"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'#F0F0F0'}} >
            <View style={{flex:0.14}}>
              <View style={{flex:0.35,marginLeft:10,backgroundColor:'#F0F0F0',borderColor:'#D4D4D4',borderWidth:0.5}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#4E4E4E'}}>Feed</Text>
              </View>
              <View style={{flex:0.65,flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flex:0.1,margin:5,marginLeft:5, alignItems:'center', textAlign:'center'}}>
                  <View style={{flex:1}}/>
                  <Image source={{ uri: 'https://www.img.in.th/images/32d6f03bc7078e805110b8b60a2049a1.png' }} style={{ width: 25, height: 25}}></Image>
                  <View style={{flex:1}}/>
                </View>
                <View style={{flex:0.9,margin:5}}>
                  <View style={{flex:1}}/>
                  <Text style={{fontSize:16,color:'gray'}}>How are you doing to day?</Text>
                  <View style={{flex:1}}/>
                </View>
              </View>
            </View>
            <View style={{flex:0.11,backgroundColor:'#F0F0F0',borderColor:'#D4D4D4',borderWidth:0.5}}>
              <TouchableOpacity style={{flex:1,margin:12,marginLeft:17,marginRight:17,textAlign:'center',backgroundColor:'#D83256',borderRadius:50,elevation: 10}} onPress={()=>this.onPressPost()}>
                <View style={{flex:1}}/>
                <Text style={{color:'white',alignContent:'flex-start',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>POST</Text>
                <View style={{flex:1}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:0.75}}>
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
