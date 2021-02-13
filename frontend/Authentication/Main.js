import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, MaterialIcons, AntDesign } from "react-native-vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import InfoScreen from "../screens/InfoScreen";
import InputScreen from "../screens/InputScreen";
import Settings from "../screens/Settings";
import { MaterialCommunityIcons } from '@expo/vector-icons';
console.disableYellowBox = true;

const BottomTab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default class Main extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTab.Navigator
          initialRouteName={INITIAL_ROUTE_NAME}
          activeColor="white"
          inactiveColor="lightgrey"
          barStyle={{ backgroundColor: "#00008B" }} // bottomtab color
        >
          <BottomTab.Screen
            name="Info"
            component={InfoScreen}
            options={{
              title: "Inform",

              fontFamily: "open-sans-bold",
              tabBarIcon: ({ color }) => (
                <AntDesign name="book" color={color} size={24} />
              ),
            }}
          />

          <BottomTab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: "Faqs",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="frequently-asked-questions" size={24} color="white" />
              ),
            }}
          />
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Dash",
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-stats" color={color} size={24} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Input"
            component={InputScreen}
            options={{
              title: "Input",

              tabBarIcon: ({ color }) => (
                <MaterialIcons name="input" color={color} size={24} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <Ionicons name="md-cog" color={color} size={20} />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    );
  }
}
