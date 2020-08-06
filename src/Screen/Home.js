import React, { Component } from "react";
import { 
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import firestore from '@react-native-firebase/firestore'

import AsyncStorage from "@react-native-community/async-storage";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: []
    }
  }

  signOut = () => {
    AsyncStorage.removeItem('signedIn')
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <Text>Header</Text>
          <TouchableOpacity onPress={this.signOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({

})

export default Home