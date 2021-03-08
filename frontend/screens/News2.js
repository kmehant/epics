import * as React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { FlatList, BorderlessButton } from "react-native-gesture-handler";
import { Card, Icon } from "react-native-elements";
import { Button, Image, TouchableOpacity, TouchableNativeFeedback, ImageBackground, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Cards from "../components/card"
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
console.disableYellowBox = true;
class News2 extends React.Component {
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
            <View style={{ backgroundColor: "lightblue" }}>
                <LinearGradient colors={['#c3fdff', '#0083B0']}>
                    <FlatList
                        data={this.state.jsonData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Card style={{ overflow: "hidden" }}
                                image={{ uri: item.urlToImage }}>

                                <View style={{ overflow: "hidden" }}>




                                    <TouchableNativeFeedback

                                        background={TouchableNativeFeedback.Ripple('pink', true, false, false, false)}
                                    >
                                        <Cards>
                                            <LinearGradient
                                                // Button Linear Gradient
                                                colors={['#edffff', '#edffff']}>

                                                <View style={{ flexDirection: "column", margin: 3 }}>

                                                    <Text style={{ fontFamily: "open-sans-bold", marginBottom: 10 }}>{item.title}</Text>

                                                    <Text style={{ marginBottom: 5 }}>
                                                        {item.description || item.title}
                                                    </Text>

                                                    <View style={{ flexDirection: "row-reverse" }}>
                                                        <TouchableOpacity onPress={() => {
                                                            WebBrowser.openBrowserAsync(item.url);
                                                        }}>
                                                            <AntDesign name="rightcircle" size={19} color="black" />
                                                        </TouchableOpacity>
                                                    </View>



                                                </View>
                                            </LinearGradient>
                                        </Cards>

                                    </TouchableNativeFeedback>
                                </View>
                            </Card>
                        )}
                    />
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

export default News2;
