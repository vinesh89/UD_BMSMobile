import React from 'react';
import { View, Text, Fetch, NetInfo, StyleSheet, AsyncStorage, StatusBar, Platform, TouchableOpacity, TextInput, Dimensions, Image, ImageBackground, KeyboardAvoidingView, ActivityIndicator, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import * as ActionTypes from '../actions/actionTypes.js';
//import {handle_query} from '../Components/Database.js';
import * as API from '../api/API_URI.js';
import { Keyboard } from 'react-native';

//let width = Dimensions.get('window').width
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: 'A217168', password: 'Rand0m@6', isLoading: false};
    console.disableYellowBox = true;
  }

  loginAction = () => {
    Keyboard.dismiss();
    this.setState({isLoading: true});
    var username = this.state.username.toUpperCase();

    fetch('http://buffermanagemetapi.azurewebsites.net/api/ValidateUser',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'username': this.state.username,
          'password':this.state.password
        },
    })
    .then((response) => response.json())
    .then((res) => {
        this.setState({isLoading: true});
          //this.refs.loading.show(false);
        if(res != null && res.Message != null)
        {
            alert( res.Message)
            this.setState({isLoading: false});
        }
        else
        {
          // if (this.state.rememberMe) {
          //     this.setName(this.state.email);
          //     this.setPassword(this.state.password);
          // }
          // else{
          //     AsyncStorage.removeItem('email');
          //     AsyncStorage.removeItem('password');
          // }
          // this.setLoginId(this.state.email);
          //this.props.navigation.navigate({ routeName: 'SuccessLogin' ,params : { name: res.name ,  userid:res.userid }});
          this.Actions.tabs();
        }
      })
      .catch(err => {
          alert(JSON.stringify(err));
          //this.refs.loading.show(false);
          this.setState({isLoading: false});
      })
  }

  getDefaultChecklist = (login_details) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected == true){
        //API Call to load the Checklist Template Details Initially.
        fetch(API.DEALER_CHECKLIST_TEMPLATE_API, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: login_details.DealerID.toString(),
        })
        .then((response) => {
          var json_response = JSON.parse(response._bodyText);
          //Save the Checklist Template Details locally:
          try {
            AsyncStorage.setItem(API.DEALER_CHECKLIST_TEMPLATE_DETAILS, JSON.stringify(json_response));
          } catch (error) {
            // Error saving data
            alert("Faield to get the Checklist Tempate Details");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("API Error!!");
        });
      }
    });
  }

  // <View style={{height: STATUSBAR_HEIGHT, backgroundColor: "rgba(210, 10, 15, 1)"}}>
  //   <StatusBar translucent backgroundColor="rgba(210, 10, 15, 1)" barStyle="light-content"  />
  // </View>

  render(){
    return(
      <ImageBackground source={require('../assets/login-min.jpg')}  style={styles.backgroundImage}>
        <ScrollView keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={{height: 140, alignItems: 'center', top: 50}}>
              <Image style={{width: 100, height: 88, alignItems: 'center'}} source={require('../assets/UD_logo.jpg')}>
              </Image>
            </View>
            <View style={{height: 50, alignItems: 'center', top: 50}}>
              <Text style={{fontSize: 40, fontWeight: '800', color: "#fff", textAlign: 'center'}}>Buffer Management System</Text>
            </View>
            <View style={{alignItems:'center', top: 150, height: ((Dimensions.get('window').height/2) + 60)}}>
              <TextInput style={{width: Dimensions.get('window').width - 40, height: 50, marginTop: 20, color: "#fff"}} underlineColorAndroid="rgba(210, 10, 15, 1)" selectionColor="rgba(210, 10, 15, 1)" placeholder="Username" placeholderTextColor="#fff" value={this.state.username} onChangeText={(username) => { this.setState({username})}}/>
              <TextInput style={{width: Dimensions.get('window').width -40, height: 50, margin: 20, color: "#fff"}} underlineColorAndroid="rgba(210, 10, 15, 1)" selectionColor="rgba(210, 10, 15, 1)" placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} value={this.state.password} onChangeText={(password) => { this.setState({password})}}/>
              <TouchableOpacity onPress={() => {this.loginAction()}} style={{ paddingTop: 30, height: 150}}>
                <View style={{width: Dimensions.get('window').width - 40, paddingTop: 15, paddingBottom: 15, borderRadius: 8,alignItems:'center', backgroundColor: "rgba(210, 10, 15, 1)"}}>
                  <Text style={{color: "#fff", fontSize: 18, fontWeight: '600'}}>Login</Text>
                </View>
              </TouchableOpacity>
              <ActivityIndicator style={{opacity: this.state.isLoading ? 1.0 : 0.0, paddingTop: 10}} animating={true} size="large" color="#fff" />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={{alignItems: 'center'}}>
          <Text style={{alignItems: 'center', color: '#fff', fontSize: 18, fontWeight: '600'}}>V 1.0</Text>
        </View>
      </ImageBackground>
    )
  }
}

