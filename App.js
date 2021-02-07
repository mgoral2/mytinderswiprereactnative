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
  clockRunning, startClock, stopClock, spring, Clock, greaterThan, lessThan,
  and,
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

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

  const {
    gestureState, translationX, translationY, velocityX,
  } = this;

  const clockX = new Clock();
  const clockY = new Clock();
  const snapPoint = cond(and(lessThan(translationX, 0), lessThan(velocityX, -10))
  -windowWidth,
  cond(
    and(greaterThan(translationX, 0), greaterThan(velocityX, 10)),
    windowWidth,
    0,

  )
)

  this.translateX = cond(eq(gestureState, State.END), [
    set(translationX, runSpring(clockX, translationX, velocityX, snapPoint)),
    translationX,
  ],
  translationX
);

this.translateY = cond(eq(gestureState, State.END), [
  set(translationY, runSpring(clockY, translationY, 0, 0)),
  translationY,
],
translationY
);

}

render() {
  const {onGestureEvent, translateX, translateY } = this;

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
