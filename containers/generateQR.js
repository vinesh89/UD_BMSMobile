import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, CheckBox, Title, Subtitle, Card, CardItem, H1, H2, H3, Picker, Form,  Item, Label, Input, Item as FormItem } from 'native-base';
import I18n from '../language/i18n.js';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as API from "../api/API_URI.js";

export default class GenerateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part_name: "",
      part_no: "",
      quantity: "",
      part_id: 0,
      parts_match_list: [
      ]
    }
  }

  inputOnChange = (value, index_value) => {
    //var partsInfo = {...this.state.parts_info};
    if(index_value == "partNumber"){
      this.setState({part_no: value});
    }else if (index_value == "partName") {
      this.setState({part_name: value});
    }else if (index_value == "quantity") {
      this.setState({quantity: value});
    }

    if(value.length > 0 && index_value == "partNumber"){
      fetch(API.GET_PARTS_API + value, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        var json_response = JSON.parse(response._bodyText);
        //console.log("JSON Response: ", json_response);
        if(json_response.length > 0){
          var parts_list = [];
          for(item in json_response){
            var part_info = {"part_name": json_response[item].name, "part_no": json_response[item].partNo, "part_id": json_response[item].name.id};
            parts_list.push(part_info);
          }

          this.setState({parts_match_list: parts_list});
        }


      })
      .catch(error => {
        console.error(error);
        alert("API Error!!");
      });
    }
  }

  autoCompletePartSelection = (item) => {
    this.setState({part_name: item.part_name});
    this.setState({part_no: item.part_no});
    this.setState({part_id: item.part_id});
    this.setState({parts_match_list: []});
  }

  generateSNP = () => {
    //Actions.SNPDetail();
    //Generate SNP Card:
    fetch(API.GENERATE_SNP_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      var part_info_detail = JSON.parse(response._bodyText);
      // var state_part_info = {...this.state.parts_info};
      // state_part_info = part_info_detail;
      // this.setState({parts_info: state_part_info});

    })
    .catch(error => {
      console.error(error);
      alert("API Error!!");
    });
  }

  render(){
    return(
      <Container style={styles.container}>
        <Header androidStatusBarColor="rgba(210, 10, 15, 1)" style={styles.navigationBarStyle}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='ios-arrow-back' color="#fff" style={{paddingLeft: 10, fontSize: 28}}/>
            </Button>
          </Left>
          <Title style={styles.navHeaderTitle}>{I18n.t("GenerateQRCode_btn")}</Title>
          <Right>
          </Right>
        </Header>
        <Content style={{padding: 10}}>
          <Card style={{flex: 1}}>
            <CardItem>
              <Item floatingLabel style={{marginTop:5}}>
                <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('PartNumber')} <Text style={{color:'red'}}> *</Text></Label>
                <Input value={this.state.part_no} onChangeText={(value) => {this.inputOnChange(value, "partNumber")}}/>
              </Item>
            </CardItem>
            <CardItem>
              <FlatList
                data={this.state.parts_match_list}
                renderItem={({item}) =>
                  <TouchableOpacity onPress={() => this.autoCompletePartSelection(item)}>
                    <View style={{flex:1, flexDirection: "row", borderWidth: 1, borderColor: 'darkgrey'}}>
                      <Text style={{padding: 20}}>{item.part_no + " - " + item.part_name}</Text>
                    </View>
                  </TouchableOpacity>
                }
                 keyExtractor={(item, index) => index}
              />
            </CardItem>
            <CardItem>
              <Item floatingLabel style={{marginTop:5}}>
                <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('PartName')} <Text style={{color:'red'}}> *</Text></Label>
                <Input value={this.state.part_name} editable={false} onChangeText={(value) => {this.inputOnChange(value, "partName")}}/>
              </Item>
            </CardItem>

            <CardItem>
              <Item floatingLabel style={{marginTop:5}}>
                <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('Quantity')} <Text style={{color:'red'}}> *</Text></Label>
                <Input value={this.state.quantity} keyboardType="numeric" onChangeText={(value) => {this.inputOnChange(value, "quantity")}}/>
              </Item>
            </CardItem>

            <CardItem>
              <Button onPress={() => this.generateSNP()} style={{flex: 1, backgroundColor: "rgba(210, 10, 15, 1)", alignItems:'center', justifyContent: 'center'}} >
                <Text style={{textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold"}}>{I18n.t('GenerateQRCode_btn')}</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  navigationBarStyle: {
    backgroundColor:'rgba(210, 10, 15, 1)'
  },
  navigationBarTitleStyle: {
    alignSelf: 'center', color: "#fff", fontSize: 24, fontWeight: '600', alignItems: 'center', justifyContent: 'center'
  },
  navHeaderTitle: {
    alignSelf: 'center', textAlign: 'center', fontSize: 22, color: "#fff", fontWeight: '600'
  }
})

// <CardItem>
//   <Item floatingLabel style={{marginTop:5}}>
//     <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('WarehouseID')} <Text style={{color:'red'}}> *</Text></Label>
//     <Input />
//   </Item>
// </CardItem>
//
// <CardItem>
//   <Item floatingLabel style={{marginTop:5}}>
//     <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('LocationID')} <Text style={{color:'red'}}> *</Text></Label>
//     <Input />
//   </Item>
// </CardItem>

// <View style={styles.container}>
//   <Header androidStatusBarColor="rgba(210, 10, 15, 1)" style={styles.navigationBarStyle}>
//     <Left>
//     </Left>
//
//     <Title style={styles.navHeaderTitle}>{I18n.t("GenerateQRCode_btn")}</Title>
//
//     <Right>
//
//     </Right>
//   </Header>
// </View>
