import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, CheckBox, Title, Subtitle, Card, CardItem, H1, H2, H3, Picker, Form,  Item, Label, Input, Item as FormItem } from 'native-base';
import I18n from '../language/i18n.js';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
//import { captureScreen } from "react-native-view-shot";

export default class SNPCardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrinter:  null,
      printImageURI: ""
    }
  }

  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter()
    this.setState({ selectedPrinter })
  }

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First')
    }

    const jobName = await RNPrint.print({
      printerURL: this.state.selectedPrinter.url,
      html: '<h1>Silent Print</h1>'
    })

  }

  async printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Custom converted PDF Document</h1>',
      fileName: 'test',
      base64: true,
    })

    await RNPrint.print({ filePath: results.filePath })
  }

  async printRemotePDF() {
    await RNPrint.print({ filePath: 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg' })
    //await RNPrint.print({ filePath: this.state.printImageURI })
  }


  captureScreenFunction=()=>{
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
    .then(
      uri => this.setState({ imageURI : uri }),
      alert("Hello Screen!!"),
      error => console.error("Oops, Something Went Wrong", error)
    );
  }

  PrintPreview = () => {

    // var ref = React.findNodeHandle(this.refs.catView);
    // alert(JSON.toString(ref));

    // ViewSnapshotter.saveSnapshotToPath(ref, this.imagePath(), (error, successfulWrite) => {
    //   if (successfulWrite) {
    //       this.setState({catSaved: true})
    //   } else {
    //     console.log(error)
    //   }
    // })

    //this.captureScreenFunction();
    this.printRemotePDF();
    // this.refs.viewShot.capture().then(uri => {
    //     console.log("do something with ", uri);
    //   }
    // );
    // .catch(error => {
    //   console.error(error);
    //   // alert("API Error!!");
    // });
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

          <Title style={styles.navHeaderTitle}>{I18n.t("SNPCardDetail")}</Title>

          <Right>

          </Right>
        </Header>
          <Content style={{padding: 10}}>
            <Card style={{flex: 1}}>
              <CardItem>
                <Item floatingLabel style={{marginTop:5}}>
                  <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('PartNumber')}</Label>
                  <Input value="ENAG1234" editable={false}/>
                </Item>
              </CardItem>

              <CardItem>
                <Item floatingLabel style={{marginTop:5}}>
                  <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('PartName')}</Label>
                  <Input value="Engine" editable={false}/>
                </Item>
              </CardItem>

              <CardItem>
                <Item floatingLabel style={{marginTop:5}}>
                  <Label style={{fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('Quantity')} <Text style={{color:'red'}}> *</Text></Label>
                  <Input value="" keyboardType="numeric"/>
                </Item>
              </CardItem>

              <CardItem style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                <Label style={{paddingBottom: 10, fontSize: 16, color:'black', fontWeight:'bold'}}>{I18n.t('QRCode')} <Text style={{color:'red'}}> *</Text></Label>
                <View style={{flex: 1, paddingLeft: Dimensions.get('window').width/2 - 120}}>
                  <Image style={{alignItems: 'center', width: 200, height: 200}} source={{uri: 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=Hello+world?choe=UTF-8'}}/>
                </View>
              </CardItem>

              <CardItem>
                <Button onPress={() => this.PrintPreview()} style={{flex: 1, backgroundColor: "rgba(210, 10, 15, 1)", alignItems:'center', justifyContent: 'center'}} >
                  <Text style={{textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold"}}>{I18n.t('PrintSNP')}</Text>
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
