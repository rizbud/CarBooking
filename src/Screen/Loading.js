import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('screen').width

const Loading = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <LottieView source={require('../animations/loading.json')} style={styles.media} autoPlay={true} loop={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  media: {
    width: width-200,
    height: width-200
  }
})

export default Loading