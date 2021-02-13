import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  AsyncStorage,
  Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
console.disableYellowBox = true;

import Card from "../components/card";
export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    otp: "",
    loading: false,
  };

  login = () => {
    this.setState({
      loading: true,
    });
    let u = this.state.username;
    let p = this.state.password;
    let o = this.state.otp;
    let str = "";
    if (u == "" || p == "") {
      Alert.alert("PASP", "Please fill the fields");
      this.setState({
        loading: false,
      });
      return;
    }
    if (o != "")
      str =
        "https://pasp-api.herokuapp.com/login?" +
        "username=" +
        u +
        "&password=" +
        p +
        "&otp=" +
        o;
    else
      str =
        "https://pasp-api.herokuapp.com/login?" +
        "username=" +
        u +
        "&password=" +
        p;

    fetch(str, {})
      .then((resp) => {
        if (resp.ok && resp.status == 200)
          // login success
          return "success";
        else if (resp.status == 203)
          return "A unique pin is sent to your registered email id and use it whenever you login";
        else {
          console.log(resp.status);
          return "Wrong username/password/pin";
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        if (jsonData == "Failed") {
          Alert.alert("Authentication Failed", "Wrong username/password/otp");
        } else if (jsonData == "success") {
          // store values and navigate to dasboard
          AsyncStorage.setItem("username", this.state.username);
          AsyncStorage.setItem("password", this.state.password);
          AsyncStorage.setItem("otp", this.state.otp);
          this.props.navigation.navigate("Main");

          //  alert(jsonData);
        } else {
          Alert.alert("PIN has been sent", jsonData);
        }
        this.setState({
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#242424" }}
      >
        <LinearGradient style={{ flex: 1 }} colors={['#c3fdff', '#0083B0']}>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 100,
            }}
          >

            <ImageBackground
              source={require("../assets/images/logo.png")}
              style={styles.backgroundImage}
            ></ImageBackground>

          </View>


          <Card style={styles.authContainer}>

            <ScrollView>
              <View style={styles.inputView}>
                <View style={{ flexDirection: 'row' }}>
                  <AntDesign style={{ marginRight: 10, marginTop: 10 }} name="user" size={24} color="black" />
                  <TextInput
                    style={styles.inputText}
                    placeholder="User Name ."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => this.setState({ username: text })}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons style={{ marginRight: 10, marginTop: 10 }} name="textbox-password" size={24} color="black" />
                  <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="PIN (Forgot no problem, just login)"
                  placeholderTextColor="#003f5c"
                  onChangeText={(text) => this.setState({ otp: text })}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Forgot")}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "black", fontFamily: "open-sans-bold" }}>  >>> Forgot Password?</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "black", fontFamily: "open-sans-bold" }}> >>> Register</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                <View style={{ margin: 15 }}>
                  <LinearGradient
                    // Button Linear Gradient

                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row' }}>

                      <Text
                        style={{
                          backgroundColor: 'transparent',
                          fontSize: 20,
                          margin: 10,
                          color: '#fff',
                        }}>
                        LOGIN
          </Text>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Signup")}
              >



              </TouchableOpacity>
            </ScrollView>
          </Card>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer1: {
    alignContent: "center",
    width: "90%",
    maxWidth: 150,
    maxHeight: 150,
    padding: 5,
    margin: 5,
    backgroundColor: "lightblue",
  },
  authContainer: {
    alignContent: "center",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    margin: 15,
    backgroundColor: "lightblue",
  },
  inputView: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 10,
  },
  inputText: {
    height: 50,
    color: "black",
    fontFamily: 'open-sans'
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "100%",

    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
  },
  backgroundImage: {
    width: 130,
    height: 130,
    paddingVertical: 100,
    borderRadius: 25
  },
});
