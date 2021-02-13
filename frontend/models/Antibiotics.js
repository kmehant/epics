import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { AccordionList, Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Card from "../components/card"
import { Entypo } from '@expo/vector-icons';
console.disableYellowBox = true;
let ok = true

const list = [
  {
    id: 1,
    title: 'Amoxicillin',
    why: 'Usage: macrolide resistance, increase cardiovascular mortality',
    dosage: 'Dosage Pattern: 500mg po/IV on day 1 then 250mg daily for 4 days',
    effect: 'Effect: Moderate',
    risk: 'Risk factor: Medium'
  },
  {
    id: 2,
    title: 'Clindamycin',
    why: 'Usage: NA',
    dosage: 'Dosage Pattern: 300-450mg PO q6h',
    effect: 'Effect: Excellent',
    risk: 'Risk factor: high'
  },
  {
    id: 3,
    title: 'Doxycyline',
    why: 'Usage: skin and soft tissue infection',
    dosage: 'Dosage Pattern: 100mg PO BID',
    effect: 'Effect: Excellent',
    risk: 'Risk factor: Low'
  },
  {
    id: 4,
    title: 'Ertapenem',
    why: 'Usage: ESBL infections',
    dosage: 'Dosage Pattern: 1g IV q24h',
    effect: 'Effect: Medium',
    risk: 'Risk factor: NA'
  },
  {
    id: 5,
    title: 'Fidoxomicin',
    why: 'Usage: C. difficile colitis',
    dosage: 'Dosage Pattern: 200mg po BID X 10 days for C. difficile',
    effect: 'Effect: None',
    risk: 'Risk factor: None'
  },
  {
    id: 6,
    title: 'Gentamicin',
    why: 'Usage: Gram negative infections',
    dosage: 'Dosage Pattern: once daily dosing: 5-7mg/kg IV q24h',
    effect: 'Effect: NA',
    risk: 'Risk factor: Low'
  },
  {
    id: 7,
    title: 'Levofloxacin',
    why: 'Usage: Lower respiratory infection',
    dosage: 'Dosage Pattern: 500-750mg PO/IV daily',
    effect: 'Effect: Excellent',
    risk: 'Risk factor: High'
  },
  {
    id: 8,
    title: 'Meropenem',
    why: 'Usage: Nosocomial infections',
    dosage: 'Dosage Pattern: 500mg IV q6h',
    effect: 'Effect: NA',
    risk: 'Risk factor: Medium'
  },


];

// const list = [
//   {
//     id: 1,
//     title: 'Getting Started',
//     body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
//   },
//   {
//     id: 2,
//     title: 'Components',
//     body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
//   }
// ];


function head(item) {
  return (
    <Card style={{ margin: 2 }}>
      <Text></Text>

      <Text style={{ marginLeft: 10, fontFamily: 'open-sans-bold' }}>{item.title} </Text>
      <View style={{ flexDirection: 'row-reverse', marginLeft: 2 }}>
        <Entypo name="arrow-with-circle-down" size={20} color="black" />
      </View>

    </Card>
  );
};

function roast(item) {
  return (

    <View style={{ padding: 10, margin: 10, backgroundColor: 'white' }}>
      <Text style={{ fontFamily: 'open-sans', fontSize: 16 }}>{item.why}</Text>
      <Text style={{ fontFamily: 'open-sans' , fontSize: 16 }}>{item.dosage}</Text>
      <Text style={{ fontFamily: 'open-sans', fontSize: 16 }}>{item.effect}</Text>
      <Text style={{ fontFamily: 'open-sans', fontSize: 16 }}>{item.risk}</Text>
    </View>

  );
};





export default function Antibiotics() {


  return (


    <View style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={['#c3fdff', '#0083B0']}>


        <View style={styles.container}>


          <ScrollView style={styles.container1} contentContainerStyle={styles.contentContainer}>

            <AccordionList
              list={list}
              header={head}
              body={roast}



              keyExtractor={item => `${item.id}`}
            />



          </ScrollView>


        </View>
      </LinearGradient>

    </View >);
}

Antibiotics.navigationOptions = {
  header: null,
};






const styles = StyleSheet.create({

  container: {
    marginTop: 30


  },
  container1: {
    marginTop: 10
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    margin: 10
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
