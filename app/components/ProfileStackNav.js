import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Header from './Header'
import HomeScreen from '../views/profile/HomeScreen'
import SignInScreen from '../views/profile/SignInScreen'
import RegisterScreen from '../views/profile/RegisterScreen'
import Auth from '../views/profile/Auth'

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
          <ProfileStack.Screen name="Auth" component={Auth} />
          <ProfileStack.Screen name="SignIn" component={SignInScreen} />
          <ProfileStack.Screen name="Register" component={RegisterScreen} />
        </ProfileStack.Navigator>
      </NavigationContainer>
    )
  }