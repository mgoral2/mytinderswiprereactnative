
import * as React from "react"
import {Component} from "react"
import {Image, StyleSheet, View, Text, Dimensions} from "react-native";

import Animated from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var image1 = require('./images/1.jpg');

export default class ProfilePic extends Component {

  static defaultProps = {
    likeOpacity: 0,
    nopeOpacity: 0,
  }

  render() {

    const {likeOpacity, nopeOpacity } = this.props;

  return (
    <View >
    <View>
      <Image source ={image1}
      style={{
        height: windowHeight-80,
        width: windowWidth,
        resizeMode: 'contain'
      }}/>
    </View>

    <Animated.View style={{
      position: 'absolute',
      top: windowHeight*.1,
      left: windowWidth*.1,
      opacity: likeOpacity,
    }}
    >
    <Text style = {styles.likeLabel}>Like</Text>
    </Animated.View>

    <Animated.View style={{
      position: 'absolute',
      top: windowHeight*.1,
      right: windowWidth*.1,
      opacity: nopeOpacity,

    }}
    >
    <Text style = {styles.nopeLabel}>Nope</Text>
    </Animated.View>
    </View>
  )
}
};



const styles = StyleSheet.create({
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
})
