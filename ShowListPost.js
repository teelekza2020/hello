import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text,FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

var text = 'What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?What are you doing?';
const ShowListPost = ({dataSource,length,click}) => (
  <View>
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
        <View style={{flex:1}}>
          <View style={{flex: 0.9,alignContent:'center', backgroundColor:'white'}}>
            <View style={{flex:0.45,alignContent:'center'}}>
              <Text style={{fontSize:20,marginLeft:25,marginTop:15,fontWeight:'bold'}}>{item[1].FirstName}</Text>
            </View>
            <View style={{flex:0.37,flexDirection:'row',alignContent:'center'}}>
              <View style={{flex:0.1}}/>
              <View style={{flex:0.75,margin:5,alignContent:'center'}}>
                <Text style={{color:'gray'}}>{(item[1].Message.length>110) ? item[1].Message.substring(0,110)+'...' : item[1].Message}</Text>
              </View>
              <View style={{flex:0.15}}/>
            </View>
            <View style={{flex:0.18,flexDirection:'row',alignContent:'center'}}>
              <View style={{flex:0.75}}/>
              <View style={{flex:0.25}}>
                <TouchableOpacity onPress={()=>click(item[1].FirstName,item[1].Message,item[0])}>
                  <View style={{flex:1,flexDirection:'row',alignContent:'center'}}>
                      <MaterialCommunityIcons style={{margin:2,marginBottom:10,marginLeft:20}} name={"comment-outline"} size={15} color={'#9C9C9C'} />
                      <Text style={{margin:2,marginBottom:10,fontSize:12,color:'#C8C8C8'}}>comment</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flex:0.1,alignContent:'center'}}>
            <View style={{flex:1,height: 15, backgroundColor:'#F0F0F0',borderColor:'#D4D4D4',borderWidth:0.5}}/>
          </View>
        </View>
      )}
      enableEmptySections={true}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);
export default ShowListPost

const styles = StyleSheet.create({
  txt:{
      width:200,
      fontSize:18,
      color:'black',
      margin:10,
  },

})
