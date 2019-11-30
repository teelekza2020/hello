import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text,FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ShowListFriends = ({dataSource,click}) => (
  <View>
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
        <View style={{flex:1}}>
          <View style={{flex: 1,flexDirection:'row',alignContent:'center',margin:7,height: 60}}>
            <View style={{flex: 0.6,textAlign:'center',alignContent:'center'}} >
              <Image source={{ uri: 'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png' }} style={{ width: 55, height: 55,marginLeft:2.5,marginTop:10 , borderRadius:100 }}></Image>
            </View>
            <View style={{flex: 3.4,textAlign:'center',alignContent:'center',marginRight:15}}>
              <Text style={{height:50,width:200,fontSize:18,margin:7,marginTop:26,marginLeft:20,color:'black',fontWeight: 'bold'}} onPress={()=>click(item)}>{item.FirstName}</Text>
            </View>
          </View>
        </View>
      )}
      enableEmptySections={true}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);
export default ShowListFriends

const styles = StyleSheet.create({
  txt:{
      width:200,
      fontSize:18,
      color:'black',
      margin:10,
  },

})