// <ImageBackground source={require('../assets/login-min.jpg')}  style={styles.backgroundImage}>
//   <View style={{height: STATUSBAR_HEIGHT, backgroundColor: "rgba(85, 109, 168, 1)"}}>
//     <StatusBar translucent backgroundColor="rgba(85, 109, 168, 1)" barStyle="light-content"  />
//   </View>
  // <KeyboardAvoidingView behavior="padding" style={styles.container}>
  //   <View style={{height: 140, alignItems: 'center', top: 50}}>
  //     <Image style={{width: 100, height: 88, alignItems: 'center'}} source={require('../assets/UD_logo.jpg')}>
  //     </Image>
  //   </View>
  //   <View style={{height: 50, alignItems: 'center', top: 50}}>
  //     <Text style={{fontSize: 40, fontWeight: '800', color: "#fff", textAlign: 'center'}}>Vehicle Handover</Text>
  //   </View>
  //   <View style={{alignItems:'center', justifyContent: 'center', top: 150}}>
  //     <TextInput style={{width: Dimensions.get('window').width - 40, height: 50, marginTop: 20, color: "#fff"}} underlineColorAndroid="rgba(210, 10, 15, 1)" selectionColor="rgba(85, 109, 168, 1)" placeholder="username" placeholderTextColor="#fff" onChangeText={(username) => { this.setState({username})}}/>
  //     <TextInput style={{width: Dimensions.get('window').width -40, height: 50, margin: 20, color: "#fff"}} underlineColorAndroid="rgba(210, 10, 15, 1)" selectionColor="rgba(85, 109, 168, 1)" placeholder="password" placeholderTextColor="#fff" secureTextEntry={true} onChangeText={(password) => { this.setState({password})}}/>
  //     <TouchableOpacity onPress={() => {this.loginAction()}} style={{ paddingTop: 30}}>
  //       <View style={{width: Dimensions.get('window').width - 40, paddingTop: 15, paddingBottom: 15, borderRadius: 8,alignItems:'center', backgroundColor: "rgba(85, 109, 168, 1)"}}>
  //         <Text style={{color: "#fff", fontSize: 18, fontWeight: '600'}}>Login</Text>
  //       </View>
  //     </TouchableOpacity>
  //     <ActivityIndicator style={{opacity: this.state.isLoading ? 1.0 : 0.0, paddingTop: 10}} animating={true} size="large" color="#fff" />
  //   </View>
  // </KeyboardAvoidingView>
//   <View style={{alignItems: 'center'}}>
//     <Text style={{alignItems: 'center', color: '#fff', fontSize: 18, fontWeight: '600'}}>V 1.8</Text>
//   </View>
// </ImageBackground>

// <ScrollView contenContainerStyle={{backgroundColor: 'white' }}>
//   <KeyboardAvoidingView behavior="padding" style={styles.container}>
//
//   </KeyboardAvoidingView>
// </ScrollView>

// <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignItems:'center'}}>
//   <TextInput style={{width: Dimensions.get('window').width - 40, height: 50, marginTop: 20}} placeholder="username" onChangeText={(username) => { this.setState({username})}}/>
//   <TextInput style={{width: Dimensions.get('window').width -40, height: 50, margin: 20}} placeholder="password" secureTextEntry={true} onChangeText={(password) => { this.setState({password})}}/>
//   <TouchableOpacity onPress={() => {this.loginAction()}} style={{ paddingTop: 30}}>
//     <View style={{width: Dimensions.get('window').width - 40, paddingTop: 15, paddingBottom: 15, borderRadius: 8,alignItems:'center', backgroundColor: "rgba(85, 109, 168, 1)"}}>
//       <Text style={{color: "#fff", fontSize: 18, fontWeight: '600'}}>Login</Text>
//     </View>
//   </TouchableOpacity>
// </View>

const styles = StyleSheet.create({
  container: {
     flex: 1,
     //justifyContent: 'center',
     alignItems: 'center',
     //backgroundColor: '#F5FCFF',
     //backgroundColor: 'rgba(0,0,0,0)',
     //flexDirection: 'column',
     backgroundColor: "rgba(52,52,52,0.4)"
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
    marginTop: -20
  }
});

// height: Dimensions.get('window').height,
// width: Dimensions.get('window').width,


//Login Template
// <ScrollView contenContainerStyle={{backgroundColor: 'white' }}>
//   <KeyboardAvoidingView behavior="padding" style={styles.container}>
//     <View style={{width: Dimensions.get('window').width, height: ((Dimensions.get('window').height * 50)/100), backgroundColor:"rgba(85, 109, 168, 1)", alignItems:'center', justifyContent:'center'}}>
//       <Image
//         style={{width: 125, height: 100, alignItems:'center', justifyContent:'center'}}
//         source={require('../assets/UD_logo.jpg')}
//       />
//     </View>
//     <View style={{width: Dimensions.get('window').width, height: ((Dimensions.get('window').height * 50)/100), backgroundColor: 'white', alignItems:'center'}}>
//       <TextInput style={{width: Dimensions.get('window').width - 40, height: 50, marginTop: 20}} placeholder="username" onChangeText={(username) => { this.setState({username})}}/>
//       <TextInput style={{width: Dimensions.get('window').width -40, height: 50, margin: 20}} placeholder="password" secureTextEntry={true} onChangeText={(password) => { this.setState({password})}}/>
//       <TouchableOpacity onPress={() => {this.loginAction()}} style={{ paddingTop: 30}}>
//         <View style={{width: Dimensions.get('window').width - 40, paddingTop: 15, paddingBottom: 15, borderRadius: 8,alignItems:'center', backgroundColor: "rgba(85, 109, 168, 1)"}}>
//           <Text style={{color: "#fff", fontSize: 18, fontWeight: '600'}}>Login</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   </KeyboardAvoidingView>
// </ScrollView>
