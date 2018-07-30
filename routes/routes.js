import React, { Component } from 'react';
import { StyleSheet, View, PixelRatio, Alert, AsyncStorage, NetInfo,Text, TouchableOpacity, Image, Dimensions, Keyboard } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRScanner from '../containers/qr_scan';
import Dashboard from '../containers/dashboard';
import GenerateQR from '../containers/generateQR';
import PartsInfo from '../containers/partsInfo';
import PartsList from '../containers/partsList';
import Settings from '../containers/settings';
import SNPCardDetail from '../containers/SNPCardDetail';
import Login from '../containers/Login';
import { YellowBox } from 'react-native';
import partSearchScreen from 'partsSearchScreen';

class TabIcon extends React.Component {
  render() {
    var color = this.props.focused ? 'rgba(210, 10, 15, 1)' : 'grey';

    return (
      <View style={{flex:1, width: 100, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={26}/>
      </View>
    );
  }
}

// const TabIcon = ({ focused, title }) => {
//   switch (title) {
//     case 'Scan':
//       return (
//         <View>
//           <Icon color={focused ? 'rgba(210, 10, 15, 1)' : 'grey' } name="qrcode-scan" size={35}/>
//         </View>
//       )
//     case 'Dashboard':
//       return (
//         <View>
//           <Icon color={focused ? 'rgba(210, 10, 15, 1)' : 'grey' } name="view-dashboard" size={35}/>
//         </View>
//       )
//     case 'Parts List':
//       return (
//         <View>
//           <Icon color={focused ? 'rgba(210, 10, 15, 1)' : 'grey' } name="buffer" size={35}/>
//         </View>
//       )
//     case 'Inbound':
//       return (
//         <View>
//           <Icon color={focused ? 'rgba(210, 10, 15, 1)' : 'grey' } name="arrow-down-bold-box-outline" size={35}/>
//         </View>
//       )
//     case 'Outbound':
//       return (
//         <View>
//           <Icon color={focused ? 'rgba(210, 10, 15, 1)' : 'grey' } name="arrow-up-bold-box-outline" size={35}/>
//         </View>
//       )
//     case 'Settings':
//       return (
//         <View>
//           <Icon color={focused ? 'rgba(210, 10, 15, 1)' : 'grey' } name="settings-outline" size={35}/>
//         </View>
//       )
//   }
// }

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  }

  tab1_pressed = () => {
    Keyboard.dismiss();
    Actions.replace('tab1');
  }

  tab2_pressed = () => {
    Keyboard.dismiss();
    Actions.replace('tab2');
  }

  tab3_pressed = () => {
    Keyboard.dismiss();
    Actions.replace('tab3');
  }

  tab4_pressed = () => {
    Keyboard.dismiss();
    Actions.replace('tab4');
  }

  tab5_pressed = () => {
    Keyboard.dismiss();
    Actions.replace('tab5');
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" title="Login" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={Login} />
          <Scene key="parts_search" title="Parts Number Search" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} initial={true} component={partSearchScreen} />
        </Scene>
      </Router>
    );
  }
}

// <Scene key="tabs" tabs={true} swipeEnabled={false} activeTintColor="rgba(210, 10, 15, 1)" tabBarStyle={styles.tabBar} default="tab1" tabBarPosition='bottom' initial={true} hideNavBar={true}>
//   <Scene key="tab1" title="Dashboard" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={Dashboard} iconName="view-dashboard" icon={TabIcon} tabBarOnPress={() => this.tab1_pressed()}/>
//   <Scene key="tab2" title="Scan" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={QRScanner} iconName="qrcode-scan" icon={TabIcon} tabBarOnPress={() => this.tab2_pressed()}/>
//   <Scene key="tab3" title="Parts List" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={PartsList} iconName="buffer" icon={TabIcon} tabBarOnPress={() => this.tab3_pressed()}/>
//   <Scene key="tab5" title="Settings" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={Settings} iconName="settings-outline" icon={TabIcon} tabBarOnPress={() => this.tab5_pressed()}/>
// </Scene>
// <Scene key="generateQR" title="Generate QR Code" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={GenerateQR} />
// <Scene key="partsInfo" title="Parts Information" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={PartsInfo}/>
// <Scene key="SNPDetail" title="SNP Card Detail" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={SNPCardDetail}/>

// <Scene key="tab3" title="Inbound" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={Inbound} icon={TabIcon} tabBarOnPress={() => this.tab3_pressed()}/>
// <Scene key="tab4" title="Outbound" titleStyle={styles.navigationBarTitleStyle} navigationBarStyle={styles.navigationBarStyle} hideNavBar={true} component={Outbound} icon={TabIcon} tabBarOnPress={() => this.tab4_pressed()}/>

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: 'darkgrey',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: 'ghostwhite',
    opacity: 0.90,
    height: 60
  },
  navigationBarStyle: {
    backgroundColor:'rgba(210, 10, 15, 1)', height: 80
  },
  navigationBarTitleStyle: {
    alignSelf: 'center', color: "#fff", fontSize: 24, fontWeight: '600'
  },
  loginNavBarStyle: {
    backgroundColor:"rgba(109, 110, 107, 1)", height: 140
  },
  tabBar: {
    borderTopColor: 'darkgrey',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: 'ghostwhite',
    opacity: 0.98
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tabBar: {
//     borderTopColor: 'darkgrey',
//     borderTopWidth: 1 / PixelRatio.get(),
//     backgroundColor: 'ghostwhite',
//     opacity: 0.90,
//     height: 60
//   },
//   navigationBarStyle: {
//     backgroundColor:'rgba(210, 10, 15, 1)', height: 80
//   },
//   navigationBarTitleStyle: {
//     alignSelf: 'center', color: "#fff", fontSize: 24, fontWeight: '600'
//   },
//   loginNavBarStyle: {
//     backgroundColor:"rgba(109, 110, 107, 1)", height: 140
//   }
// });
