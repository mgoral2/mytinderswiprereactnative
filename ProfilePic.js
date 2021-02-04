
import * as React from "react";
import {Image, StyleSheet, View, Text, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var image1 = require('./images/1.jpg');

export default function ProfilePic() {
  return (
    <View>
      <Image source ={image1}
      style={{
        height: windowHeight-80,
        width: windowWidth,
        resizeMode: 'contain'
      }}/>
    </View>
  )
};
