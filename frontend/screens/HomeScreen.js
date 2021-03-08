import * as React from "react";

import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import DashComponent from './DashComponent';
console.disableYellowBox = true;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <DashComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: 150,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  contentContainer: {
    paddingTop: 30,
  },
});
