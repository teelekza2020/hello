import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text
} from 'react-native';

const ShowLogoFind = ({}) => (
  <View style={{flex:1, alignItems:'center', textAlign:'center'}}>
    <View style={{flex:1, alignItems:'center', textAlign:'center'}}/>
    <View style={{flex:1, alignItems:'center', textAlign:'center'}}>
      <Image source={{ uri: 'https://www.img.in.th/images/cca9206b999086fa2d7e7353d5fa2546.png' }} style={{ width: 100, height: 100 }}></Image>
      <Text style={styles.txt}>Find your friends</Text>
    </View>
    <View style={{flex:1, alignItems:'center', textAlign:'center'}}/>
  </View>
);
export default ShowLogoFind

const styles = StyleSheet.create({
  txt:{
      textAlign: 'center',
      fontSize:13,
      color:'#D4D4D4',
  },

})
