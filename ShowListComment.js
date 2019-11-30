import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text,FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ShowListComment = ({dataSource,checkLength}) => (
  <View>
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
        <View style={{flexDirection:'row',alignContent:'flex-start',marginTop:5,marginLeft:10,marginRight:10,height: checkLength(item.Message)}}>
          <View style={{textAlign:'center',alignContent:'center'}} >
            <View style={{flex:0.5}}/>
            <Image source={{ uri: 'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png' }} style={{ width: 40, height: 40, borderRadius:100,alignContent:'flex-start' }}></Image>
            <View style={{flex:1}}/>
          </View>
          <View style={{textAlign:'center',alignContent:'flex-start',backgroundColor:'#F0F0F0',borderRadius:20,margin:5,marginRight:55}} >
            <Text style={{fontSize:18,color:'black',marginTop:5,marginLeft:10,marginRight:8,fontWeight:'bold'}}>{item.FirstName}</Text>
            <Text style={styles.txt2}>{item.Message}</Text>
          </View>
          <View style={{flex:1}}/>
        </View>
      )}
      enableEmptySections={true}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);
export default ShowListComment

const styles = StyleSheet.create({
  txt:{
      fontSize:18,
      color:'white',
      margin:10,
  },
  txt2:{
      fontSize:18,
      color:'black',
      marginBottom:5,
      marginLeft:10,
      marginRight:8,
  },

})
