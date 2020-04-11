import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Header from './Header'
import HomeScreen from '../views/home/HomeScreen'

const HomeStack = createStackNavigator();

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
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }