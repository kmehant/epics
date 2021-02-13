import * as React from "react";
import { Text, View, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Icon } from "react-native-elements";
import { Button, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import * as WebBrowser from "expo-web-browser";
console.disableYellowBox = true;
import { LinearGradient } from 'expo-linear-gradient';

class Settings extends React.Component {
  state = {
    username: ""
  };

  logout() {
    Alert.alert("Success", "Logout is done");
    Alert.alert(
      "Success",
      "Logout is done",
      [
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    AsyncStorage.setItem("username", "");
    AsyncStorage.setItem("password", "");
    AsyncStorage.setItem("otp", "");
  }
  async componentDidMount() {
    this.setState({
      loading: false,
    });
    let name =  await AsyncStorage.getItem("username");
    this.setState({
      username: name
    })

  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={{ backgroundColor: "light", height: '100%', textAlign: 'center' }}>
                <LinearGradient style={{flex: 1}} colors={['#c3fdff', '#0083B0']}>
              
                 <Text style={{marginTop: 100, fontFamily: 'open-sans-bold', alignSelf: 'center'}}> User Name: {this.state.username}</Text>
            

              <TouchableOpacity style={styles.loginBtn} onPress={this.logout}>
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
                        Logout
          </Text>
                    </View>
                  </LinearGradient>
              </TouchableOpacity>
                </LinearGradient>

      </View>
    );
  }
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 10,
    textAlign: "right",
  },
  container: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Settings;
