import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  processColor,
} from 'react-native';
import I18n from '../language/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import * as API from "../api/API_URI.js";
//React Native Charts
import {PieChart} from 'react-native-charts-wrapper';
//Native Base Handy UI Components
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import EventEmitter from "react-native-eventemitter";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legend: {
        enabled: true,
        textSize: 11,
        form: 'CIRCLE',
        position: 'RIGHT_OF_CHART',
        wordWrapEnabled: true
      },
      dataInfo: {},
      highlights: [{x:2}],
      description: {
        text: 'Parts Information',
        textSize: 14,
        textColor: processColor('darkgray'),
      },
      dashboard_api_res: []
    };
  }

  componentDidMount(){
    EventEmitter.on("language_change", (language)=>{
      console.log("Language Set to Home: ", language);
      I18n.locale = language;
      this.forceUpdate();
    });

    //API Implementation for Dashboard Information
    // fetch(API.DASHBOARD_API, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // })
    // .then(response => {
    //   //console.log("Dashboard API: ", response);
    //     var darshboard_info = JSON.parse(response._bodyText);
    //     this.setState({dashboard_api_res: darshboard_info});
    //     var dataSetInfo = {
    //       dataSets: [{
    //         values: [
    //           {value: 60, label: "Part Name1"},
    //           {value: 20, label: "Part Name2"},
    //         ],
    //         label: 'Pie dataset',
    //         config: {
    //           colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D'), processColor('#6BADDD')],
    //           valueTextSize: 18,
    //           valueTextColor: processColor('green'),
    //           sliceSpace: 5,
    //           selectionShift: 13
    //         }
    //       }],
    //     }
    //
    //     var newDataSet = [];
    //     if(darshboard_info != null && darshboard_info != undefined){
    //       if(darshboard_info.length > 0){
    //         for(item in darshboard_info){
    //           var inventory_info = {value: darshboard_info[item].quantity, label: darshboard_info[item].partName};
    //           newDataSet.push(inventory_info);
    //         }
    //
    //         dataSetInfo.dataSets[0].values = newDataSet;
    //         this.setState({dataInfo: dataSetInfo});
    //       }else{
    //         alert("No Parts Information available in Server");
    //       }
    //     }else{
    //       alert("No Parts Information available in Server");
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     alert("API Error!!");
    //   });

    //Get Dashboard Information:
    var darshboard_info = require('../api/dashboard.json');
    console.log("Dashboard JSON: ", darshboard_info);
    var dataSetInfo = {
      dataSets: [{
        values: [
          {value: 60, label: "Part Name1"},
          {value: 20, label: "Part Name2"},
        ],
        label: 'Pie dataset',
        config: {
          colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D'), processColor('#6BADDD')],
          valueTextSize: 18,
          valueTextColor: processColor('green'),
          sliceSpace: 5,
          selectionShift: 13
        }
      }],
    }

    var newDataSet = [];
    for(item in darshboard_info){
      var inventory_info = {value: parseInt(darshboard_info[item].availCapacity), label: darshboard_info[item].PartName};
      newDataSet.push(inventory_info);
    }

    dataSetInfo.dataSets[0].values = newDataSet;
    //console.log("dashboard Info: ", dataSetInfo);
    this.setState({dataInfo: dataSetInfo});
  }

  scan_qr = () => {
    //Scan QR
    //Actions.tab2();
    Actions.partsInfo();
  }

  generate_qr = () => {
    //Generate QR
    Actions.generateQR();
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    for(item in this.state.dashboard_api_res){
      if(this.state.dashboard_api_res[item].partName == entry.label){
        Actions.partsInfo(this.state.dashboard_api_res[item]);
        break;
      }
    }

    //Actions.partsInfo();
    //console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header androidStatusBarColor="rgba(210, 10, 15, 1)" style={styles.navigationBarStyle}>
          <Left>
          </Left>

          <Title style={styles.navHeaderTitle}>{I18n.t("Dashboard")}</Title>

          <Right>

          </Right>
        </Header>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.qrbutton} onPress={() => this.scan_qr()}>
            <View>
              <Text style={styles.qrbuttonTxt}>{I18n.t("ScanQRCode_btn")}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qrbutton} onPress={() => this.generate_qr()}>
            <View>
              <Text style={styles.qrbuttonTxt}>{I18n.t("GenerateQRCode_btn")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('lightgrey')}
          chartDescription={this.state.description}
          data={this.state.dataInfo}
          legend={this.state.legend}
          highlights={this.state.highlights}

          entryLabelColor={processColor('black')}
          entryLabelTextSize={18}
          drawEntryLabels={true}

          rotationEnabled={true}
          rotationAngle={45}
          usePercentValues={false}
          styledCenterText={{text:'Parts Availability ', color: processColor('red'), size: 20}}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          maxAngle={360}
          onSelect={this.handleSelect.bind(this)}
          onChange={(event) => console.log(event.nativeEvent)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  qrbutton: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: "rgb(244, 245, 247)",
    borderWidth: 0.6,
    borderColor: 'darkgrey'
  },
  qrbuttonTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: "400",
    color: 'black'
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
  chart: {
    flex: 1
  }
});

// data: {
//   dataSets: [{
//     values: [
//       {value: 60, label: I18n.t("PrimaryLocationCount") + '(60)'},
//       {value: 20, label: I18n.t("BufferLocationCount") + ' 1 (20)'},
//     ],
//     label: 'Pie dataset',
//     config: {
//       colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
//       valueTextSize: 18,
//       valueTextColor: processColor('green'),
//       sliceSpace: 5,
//       selectionShift: 13
//     }
//   }],
// }
