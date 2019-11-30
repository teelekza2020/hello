import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text,FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

chatFriends = (item,checkLength) => {
  return (
    <View style={{flexDirection:'row',alignContent:'flex-start',margin:10,height: checkLength(item[1].Message)}}>
      <View style={{textAlign:'center',alignContent:'center'}} >
        <View style={{flex:0.5}}/>
        <Image source={{ uri: 'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png' }} style={{ width: 40, height: 40, borderRadius:100,alignContent:'flex-start' }}></Image>
        <View style={{flex:1}}/>
      </View>
      <View style={{textAlign:'center',alignContent:'flex-start',backgroundColor:'#F0F0F0',borderRadius:20,margin:5,marginRight:55}} >
        <Text style={styles.txt2}>{item[1].Message}</Text>
      </View>
      <View style={{flex:1}}/>
    </View>
  );
};
chatMe = (item,checkLength) => {
  console.log(item[1].Message);
  return (
    <View style={{flexDirection:'row',alignContent:'flex-end',margin:10,height: checkLength(item[1].Message)}}>
      <View style={{flex:1}}/>
      <View style={{textAlign:'center',alignContent:'flex-end',backgroundColor:'#D83256',borderRadius:20,margin:5}} >
        <Text style={styles.txt}>{item[1].Message}</Text>
      </View>
    </View>
  );
};
const ShowListChat = ({dataSource,checkLength}) => (
  <View>
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
          (item[0]==1) ? this.chatMe(item,checkLength) : this.chatFriends(item,checkLength)
      )}
      enableEmptySections={true}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);
export default ShowListChat

const styles = StyleSheet.create({
  txt:{
      fontSize:18,
      color:'white',
      margin:10,
  },
  txt2:{
      fontSize:18,
      color:'black',
      margin:10,
  },

})
