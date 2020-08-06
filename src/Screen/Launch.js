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

const Launch = ({navigation}) => {
  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(null)
  const [loadingScreen, setLoadingScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('signedIn', (err, res) => {
        if(res) {
          setLoadingScreen(false)
          setSignedIn(true)
        } else {
          setLoadingScreen(false)
          setSignedIn(false)
        }
      })
    }, 3000)
  })

  mulai = () => {
    AsyncStorage.setItem('signedIn', 'true')
    setSignedIn(true)
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
    <FadeInView duration={2000} style={styles.container}>
      <StatusBar backgroundColor="#dcdcdc" barStyle="dark-content" />
      <View style={styles.body}>
        <Image source={require('../Images/launch.png')} style={styles.launchImage} onLoadEnd={() => setLoading(false)} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  launchImage: {
    width: width,
    height: width-150,
    margin: 10,
    resizeMode: 'stretch',
    marginHorizontal: 20
  },
  title: {
    fontFamily: "Ubuntu-Medium",
    fontSize: 28,
    margin: 5
  },
  caption: {
    fontFamily: 'Ubuntu',
    fontSize: 15,
    margin: 10,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  button: {
    backgroundColor: "#e34534",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Ubuntu-Medium"
  },
  media: {
    width: width,
    height: width-100
  }
})

export default Launch