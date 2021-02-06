import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import {PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import ProfilePic from './ProfilePic.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NopeImage = require('./images/nope.png');
const LikeImage = require('./images/like.png');

const {event} = Animated;

export default class App extends Component {
  constructor(props: ProfilesProps) {
    super(props);

    this.translationX = new Value(0);
    this.translationY = new Value(0);

  this.onGestureEvent = event(
    [
      {
        nativeEvent: {
          translationX: this.translationX,
          translationY: this.translationY,
        },
      },
    ],
    { useNativeDriver: true },
  )
}
render() {
  const {onGestureEvent, translationX: translateX, translationY: translateY } = this;
  const style = {
    ...StyleSheet.absoluteFillObject,
    transform: [
      { translateX },
      { translateY },
    ],
  };
  return (
    <View style = {styles.Outter}>

      <panGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{onGestureEvent}}
      >
        <Animated.View>
        <ProfilePic />
        </Animated.View>
      </panGestureHandler>

      <View style = {styles.Buttons}>
        <Image source={NopeImage}
        style = {styles.Nope}
        />
        <Image source = {LikeImage}
        style = {styles.Like}
        />
      </View>
    </View>
  );
}
}



const styles = StyleSheet.create({
  Outer: {
    flex: 1,
    flexDirection: 'column',
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Nope: {
    height: 80,
    width: 80,
  },
  Like: {
    height: 80,
    width: 80,
  }
})






/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
