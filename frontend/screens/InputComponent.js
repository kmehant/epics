import * as React from "react";
import NumericInput from "react-native-numeric-input";
import { Text, View, StyleSheet, Dimensions, AsyncStorage, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Card from "../components/card";
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
console.disableYellowBox = true;
let t = []; //array of objects for dropdown
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class InputComponent extends React.Component {
  state = {
    duration: "",
    dosage: "",
    antibiotic: "",
    setState: false,
    data: "", //fetched data
    v: "", //storing names of antibiotics
    aid: -1,
    loading: false

  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await this.getinfo();
    this.setState({
      loading: false,
    });
  }

  getinfo = async () => {
    this.setState({
      loading: true,
    });
    fetch("https://epics-project.herokuapp.com/get/antibiotics", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())

      .then((json) => {
        this.setState({
          data: json,
        });
        console.log(this.state.data);

        //getting names of antibiotics
        this.state.v = this.state.data.map(function (nested) {
          return nested[1];
        });
        for (let i = 0; i < this.state.v.length; ++i) {
          let obj = {
            value: this.state.v[i],
          };
          t.push(obj);
        }
        console.log(t);
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
  };

  add = async () => {
    this.setState({
      loading: true,
    });
    if (this.state.aid == -1 || this.state.duration == "" || this.state.dosage == "") {
      Alert.alert("PASP", "Please fill the fields");
      this.setState({
        loading: false,
      });
    }
    console.log("add clicked")
    var end_date = new Date(); // present date
    end_date.setDate(end_date.getDate() + parseInt(this.state.duration));
    end_date = end_date.toISOString().replace("T", " ").split(" ");
    console.log("present date")
    console.log(end_date[0])
    end_date = end_date[0]
    let str =
      "https://epics-project.herokuapp.com/input?" +
      "aid=" +
      this.state.aid +
      "&dosage=" +
      this.state.dosage +
      "&dosage_pattern=XXXX" +
      "&end_date=" +
      end_date;
    fetch(str, {
      method: "POST",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((resp) => {
        if (resp.ok || resp.status == 201)
          // login success
          return "success";
        else {
          console.log(resp.status);
          return "Failed";
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading: false,
        });
        if (jsonData == "Failed") {
          Alert.alert("Oops", "Something went wrong on our side, please retry later");
        } else if (jsonData == "success") {
          Alert.alert("Success", "Added successfully");

        }
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
  };

  getAntibiotic(text) {
    this.setState({ antibiotic: text });

    let a
    let temp_aid = []
    a = this.state.data.map((nested) => {
      if (nested[1] === this.state.antibiotic) {
        console.log(nested)
        temp_aid = nested;
      }
    });
    console.log(temp_aid)
    this.setState({
      aid: temp_aid[0]
    });
    console.log(this.state.aid);
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



      <View style={{ flex: 1, height: height }}>
        <LinearGradient style={{ flex: 1 }} colors={['#c3fdff', '#0083B0']}>
          <Card style={({ elevation: 0 }, styles.dropdown)}>
            <View style={styles.dropdown}>
              <Dropdown
                label="Antibiotic"
                disabledItemColor="#000000"
                baseColor="#000000"
                dropdownPosition="0"
                data={t}
                onChangeText={(t) => this.getAntibiotic(t)}
              />
            </View>
          </Card>
          <Card style={({ elevation: 0 }, styles.card)}>
            <View style={styles.input}>
              <Text>DOSAGE AMOUNT :</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text>{this.state.dosage} mg</Text>
              </View>

              <NumericInput
                value={this.state.dosage}
                onChange={(dosage) => this.setState({ dosage })}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={Dimensions.get("window").width - 40}
                totalHeight={50}
                rounded
                iconSize={15}
                step={25}
                valueType="real"
                textColor="#000000"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#90caf9"
                leftButtonBackgroundColor="#ee98fb"
                minValue={0}
              />
            </View>
          </Card>
          <Card style={styles.card}>
            <View style={styles.input}>
              <Text>Dosage duration</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text>{this.state.duration} days</Text>
              </View>

              <NumericInput
                value={this.state.duration}
                onChange={(duration) => this.setState({ duration })}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={Dimensions.get("window").width - 40}
                totalHeight={50}
                rounded
                iconSize={15}
                step={1}
                valueType="real"
                textColor="#000000"
                iconStyle={{ color: "black" }}
                rightButtonBackgroundColor="#90caf9"
                leftButtonBackgroundColor="#ee98fb"
                minValue={0}
              />

            </View>
          </Card>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.add}
          >

            <View style={{ margin: 15 }}>
              <LinearGradient
                // Button Linear Gradient

                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Entypo name="add-to-list" size={32} color="white" />
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 25,
                      marginLeft: 8,
                      color: '#fff',
                    }}>
                    Add
          </Text>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>

        </LinearGradient>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: "black",
  },
  input: {
    alignItems: "center",
    margin: 30,

    fontFamily: "open-sans-bold",
  },
  dropdown: {
    width: Dimensions.get("window").width,
    elevation: 0,
    paddingLeft: 5,
  },
  card: {
    borderRadius: 20,
    elevation: 0,
    marginTop: 32,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
  },
  screen: {
    flex: 1,
  },
});

export default InputComponent;
