import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import ProfilePic from './ProfilePic.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NopeImage = require('./images/nope.png');
const LikeImage = require('./images/like.png');

export default function App() {
  return (
    <View style = {styles.Outter}>
      <ProfilePic />
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
