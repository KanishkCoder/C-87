import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";
import firebase from "firebase";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      light_theme: true
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  async initiateTTS(title, author, story, moral) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak("The moral of the story is!");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
      <View style={this.state.light_theme ? styles.containerLight : styles.container}> <SafeAreaView style={styles.droidSafeArea} /> <View style={styles.appTitle}> <View style={styles.appIcon}> <Image source={require("../assets/logo.png")} style={{ width: 60, height: 60, resizeMode: 'contain', marginLeft: 10 }}></Image> </View> <View style={styles.appTitleTextContainer}> <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>
      Storytelling App </Text> </View> </View>
      <View style={styles.storyContainer}> <ScrollView style={this.state.light_theme ? styles.storyCardLight : styles.storyCard}> <View style={styles.imageContainer}> <Image source={require("../assets/story_image_1.png")} style={{ resizeMode: 'contain', width: Dimensions.get('window').width - 40, height: 250, borderRadius: 20, marginTop: -10 }}></Image> </View>
      <View style={styles.dataContainer}> <View style={styles.titleTextContainer}> <View style={styles.storyTitle}> <Text style={this.state.light_theme ? styles.storyTitleTextLight : styles.storyTitleText}>{this.props.route.params.title} </View>
      <View style={styles.storyAuthor}> <Text style={this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>{this.props.route.params.author} </View> <View style={styles.storyAuthor}> <Text style={this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>{this.props.route.params.created_on} </View> </View>
      <View style={styles.iconContainer}> <TouchableOpacity onPress={() => this.initiateTTS(this.props.route.params.title, this.props.route.params.author, this.props.route.params.story, this.props.route.params.moral)}> <Ionicons name={this.state.speakerIcon} size={30} color={this.state.speakerColor} style={{ width: 30, margin: 15 }} /> </TouchableOpacity>
      </View> </View> <View style={styles.storyTextContainer}> <View> <Text style={this.state.light_theme ? styles.storyTextLight : styles.storyText}>{this.props.route.params.story} </View> <View> <Text style={this.state.light_theme ? styles.moralTextLight : styles.moralText}>Moral - {this.props.route.params.moral} </View> </View>
      <View style={styles.actionContainer}> <View style={styles.likeButton}> <View style={styles.likeIcon}> <Ionicons name={"heart"} size={30} color={this.state.light_theme ? "black" : "white"} style={{ width: 30, marginLeft: 20, marginTop: 5 }} /> </View> <View> <Text style={this.state.light_theme ? styles.likeTextLight : styles.likeText}>12k</Text> </View> </View> </View> </ScrollView> </View> </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  containerLight:{
     flex: 1, 
     backgroundColor: "white" },
  appTitleTextLight: {
     color: "black", 
     fontSize: 28, 
     fontFamily: "Bubblegum-Sans", 
     paddingLeft: 20 },
  storyCardLight: { margin: 20, 
  backgroundColor: "white", 
  borderRadius: 20, 
  shadowColor: 'rgb(0, 0, 0)', 
  shadowOffset: { width: 3, height: 3, }, 
  shadowOpacity: 0.5, 
  shadowRadius: 5, 
  elevation: 2, },
  storyTitleTextLight: { 
    fontFamily: "Bubblegum-Sans", 
    fontSize: 25, 
    color: "black" },
  storyAuthorTextLight: { 
    fontFamily: "Bubblegum-Sans", 
    fontSize: 18, 
    color: "black" },
  moralTextLight: { 
    fontFamily: "Bubblegum-Sans", 
    fontSize: 20, 
    color: "black" },
});
