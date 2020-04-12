import React, { Suspense } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-paper'

import Header from './Header'
import HomeScreen from '../views/home/HomeScreen'
import HomeScreen2 from '../../HomeScreen2'

const x = () => {return (<Suspense fallback={<Text>Loading...</Text>}>
  <CampaignListScreen />
</Suspense>)}

const HomeStack = createStackNavigator();

const Bla = () => <Text>Bla</Text>

export default HomeStackNav = () => {
    return (
      <NavigationContainer>
        <HomeStack.Navigator
          initialRouteName="Home"
          headerMode="screen"
          screenOptions={{
            header: ({ scene, previous, navigation }) => (
              <Header scene={scene} previous={previous} navigation={navigation} />
            )
          }}
        >
          <HomeStack.Screen name="Home" component={HomeScreen} />
          <HomeStack.Screen name="Campaign" component={HomeScreen2} />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }