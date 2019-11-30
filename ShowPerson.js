import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text
} from 'react-native';

const ShowPerson = ({dataSource,click,click2}) => (
  <View>
    <Image source={{ uri: 'https://www.img.in.th/images/52cb483833f4c35c766db08a99224026.png' }} style={{ width: 150, height: 150, marginLeft:130,marginTop:40, borderRadius:100 }}></Image>
    <Text style={styles.txt}>{dataSource.FirstName}</Text>
    <View style={{height:50, marginTop:25, flexDirection:'row'}}>
      <View style={{flex:1, alignItems:'flex-end'}}>
        <TouchableOpacity style={{height:50,width:120,backgroundColor:'#D83256',elevation: 10,borderRadius:50,textAlign:'center'}} onPress={()=>click(dataSource)}>
          <Text style={{marginTop:10,fontWeight:'bold',fontSize:20,color:'white',textAlign:'center'}}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:0.1}}/>
      <View style={{flex:1, alignItems:'flex-start'}}>
        <TouchableOpacity style={{height:50,width:120,backgroundColor:'#F3F3F3',elevation: 10,borderRadius:50,textAlign:'center'}} onPress={()=>click2(dataSource)}>
          <Text style={{marginTop:10,fontWeight:'bold',fontSize:20,color:'black',textAlign:'center'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
export default ShowPerson

const styles = StyleSheet.create({
  txt:{
      textAlign: 'center',
      fontSize:16,
      color:'black',
      marginTop:10,
      fontWeight:'bold'
  },

})
