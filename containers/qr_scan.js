import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, CheckBox, Title, Subtitle, Card, CardItem, H1, H2, H3, Picker, Form,  Item, Label, Input, Item as FormItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';
import I18n from '../language/i18n.js';
import EventEmitter from "react-native-eventemitter";

export default class QRScanner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    EventEmitter.on("language_change", (language)=>{
      console.log("Language Set to Content: ", language);
      I18n.locale = language;
      this.forceUpdate();
    });
  }

  onSuccess(e) {
    //console.log("Scanned Code", e);
    var jsonString = e.data;
    try{
      Actions.partsInfo();
    } catch (e) {
      alert("Scanned QR Code is Invalid");
    }

    //console.log("JSON String: ", jsonString);
    // try{
    //   var jsonObj = JSON.parse(jsonString);
    //   if((jsonObj != undefined || jsonObj != null) && (jsonObj.order_type != undefined || jsonObj.order_type != null)){
    //     Actions.contents({contents: jsonObj, entity_editable: false});
    //   }else{
    //     alert("Scanned QR Code is Invalid");
    //   }
    // } catch (e) {
    //   alert("Scanned QR Code is Invalid");
    // }
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <View style={styles.container}>
            <Header androidStatusBarColor="rgba(210, 10, 15, 1)" style={styles.navigationBarStyle}>
              <Left>
              </Left>

              <Title style={styles.navHeaderTitle}>{I18n.t("QRScreenTitle")}</Title>

              <Right>

              </Right>
            </Header>
            <View style={styles.container, {marginTop: 20}}>
              <Card style={{flex: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <CardItem style={{width: Dimensions.get('window').width - 250}}>
                  <Item floatingLabel style={{marginTop:0}}>
                    <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('PartNumber')} <Text style={{color:'red'}}> *</Text></Label>
                    <Input />
                  </Item>
                </CardItem>
                <CardItem style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
                  <Button style={{flex: 1, backgroundColor: "rgba(210, 10, 15, 1)", alignItems:'center', justifyContent: 'center'}} >
                    <Text style={{textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold"}}>GO</Text>
                  </Button>
                </CardItem>
              </Card>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', paddingTop: 30, justifyContent: 'center', alignItems: 'center'}}>(OR)</Text>
              </View>
            </View>
          </View>
        }
        cameraStyle={{height: Dimensions.get('window').height/2, marginTop: 100}}
        showMarker={true}
        reactivate={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  navigationBarStyle: {
    backgroundColor:'rgba(210, 10, 15, 1)', width: Dimensions.get('window').width
  },
  navigationBarTitleStyle: {
    alignSelf: 'center', color: "#fff", fontSize: 24, fontWeight: '600', alignItems: 'center', justifyContent: 'center'
  },
  navHeaderTitle: {
    alignSelf: 'center', textAlign: 'center', fontSize: 22, color: "#fff", fontWeight: '600'
  }
});
