import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,TextInput,Image} from 'react-native';
import HeaderNavigationBar from './HeaderNavigationBar';
import { Pedometer } from "expo-sensors";

export default class SensorPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weight:'',
      height:'',
      bmi:'0',
      status:'Waiting...',
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0
    }
  }
  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  onPressCalculator=()=>{
    if(this.state.weight!=0 && this.state.height!=0){
      this.setState({bmi:String((Number(this.state.weight)/((Number(this.state.height/100))*(Number(this.state.height/100)))).toFixed(2))});
      if(Number(this.state.bmi) < 18.5)
        this.setState({status:'Underweight'})
      else if(Number(this.state.bmi) >= 18.5 && Number(this.state.bmi) <= 24.9 )
        this.setState({status:'Normal'})
      else if(Number(this.state.bmi) > 24.9 && Number(this.state.bmi) <= 29.9)
        this.setState({status:'Overweight'})
      else if(Number(this.state.bmi) > 29.9)
        this.setState({status:'Obesity'})
    }
    else if(this.state.weight==0 && this.state.height==0){
      this.setState({bmi:'', status:''});
    }
  }
  onChangeTextKG = weight => this.setState({ weight })
  onChangeTextCM = height => this.setState({ height })
  render() {
    return (
        <View style={{flex: 1,alignContent:'center'}} >
          <HeaderNavigationBar header={"Device"} props={this.props} backScreen="LoginScreen"/>
          <View style={{flex: 1,alignContent:'center',backgroundColor:'#1F1E30'}} >
            <View style={{flex: 0.25,margin:15,alignContent:'center'}}>
              <View style={{flex: 0.25,alignContent:'center'}}>
                <Text style={{color:'#D83256',fontSize:24,fontWeight: 'bold'}}>
                  BMI CALCULATOR
                </Text>
              </View>
              <View style={{flex: 0.75,alignContent:'center',backgroundColor:'#2A293E',elevation: 10,borderRadius:15}}>
                <View style={{flex:0.2}}/>
                <View style={{flex:0.5,flexDirection:'row',alignContent:'center'}}>
                  <View style={{flex:0.1}}/>
                  <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>Weight</Text>
                  <View style={{flex:0.12}}/>
                  <View style={{flex:1,backgroundColor:'#3B3A4F',marginLeft:1,marginRight:5,marginBottom:15}}>
                    <TextInput style={{margin:3,fontSize:18,fontWeight:'bold',color:'white',marginLeft:15,marginRight:15}} onChangeText={this.onChangeTextKG}>
                    {this.state.weight}</TextInput>
                  </View>
                  <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>KG</Text>
                  <View style={{flex:0.13}}/>
                </View>
                <View style={{flex:0.05}}/>
                <View style={{flex:0.5,flexDirection:'row',alignContent:'center'}}>
                  <View style={{flex:0.1}}/>
                  <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>Height</Text>
                  <View style={{flex:0.15}}/>
                  <View style={{flex:1,backgroundColor:'#3B3A4F',marginRight:5,marginBottom:15}}>
                    <TextInput style={{margin:3,fontSize:18,fontWeight:'bold',color:'white',marginLeft:15,marginRight:15}} onChangeText={this.onChangeTextCM}>
                    {this.state.height}</TextInput>
                  </View>
                  <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight: 'bold'}}>CM</Text>
                  <View style={{flex:0.1}}/>
                </View>
                <View style={{flex:0.2}}/>
              </View>
            </View>
            <View style={{flex: 0.55,alignContent:'center'}}>
              <View style={{flex: 0.35}}>
                <View style={{flex: 1, marginTop:10}}>
                  <View style={{flex:1, margin:10,textAlign:'center',alignContent:'center'}}>
                    <Text style={{fontSize:36,fontWeight:'bold', color:'#D83256',textAlign:'center'}}>{this.state.bmi}</Text>
                    <Text style={{fontSize:28,fontWeight:'bold', color:'white',textAlign:'center'}}>{this.state.status}</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 0.65,flexDirection:'row',alignItems:'center'}}>
                <View style={{flex:0.35}}></View>
                <View style={{flex:1 }}>
                  <View style={{flex:1}}>
                    <View style={{flex:1, margin:5,marginLeft:5,marginRight:5,  backgroundColor:'#F0F0F0', borderWidth:7, borderColor:'#A49F9F', borderRadius:200}}>
                      <View style={{flex:0.75, flexDirection:'row'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1,alignContent:'center'}}>
                            <Image source={{ uri: 'https://www.img.in.th/images/caf51bb0ec735e2d15b77127985d0ee1.png' }} style={{ width: 70., height: 70, borderRadius:100,alignContent:'flex-start' }}></Image>
                        </View>
                        <View style={{flex:1}}/>
                      </View>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1,alignContent:'center'}}>
                            <Text style={{fontSize:70,fontWeight:'bold',marginBottom:30, color:'black',textAlign:'center',alignContent:'center'}}>{this.state.currentStepCount}</Text>
                        </View>
                        <View style={{flex:1}}/>
                      </View>
                      <View style={{flex:1}}/>
                    </View>
                  </View>
                </View>
                <View style={{flex:0.35}}></View>
              </View>
            </View>
            <View style={{flex: 0.20,alignContent:'center'}}>
              <TouchableOpacity style={{flex:1,margin:30,marginLeft:57,marginRight:57,textAlign:'center',backgroundColor:'#D83256',borderRadius:30,elevation: 10}} onPress={()=>this.onPressClick()}>
                <View style={{flex:1}}/>
                <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight: 'bold'}} onPress={()=>this.onPressCalculator()}>CALCULATOR BMI</Text>
                <View style={{flex:1}}/>
              </TouchableOpacity>
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
