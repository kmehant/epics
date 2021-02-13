import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import Main from "./Main";
console.disableYellowBox = true;
const Navigator = createStackNavigator(
  {
    Home: Login,
    Signup: Signup,
    Forgot: Forgot,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const switching = createSwitchNavigator({
  navigator: Navigator,
  Main: Main,
});

const Appcontainer = createAppContainer(switching);
export default class Files extends React.Component {
  render() {
    return <Appcontainer />;
  }
}
