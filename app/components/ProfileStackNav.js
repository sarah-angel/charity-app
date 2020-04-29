import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Header from './Header'
import HomeScreen from '../views/profile/HomeScreen'
import SignInScreen from '../auth/SignInScreen'
import RegisterScreen from '../auth/RegisterScreen'
import AddCampaignScreen from '../views/home/AddCamapaignScreen'

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
          <ProfileStack.Screen name="SignIn" component={SignInScreen} />
          <ProfileStack.Screen name="Register" component={RegisterScreen} />
          <ProfileStack.Screen name="AddCampaign" component={AddCampaignScreen} />
        </ProfileStack.Navigator>
      </NavigationContainer>
    )
  }