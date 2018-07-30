import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity , FlatList, Alert} from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, CheckBox, Title, Subtitle, Card, CardItem, H1, H2, H3, Picker, Form,  Item, Label, Input, Item as FormItem } from 'native-base';
import I18n from '../language/i18n.js';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import * as API from "../api/API_URI.js";

export default class PartsInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parts Props: ", this.props.PartsNo);
    this.state = {
      partInfo: {
        "partNumber": "",
        "totalCapacity": "",
        "partName": "",
        "currentCapacity": ""
      },
      buffers: [{
          "bufferID": "",
          "bufferName": "",
          "currentCapacity": "",
          "totalCapacity": "",
          "type": ""
        }
      ],
      updated_bin_details: {
        qr_code: "",
        bin_loc_id: "",
        quantity: ""
      }
    }

    // parts_info: {
    //   "part": {
    //     "name": "",
    //     "partNo": "",
    //     "id": 1,
    //     "createdBy": null,
    //     "createdOn": "",
    //     "modifiedOn": ""
    //   },
    //   "warehouse": null,
    //   "qrCode": "",
    //   "description": "",
    //   "totalQuantity": 0,
    //   "inventoryLocations": [
    //     {
    //       "events": [],
    //       "binLocation": {
    //         "events": [],
    //         "name": "",
    //         "description": "",
    //         "capacity": 0,
    //         "binType": 1,
    //         "warehouse": null,
    //         "id": 1,
    //         "createdOn": "",
    //         "modifiedOn": "",
    //         "createdBy": null
    //       },
    //       "quantity": 0,
    //       "id": 1,
    //       "createdOn": "",
    //       "modifiedOn": "",
    //       "createdBy": null
    //     }
    //   ],
    //   "id": 1,
    //   "createdOn": "",
    //   "modifiedOn": "",
    //   "createdBy": null
    // }

    // parts_info: {
    //   "id": "1",
    //   "warehouseLoc":"Ageo",
    //   "partName":"Engine",
    //   "partNumber":"562019012",
    //   "partDescription":"UD Truck Engine",
    //   "operator": "Vinesh",
    //   "country":"Japan",
    //   "primary_Inventory":{
    //     "max_count": 100,
    //     "current_count": 60
    //   },
    //   "buffer_inventory":[{
    //       "id": 10,
    //       "max_count": 100,
    //       "current_count": 30
    //   }]
    // }
  }

  componentDidMount(){
    //Get Part Information API:
    fetch(API.GET_PART_INFO_API + "/" this.props.PartsNo, {
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
    // var parts_info = require('../api/partsInfo.json');
    // this.setState({parts_info: parts_info});
  }

  addBufferLocation = () => {
    // Works on both iOS and Android
    Alert.alert(
      'Create Buffer Location',
      'Are you sure you want to create a new buffer location ?',
      [
        {text: 'Yes', onPress: () => this.newBufferLocation()},
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  newBufferLocation = () => {
    var parts_info = {...this.state.parts_info};
    var buffer_info = parts_info.buffer_inventory;
    for(item in buffer_info){
      if(item == buffer_info.length - 1){
        //Last Item in the buffer location, get the id and increment the id for the new buffer location Added
        var new_buffer_id = buffer_info[item]["id"] + 1;
        const buffer_info_item = { "id": new_buffer_id, "max_count": 100, "current_count": 0};
        buffer_info.push(buffer_info_item);
        break;
      }
    }
    parts_info.buffer_inventory = buffer_info;
    this.setState({parts_info: parts_info});
  }

  updateInventory = () => {
    //Update Inventory Part Information API:
    console.log("Post Details: ", this.state.updated_bin_details);
    // body: JSON.stringify({
    //   "qrCode": this.state.updated_bin_details.qr_code,
    //   "binLocationId": this.state.updated_bin_details.bin_loc_id,
    //   "quantity": this.state.updated_bin_details.quantity
    // })

    // var post_body = JSON.stringify({
    //   "qrCode": this.state.updated_bin_details.qr_code,
    //   "binLocationId": this.state.updated_bin_details.bin_loc_id,
    //   "quantity": this.state.updated_bin_details.quantity
    // });

    //var post_body = "qrCode=" + this.state.updated_bin_details.qr_code + '&' + "binLocationId=" + this.state.updated_bin_details.bin_loc_id + '&' + "quantity=" + this.state.updated_bin_details.quantity;

    // var api = "http://bms-bmsweb.7e14.starter-us-west-2.openshiftapps.com/api/Inventory/UpdateLocationhelloworld?qrCode=Q1201807122&binLocationId=2&quantity=60";
    // var my_api = API.UPDATE_INVENTORY_PART_DETAIL_API + "?" + post_body;
    var post_body = {
      "qrCode": this.state.updated_bin_details.qr_code,
      "binLocationId": this.state.updated_bin_details.bin_loc_id,
      "quantity": this.state.updated_bin_details.quantity
    };
    console.log("Post Body: ", post_body);
    fetch(API.UPDATE_INVENTORY_PART_DETAIL_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
                post_body
            ),
    })
    .then(response => {
      //var response = JSON.parse(response._bodyText);
      console.log("Update Response: ", response);

    })
    .catch(error => {
      console.error(error);
      alert("API Error!!");
    });
  }

  inputOnChange = (value, index_value) => {
    var partsInfo = {...this.state.parts_info};
    if(index_value == "partNumber"){
      partsInfo.part.partNo = value;
    }else if (index_value == "partName") {
      partsInfo.part.name = value;
    }else if (index_value == "total_quantity") {
      partsInfo.total_quantity = value;
    }else if (index_value == "warehouseLoc") {
      partsInfo.warehouseLoc = value;
    }else if (index_value == "country") {
      partsInfo.country = value;
    }else{
      for(item in partsInfo.inventoryLocations){
        if(item == index_value){
          partsInfo.inventoryLocations[item].quantity = value;
          var updated_bin_details = {...this.state.updated_bin_details};
          updated_bin_details.qr_code = partsInfo.qrCode;
          updated_bin_details.bin_loc_id = partsInfo.inventoryLocations[item].binLocation.id;
          updated_bin_details.quantity = parseInt(partsInfo.inventoryLocations[item].quantity);
          this.setState({updated_bin_details: updated_bin_details});
          break;
        }
      }
    }
    this.setState({parts_info: partsInfo});
  }

  renderInventory = (item, index) => {

    var inventory_name = "";
    var inventory_capacity = "Inventory Count - Max Capacity";
    var max_count = item.binLocation.capacity;
    var current_count = item.quantity;
    var inventory_status = "Full";
    var inventory_status_color = "red";
    var editable_status = true;
    if(current_count < max_count){
      inventory_status = "Available";
      var inventory_status_color = "green";
      editable_status = true;
    }else{
      editable_status = false;
    }


    if(item.binLocation.binType == 1){
      //Primary Inventory
      inventory_name = "Primary Inventory: " + item.binLocation.name;
      inventory_capacity = inventory_capacity + " (" + item.binLocation.capacity.toString() + ") " + "Status: ";
    }else{
      //Buffer Inventory
      inventory_name = "Buffer Inventory: " + item.binLocation.name;
      inventory_capacity = inventory_capacity + " (" + item.binLocation.capacity.toString() + ") " + "Status: ";
      for(item in this.state.parts_info.inventoryLocations){
        if(this.state.parts_info.inventoryLocations[item].binLocation.binType == 1){
          var max_primary_count = this.state.parts_info.inventoryLocations[item].binLocation.capacity;
          var current_primary_count = this.state.parts_info.inventoryLocations[item].quantity;
          var primary_inventory_status = "Available";
          if(current_primary_count < max_primary_count){
            primary_inventory_status = "Available";
            editable_status = false;
          }
        }
      }
      if(inventory_status == "Available"){
        editable_status = true;
      }else{

      }
    }

    return(
      <Card style={{flex: 1}}>
        <Label style={{paddingTop: 10, paddingLeft: 20, color: "rgb(84, 84, 84)", fontWeight: 'bold'}}>{inventory_name}</Label>
        <CardItem>
          <Item floatingLabel style={{marginTop:0}}>
            <Label style={styles.labelTitle}>{inventory_capacity}<Label style={styles.labelTitle, {color: inventory_status_color}}>{inventory_status}</Label></Label>
            <Input value={current_count.toString()} keyboardType="numeric" editable={editable_status} onChangeText={(value) => {this.inputOnChange(value, index)}}/>
          </Item>
        </CardItem>
      </Card>
    );
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

          <Title style={styles.navHeaderTitle}>{I18n.t("PartsInfoScreen")}</Title>

          <Right>
            <Button transparent onPress={() => this.updateInventory()}>
              <Text style={styles.navHeaderTitle}>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{padding: 10}}>
          <Card style={{flex: 1}}>
            <Label style={{paddingTop: 10, paddingLeft: 20, color: "rgb(84, 84, 84)", fontWeight: 'bold'}}>Parts Information</Label>
            <CardItem>
              <Item floatingLabel style={{marginTop:0}}>
                <Label style={styles.labelTitle}>Part Number</Label>
                <Input value={this.state.parts_info.part.partNo.toString()} editable={false} onChangeText={(value) => {this.inputOnChange(value, "partNumber")}}/>
              </Item>
            </CardItem>

            <CardItem>
              <Item floatingLabel style={{marginTop:0}}>
                <Label style={styles.labelTitle}>Part Name</Label>
                <Input value={this.state.parts_info.part.name} editable={false} onChangeText={(value) => {this.inputOnChange(value, "partName")}}/>
              </Item>
            </CardItem>

            <CardItem>
              <Item floatingLabel style={{marginTop:0}}>
                <Label style={styles.labelTitle}>Total Quantity</Label>
                <Input value={this.state.parts_info.totalQuantity.toString()} editable={false} onChangeText={(value) => {this.inputOnChange(value, "total_quantity")}}/>
              </Item>
            </CardItem>

          </Card>

          <View>
            <FlatList
              data={this.state.parts_info.inventoryLocations}
              extraData={this.state}
              renderItem={({item, index}) => this.renderInventory(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Content>
        <ActionButton buttonColor="rgba(210, 10, 15, 1)" onPress={() => this.addBufferLocation()}>
        </ActionButton>
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
  },
  labelTitle: {
    color: "rgb(84, 84, 84)", fontSize: 16, fontWeight: "600"
  },
  buttonTitle: {
    textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "600"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})

//<Icon name='ios-arrow-back' color="#fff" style={{paddingLeft: 10, fontSize: 28}}/>

// <Card style={{flex: 1}}>
//   <Label style={{paddingTop: 10, paddingLeft: 20, color: "rgb(84, 84, 84)", fontWeight: 'bold'}}>Primary Inventary</Label>
//   <CardItem>
//     <Item floatingLabel style={{marginTop:0}}>
//       <Label style={styles.labelTitle}>Inventory Count - Max Capacity(100) - Status: <Label style={styles.labelTitle, {color: 'red'}}>Full</Label></Label>
//       <Input value={this.state.parts_info.primary_Inventory.current_count.toString()} keyboardType="numeric" editable={true} onChangeText={(value) => {this.inputOnChange(value, "primary_count")}}/>
//     </Item>
//   </CardItem>
// </Card>

// <CardItem>
//   <Item floatingLabel style={{marginTop:0}}>
//     <Label style={styles.labelTitle}>Part Description</Label>
//     <Input value={this.state.parts_info.partDescription} editable={true} onChangeText={(value) => {this.inputOnChange(value, "partDescription")}}/>
//   </Item>
// </CardItem>

// <ActionButton buttonColor="rgba(231,76,60,1)">
//   <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
//     <Icon name="md-create" style={styles.actionButtonIcon} />
//   </ActionButton.Item>
//   <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
//     <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
//   </ActionButton.Item>
//   <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
//     <Icon name="md-done-all" style={styles.actionButtonIcon} />
//   </ActionButton.Item>
// </ActionButton>
