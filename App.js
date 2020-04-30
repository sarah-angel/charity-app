import React from 'react';
import 'react-native-gesture-handler';
import { Text } from 'react-native-paper'
import { SplashScreen } from 'expo';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Nav from './app/Nav'
import { getUserDetails } from './app/services/userService'
import { getSavedCards } from './app/services/paymentService'

const load = async() => {
        //Starting up servers if asleep, for heroku
        //ping
        await getUserDetails("").then(response => console.log(response))
        await getSavedCards("").then(response => console.log(response))
  }

export default function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false)

  if (!dataLoaded)
    return (
      <AppLoading 
        startAsync={load} 
        onFinish={() => setDataLoaded(true)}
      />
    )

  return <Nav />
}

