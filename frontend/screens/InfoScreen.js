import * as React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Dimensions, TouchableOpacity, Text, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Searchnavigator from "./Searchnavigator";
import Newsnavigator from "./Newsnavigator";
import Card from "../components/card";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
console.disableYellowBox = true;
let ok = false;

const list = [
  {
    id: 1,
    title: 'How many times a day should a adult take amoxicillinWhat should I avoid while taking Augmentin?',
    body: 'Amoxicillin is usually taken three times a day, but may be given twice a dayAmoxicillin is usually taken three times a day, ',
  },
  {
    id: 2,
    title: '"What should I avoid while taking Augmentin?"',
    body: '"Avoid taking this medicine together with or just after eating a high-fat meal. This will make it harder for your body to absorb the medication. "'
  }
]

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={['#c3fdff', '#0083B0']}>

        <View
          style={{

            alignItems: "center",
            justifyContent: "center",

          }}
        >
          <View
            style={{

              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate("News")}
            >
              <LinearGradient
                // Button Linear Gradient

                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name="newspaper-o" size={32} color="white" />
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 25,
                      marginLeft: 8,
                      color: '#fff',
                    }}>
                    News
          </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View
            style={{

              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate("Antibiotics")}
            >
              <LinearGradient
                // Button Linear Gradient
                style={{ width: 80 }}
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5 name="tablets" size={32} color="white" />
                  <Text
                    style={{
                      margin: 5,
                      backgroundColor: 'transparent',
                      fontSize: 25,
                      color: '#fff',
                    }}>
                    Antibiotics
          </Text>


                </View>
              </LinearGradient>

            </TouchableOpacity>
          </View>

        </View>
      </LinearGradient>
    </View>
  );
}

const Stack = createStackNavigator();

function InfoScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Info Spectrum" component={HomeScreen} />
      <Stack.Screen name="News" component={Newsnavigator} />
      <Stack.Screen name="Antibiotics" component={Searchnavigator} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  griditems: {
    padding: 5,
    flex: 1,
    margin: 10,
    height: 200,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    textAlign: "right",
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#d1d1d1",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});
export default InfoScreen;
