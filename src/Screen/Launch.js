import React, {useState, useEffect} from "react";
import { 
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import LottieView from 'lottie-react-native';
import FadeInView from "react-native-fade-in-view";

import AsyncStorage from "@react-native-community/async-storage";

const width = Dimensions.get('screen').width
import styles from './styles/launchStyle'

const Launch = ({navigation}) => {
  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(null)
  const [loadingScreen, setLoadingScreen] = useState(null)

  mulai = () => {
    AsyncStorage.setItem('signedIn', 'true')
    navigation.navigate('Home')
  }

  if(loadingScreen) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <LottieView source={require('../animations/loading.json')} style={styles.media} autoPlay={true} loop={true} />
      </View>
    )
  }

  if(signedIn) {
    navigation.navigate('Home')
  }

  return (
    <FadeInView duration={1500} style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.body}>
        <Image source={require('../images/launch.png')} style={styles.launchImage} onLoadEnd={() => setLoading(false)} />
        <Text style={styles.title}>{loading ? ('') : ('CarBooking')}</Text>
        <Text style={styles.caption}>{loading ? ('') : ('Mencari mobil rental kini semakin mudah dengan CarBooking.')}</Text>
        {loading ? (
          <TouchableOpacity>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={mulai}>
          <Text style={styles.buttonText}>Mulai</Text>
        </TouchableOpacity>
        )}
      </View>
    </FadeInView>
  )
}

export default Launch