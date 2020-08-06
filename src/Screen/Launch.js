import React, {useState} from "react";
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

import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-community/async-storage";

const width = Dimensions.get('screen').width

const Launch = (props) => {
  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(null)

  mulai = () => {
    // auth().signInAnonymously()
    // .then((res) => alert('sukses'))
    // .catch((err) => alert(err))
    
    AsyncStorage.setItem('signedIn', 'true')
  }

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    marginHorizontal: 20,
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
  }
})

export default Launch