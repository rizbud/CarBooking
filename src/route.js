import React, {useState, useEffect, Component} from 'react';
import { BackHandler, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './Screen/Home'
import Launch from "./Screen/Launch";
import Loading from "./Screen/Loading";
import Detail from "./Screen/Detail";

import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator()

function Route() {
  const [loading, setLoading] = useState(true)
  const [signIn, setSignIn] = useState(null)

  useEffect(() => {
    NetInfo.fetch()
    .then((isConnected) => {
      if(!isConnected) {
        Alert.alert('Oopss..', 'Kamu tidak terhubung ke Internet :(', [{text: 'Keluar', onPress: () => BackHandler.exitApp()}])
      } else {
        setTimeout(() => {
          AsyncStorage.getItem('signedIn', (err, res) => {
            if(res) {
              setSignIn(true)
              setLoading(false)
            } else {
              setSignIn(false)
              setLoading(false)
            }
          })
        }, 1500)
      }
    })
  })

  if(loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signIn ? (
          <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen 
            name="Detail"
            component={Detail}
            options={({route}) => ({
              title: 'Rental ' + route.params.name,
              headerStyle: {
                elevation: 2
              }
            })} />
          </>
        ) : (
          <>
          <Stack.Screen name="Launch" component={Launch} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen 
            name="Detail"
            component={Detail}
            options={({route}) => ({
              title: 'Rental ' + route.params.name,
              headerStyle: {
                elevation: 2
              }
            })} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Route