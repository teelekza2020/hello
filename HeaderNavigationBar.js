import React from 'react';
import { Constants, ImagePicker, Permissions} from 'expo';
import {
  StyleSheet, View,Image,TouchableOpacity,Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderNavigationBar = ({props,header,backScreen,params}) => (
      <View style={{
            height: 100,
            justifyContent: 'flex-start',
            backgroundColor:'#1F1E30',
            elevation: 20,
        }}>
            <View style={{flex:1 }}/>
              <View style={{flex:1,flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <TouchableOpacity style={{ marginLeft: 15, marginTop: 15 }}  onPress={()=>props.navigation.navigate(backScreen,{params})}>
                    <View style={{flexDirection: 'row'}}>
                      <View >
                        <Ionicons name={"ios-arrow-back"} size={40} color={"white"} />
                      </View>
                      <View style={{width:10}}/>
                      <View >
                        <Text style={{fontSize:23, marginTop: 4,color:"#C2C2C2"}}>Back</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,alignItems:'center', marginTop: 15}}>
                  <Text style={{fontSize:18, marginTop: 3,color:"white"}}>{header}</Text>
                </View>
                <View style={{flex:1}}/>
              </View>
            <View style={{flex:0.5}}/>
        </View>
);
export default HeaderNavigationBar
