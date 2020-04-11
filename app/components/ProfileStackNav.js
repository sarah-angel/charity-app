import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Header from './Header'
import HomeScreen from '../views/home/HomeScreen'

const ProfileStack = createStackNavigator();

export default ProfileStackNav = () => {
    return (
      <NavigationContainer>
        <ProfileStack.Navigator
          initialRouteName="Home"
          headerMode="screen"
          screenOptions={{
            header: ({ scene, previous, navigation }) => (
              <Header scene={scene} previous={previous} navigation={navigation} />
            )
          }}
        >
          <ProfileStack.Screen name="Home" component={HomeScreen} />
        </ProfileStack.Navigator>
      </NavigationContainer>
    )
  }