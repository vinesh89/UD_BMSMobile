import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity , FlatList, Alert} from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, CheckBox, Title, Subtitle, Card, CardItem, H1, H2, H3, Picker, Form,  Item, Label, Input, Item as FormItem } from 'native-base';
import { SearchBar } from "react-native-elements";
import I18n from '../language/i18n.js';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';

export default class PartsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_text: "",
      partsList: [{
        loc_id: "a12",
        part_no: "ae321",
        part_name: "Engine",
        total_count: "150"
      },
      {
        loc_id: "a13",
        part_no: "aax21",
        part_name: "Axel",
        total_count: "110"
      },
      {
        loc_id: "a14",
        part_no: "ach31",
        part_name: "Chassis",
        total_count: "60"
      }]
    }
  }

  clearSearchText = () => {
    console.log("Clear Text!!");
  }

  searchMethod = (text) => {
    console.log("Searched Text: ", text);
  }

  showSNPDetail = (item) => {
    Actions.SNPDetail();
  }

  partsInfo = () => {
    Actions.partsInfo();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header androidStatusBarColor="rgba(210, 10, 15, 1)" style={styles.navigationBarStyle}>
          <Left>

          </Left>

          <Title style={styles.navHeaderTitle}>{I18n.t("PartsListScreen")}</Title>

          <Right>

          </Right>
        </Header>
        <SearchBar
          containerStyle={{
            backgroundColor: "lightgrey",
            borderColor: "darkgrey"
          }}
          inputStyle={{ backgroundColor: "#fff", borderColor: "darkgrey" }}
          value={this.state.search_text}
          onChangeText={text => this.searchMethod(text)}
          onClearText={this.clearSearchText}
          placeholder="Type Here..."
        />
        <View>
          <FlatList
            data={this.state.partsList}
            extraData={this.state}
            renderItem={({item, index}) =>
              <View style={{flex: 1, flexDirection: "row", borderBottomWidth: 1, borderColor: 'lightgrey'}}>
                <TouchableOpacity onPress={() => this.partsInfo()} style={{flex: 8, justifyContent: "center"}}>
                  <View style={{flex: 8, justifyContent: "center"}}>
                    <Label style={{padding: 10, paddingLeft: 10, color: "black"}}><Label style={{fontWeight: '600'}}>Location ID:</Label> {item.loc_id}</Label>
                    <Label style={{padding: 10, paddingLeft: 10, color: "black"}}><Label style={{fontWeight: '600'}}>Part Info:</Label> {item.part_name} (#{item.part_no})</Label>
                    <Label style={{padding: 10, paddingLeft: 10, color: "black"}}><Label style={{fontWeight: '600'}}>Total Count:</Label> {item.total_count}</Label>
                  </View>
                </TouchableOpacity>
                <View style={{flex: 2}}>
                  <View style={{flex: 2, padding: 10}}>
                    <Button onPress={() => this.showSNPDetail(item)} style={{flex: 1, width: 60, padding: 10, paddingLeft: 10, backgroundColor: "darkgrey", alignItems:'center', justifyContent: 'center'}} >
                      <Text style={{textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold"}}>{I18n.t('Print')}</Text>
                    </Button>
                  </View>
                  <View style={{flex: 2, padding: 10}}>
                    <Button style={{flex: 1, width: 60, padding: 10, paddingLeft: 10, backgroundColor: "lightgreen", alignItems:'center', justifyContent: 'center'}} >
                      <Text style={{textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold"}}>INQ</Text>
                    </Button>
                  </View>
                </View>
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
});
