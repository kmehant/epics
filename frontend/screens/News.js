import * as React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Icon } from "react-native-elements";
import { Button, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import card from "../components/card"
console.disableYellowBox = true;
class News extends React.Component {
  state = {
    jsonData: [],
    loading: false,
  };

  getNews() {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=fcdb015ad0a64c61b62fa70c835e965e",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          jsonData: json.articles,
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
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.getNews();
    }, 0);
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
      <View style={{ paddingTop: 30, backgroundColor: "light" }}>
        <FlatList
          data={this.state.jsonData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              containerStyle={styles.container}
              featuredTitle={item.title}
              featuredTitleStyle={{
                color: "white",
                textShadowColor: "black",
                textShadowOffset: { width: -2, height: 2 },
                textShadowRadius: 10,
              }}
              wrapperStyle={{ backgroundColor: "#303030" }}
              image={{ uri: item.urlToImage }}
            >
              <Text style={{ marginBottom: 5, color: "white" }}>
                {item.description || item.title}
              </Text>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  WebBrowser.openBrowserAsync(item.url);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "black" }}>More</Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
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
    width: "100%",
    backgroundColor: "#d1d1d1",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default News;
