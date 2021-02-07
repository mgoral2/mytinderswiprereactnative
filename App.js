import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import {PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import ProfilePic from './ProfilePic.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NopeImage = require('./images/nope.png');
const LikeImage = require('./images/like.png');

const {
  event, Value, interpolate, concat, Extrapolate, cond, eq, set,
} = Animated;

export default class App extends Component {
  constructor(props: ProfilesProps) {
    super(props);

    this.translationX = new Value(0);
    this.translationY = new Value(0);
    this.velocityX = new Value(0);
    this.gestureState = new Value(State.UNDETERMINED);

  this.onGestureEvent = event(
    [
      {
        nativeEvent: {
          translationX: this.translationX,
          translationY: this.translationY,
          velocityX: this.velocityX,
          state: this.gestureState,
        },
      },
    ],
    { useNativeDriver: true },
  )
  this.init();
}

init() {
  this.translateX = cond(eq(gestureState, State.END), [
    set(translationX, runSpring()),
    translationX
  ],
  translationX
)
}

render() {
  const {onGestureEvent, translationX: translateX, translationY: translateY } = this;

  const rotateZ = concat(
    interpolate(translateX, {
      inputRange: [-windowWidth/2, windowWidth/2],
      outputRange: [15, -15],
      extrapolate:  Extrapolate.CLAMP,
    }),
    "deg",
  );

  const likeOpacity = interpolate(translateX, {
    inputRange: [0, windowWidth/4],
    outputRange: [0,1],
    extrapolate:  Extrapolate.Clamp,
  });

  const nopeOpacity = interpolate(translateX, {
    inputRange: [-windowWidth/4,0],
    outputRange: [1,0],
    extrapolate:  Extrapolate.Clamp,
  });

  const style = {
    //...StyleSheet.absoluteFillObject,
    transform: [
      { translateX },
      { translateY },
      { rotateZ },
    ],
  };

  return (
    <View style = {styles.Outter}>

      <PanGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{onGestureEvent}}
      >
        <Animated.View {...{style}}>
        <ProfilePic {...{likeOpacity, nopeOpacity}}/>
        </Animated.View>
      </PanGestureHandler>

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
