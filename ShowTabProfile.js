import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text,FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ShowTabProfile = ({dataSource,click}) => (
  <View>
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
        <View style={{flex:1}}>
          <View style={{flex: 1,flexDirection:'row',alignContent:'center'}}>
            <View style={{flex: 0.45,textAlign:'center',alignContent:'center'}} >
              <MaterialCommunityIcons style={{marginTop:11, marginBottom:11, marginLeft:18}} name={"magnify"} size={25} color={'#D4D4D4'} />
            </View>
            <View style={{flex: 3.55,textAlign:'center',alignContent:'center',marginRight:15}}>
              <Text style={styles.txt} onPress={()=>click(item)}>{item}</Text>
            </View>
          </View>
          <View style={{flex:1,flexDirection:'row',alignContent:'center'}}>
            <View style={{flex:0.05}}/>
            <View style={{flex:1,height: 1, backgroundColor:'#D4D4D4'}}/>
            <View style={{flex:0.05}}/>
          </View>
        </View>
      )}
      enableEmptySections={true}
      style={{ marginTop: 10 }}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);
export default ShowTabProfile

const styles = StyleSheet.create({
  txt:{
      width:200,
      fontSize:18,
      color:'black',
      margin:10,
  },

})
