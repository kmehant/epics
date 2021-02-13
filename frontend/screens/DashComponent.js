import * as React from 'react';
import { Text, View, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Row, Col } from 'react-native-responsive-grid-system';
import { LinearGradient } from 'expo-linear-gradient';
console.disableYellowBox = true;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Card from '../components/card';
const chartConfig = {
  backgroundGradientFrom: "#8f9eff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#0021f5",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0.5) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');


class DashComponent extends React.Component {
  state = {
    g_antibiotics: 0,
    antibiotics_data: [],
    g_pathogens: 0,
    pathogens_data: [],
    g_problems: 0,
    problems_data: [],
    antibiotics_data: [],
    syndromes_data: [],
    g_syndromes: 0,
    u_antibiotics: 0,
    u_pathogens: 0,
    u_problems: 0,
    u_syndromes: 0,
    loading: false,
    carousel_data: [],
    component_loading: true,
    antibiotics_count: [],
    pathogens_count: [],
    problems_count: [],
    syndromes_count: [],
    u_a_c: {},
    n_a_c: {},
    u_path_c: {},
    n_path_c: {},
    u_p_c: {},
    n_p_c: {},
    u_s_c: {},
    n_s_c: {},
  };

  async componentDidMount() {
    console.log("App started")
    this.setState({
      loading: true,
    });
    console.log("get")
    let g = 0
    g = await this.get()
    this.setData()
    // setTimeout( await this.setData(), 5000);
    console.log("setData")
    console.log(this.state.u_antibiotics)

    // await this.setData();
    this.setState({
      loading: false,
    });
  }
  setData = async () => {
    while (true) {
      let temp = {}, temp2 = {}
      let temp3 = {}, temp4 = {}
      let temp5 = {}, temp6 = {}
      let temp7 = {}, temp8 = {}

      let username = await AsyncStorage.getItem("username");
      let ta1 = [], ta2 = [], ta3 = [], ta4 = [];
      temp["count"] = this.state.g_antibiotics;
      temp["name"] = ": National"
      temp["color"] = "rgb(0, 191, 255)"
      temp["legendFontColor"] = "#FFFFFF"
      ta1.push(temp);
      temp2["count"] = this.state.u_antibiotics;
      temp2["name"] = ": " + username
      temp2["color"] = "rgb(199, 3, 18)"
      temp2["legendFontColor"] = "#FFFFFF"

      ta1.push(temp2)
      this.setState({
        antibiotics_data: ta1
      })
      temp3["count"] = this.state.g_syndromes;
      temp3["name"] = ": National"
      temp3["color"] = "rgb(0, 191, 255)"
      temp3["legendFontColor"] = "#FFFFFF"

      ta2.push(temp3);
      temp4["count"] = this.state.u_syndromes;
      temp4["name"] = ": " + username
      temp4["color"] = "rgb(199, 3, 18)"
      temp4["legendFontColor"] = "#FFFFFF"

      ta2.push(temp4)
      this.setState({
        syndromes_data: ta2
      })

      temp5["count"] = this.state.g_pathogens;
      temp5["name"] = ": National"
      temp5["color"] = "rgb(0, 191, 255)"
      temp5["legendFontColor"] = "#FFFFFF"

      ta3.push(temp5);
      temp6["count"] = this.state.u_pathogens;
      temp6["name"] = ": " + username
      temp6["color"] = "rgb(199, 3, 18)"
      temp6["legendFontColor"] = "#FFFFFF"

      ta3.push(temp6)
      this.setState({
        pathogens_data: ta3
      })
      temp7["count"] = this.state.g_problems;
      temp7["name"] = ": National"
      temp7["color"] = "rgb(0, 191, 255)"
      temp7["legendFontColor"] = "#FFFFFF"

      ta4.push(temp7);
      temp8["count"] = this.state.u_problems;
      temp8["name"] = ": " + username
      temp8["color"] = "rgb(199, 3, 18)"
      temp8["legendFontColor"] = "#FFFFFF"

      ta4.push(temp8)
      this.setState({
        problems_data: ta4
      })
    }
  }
  get = async () => {
    // g_antibiotics
    fetch("https://pasp-api.herokuapp.com/gstats/countof/aid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          g_antibiotics: json[0][0],
        });
        console.log("g_antibiotics")
        console.log(this.state.g_antibiotics);
      })
      .catch((error) => {
        console.error(error);
      });

    // u_antibiotics
    fetch("https://pasp-api.herokuapp.com/stats/countof/aid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          u_antibiotics: json[0][0],
        });
        console.log("u_antibiotics")
        console.log(this.state.u_antibiotics);
      })
      .catch((error) => {
        console.error(error);
      });
    // g_pathogens
    fetch("https://pasp-api.herokuapp.com/gstats/countof/pathid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          g_pathogens: json[0][0],
        });
        console.log("g_pathogens")
        console.log(this.state.g_pathogens);
      })
      .catch((error) => {
        console.error(error);
      });
    // g_problems
    fetch("https://pasp-api.herokuapp.com/gstats/countof/pid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          g_problems: json[0][0],
        });
        console.log("g_problems")
        console.log(this.state.g_problems);
      })
      .catch((error) => {
        console.error(error);
      });
    // g_syndromes
    fetch("https://pasp-api.herokuapp.com/gstats/countof/sid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          g_syndromes: json[0][0],
        });
        console.log("g_syndromes")
        console.log(this.state.g_syndromes);
      })
      .catch((error) => {
        console.error(error);
      });
    // u_pathogens
    fetch("https://pasp-api.herokuapp.com/stats/countof/pathid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          u_pathogens: json[0][0],
        });
        console.log("u_pathogens")
        console.log(this.state.u_pathogens);
      })
      .catch((error) => {
        console.error(error);
      });
    // u_problems
    fetch("https://pasp-api.herokuapp.com/stats/countof/pid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          u_problems: json[0][0],
        });

        console.log("u_problems")
        console.log(this.state.u_problems);
      })
      .catch((error) => {
        console.error(error);
      });
    // u_syndromes
    fetch("https://pasp-api.herokuapp.com/stats/countof/sid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          u_syndromes: json[0][0],
        });
        console.log("u_syndromes")
        console.log(this.state.u_syndromes);
      })
      .catch((error) => {
        console.error(error);
      });
    // u_antibiotics
    fetch("https://pasp-api.herokuapp.com/stats/mostcommon/aid", {
      method: "GET",
      headers: new Headers({
        token: await AsyncStorage.getItem("otp"),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          antibiotics_count: json,
        });
        console.log("antibiotics count")
        console.log(this.state.antibiotics_count);
        this.setState({
          u_a_c: this.state.antibiotics_count["with"]
        })
        console.log(this.state.u_a_c)
        this.setState({
          n_a_c: this.state.antibiotics_count["without"]
        })
        console.log(this.state.n_a_c)
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("rea")
    console.log(this.state.n_a_c)
    return 1;
  };
  // _renderItem({ item, index }) {
  //   return (
  //     <View>
  //       <PieChart
  //         data={this.state.carousel_data[index]}
  //         width={width}
  //         height={200}
  //         chartConfig={chartConfig}
  //         accessor="count"
  //         backgroundColor="transparent"
  //         paddingLeft="15"
  //         absolute
  //       />        </View>
  //   );
  // }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View >
        <LinearGradient colors={['#c3fdff', '#0083B0']}>
          <View style={{ marginTop: 30 }}>



            <Text style={{
              textAlign: "center",
              fontFamily: "open-sans-bold", color: "black"
            }}> User data / National Data </Text>


            <ScrollView
              horizontal={true}
            >
              <Card style={{ margin: 10, overflow: 'hidden' }}>
                <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>

                  <Text style={styles.headings}> Antibiotics:  </Text>

                  <PieChart
                    data={this.state.antibiotics_data}
                    width={width - 100}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="count"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                </LinearGradient>
              </Card>
              <Card style={{ margin: 10, overflow: 'hidden' }}>
                <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>

                  <Text style={styles.headings}>Syndromes</Text>
                  <PieChart
                    data={this.state.syndromes_data}
                    width={width - 100}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="count"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                </LinearGradient>
              </Card>
              <Card style={{ margin: 10, overflow: 'hidden' }}>
                <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>

                  <Text style={styles.headings}>Pathogens</Text>
                  <PieChart
                    data={this.state.pathogens_data}
                    width={width - 100}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="count"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                </LinearGradient>
              </Card>
              <Card style={{ margin: 10, overflow: 'hidden' }}>
                <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>

                  <Text style={styles.headings}>Problems</Text>
                  <PieChart
                    data={this.state.problems_data}
                    width={width - 100}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="count"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                  />
                </LinearGradient>
              </Card>

            </ScrollView>

          {/* <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.carousel_data}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
          /> */}






            <View style={{ flexDirection: 'row', fontFamily: 'open-sans-bold' }}>
              <Col>
                <Card style={{ margin: 2, width: width / 2 - 10, height: 100, overflow: "hidden" }}>
                  <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>


                    <View style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.headings}>Most Commonly used </Text>
                      <Text style={styles.headings}> Antibiotic</Text>
                      <Text style={{ fontSize: 20, color: "white" }}> {this.state.n_a_c[1]}</Text>

                      <Text style={{ fontSize: 25, color: "white" }}>{this.state.n_a_c[0]}</Text>

                    </View>
                  </LinearGradient>
                </Card>

              </Col>


              <Col >
                <Card style={{ margin: 2, width: width / 2, height: 100 }}>
                  <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>

                    <View style={{ textAlign: 'center', alignItems: 'center' }}>
                      <Text style={styles.headings}>Most Commonly used</Text>
                      <Text style={styles.headings}>Antibiotic by you</Text>
                      <Text style={{ fontSize: 20, color: "white" }}> {this.state.u_a_c[1]}</Text>
                      <Text style={{ fontSize: 25, color: "white" }}>{this.state.u_a_c[0]}</Text>
                    </View>
                  </LinearGradient>
                </Card>
              </Col>
            </View>



          </View>
        </LinearGradient>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  headings:
  {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: "white"

  },
  screen: {
    flex: 1,
    backgroundColor: 'grey'
  },
  authContainer: {
    alignContent: "center",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    backgroundColor: "#424242",
  },
  inputView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "white",
    fontSize: 11,
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
  loader: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
  },
  backgroundImage: {
    width: 200,
    height: 200,
    paddingVertical: 100,
  },
});

export default DashComponent



// let with_ = this.state.antibiotics_count["with"];
// let without_ = this.state.antibiotics_count["without"]
// let max_a = with_[0][0];
// let ans0
// for(let i=1; i<with_.length; i++){
//   if (max_a < with_[i][0])
//   max_a = with_[i][0]
//   ans0 = with_[i]  

// }
// this.setState({
//   u_a_c: ans0
// })
// let ans
// let max_a_n = without_[0][0];
// for(let i=1; i<without_.length; i++){
//   if (max_a_n < without_[i][0]) {
//   max_a_n = without_[i][0]
// ans = without_[i]  
// }
// }
// this.setState({
//   n_a_c: ans
// })

