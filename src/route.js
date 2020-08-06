import React, {useState, useEffect, Component} from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './Screen/Home'
import Launch from "./Screen/Launch";
import Loading from "./Screen/Loading";

import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator()

function Route() {
  const [loading, setLoading] = useState(null)
  const [signIn, setSignIn] = useState(null)

  // useEffect(() => {
  //   setTimeout(() => {
  //     AsyncStorage.getItem('signedIn', (err, res) => {
  //       if(res) {
  //         setSignIn(true)
  //         setLoading(false)
  //       } else {
  //         setSignIn(false)
  //         setLoading(false)
  //       }
  //     })
  //   }, 3000)
  // })

  if(loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Launch" component={Launch} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />      
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Route