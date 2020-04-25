import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Header from './Header'
import HomeScreen from '../views/explore/HomeScreen'

const ExploreStack = createStackNavigator();

export default ExploreStackNav = () => {
    return (
      <NavigationContainer>
        <ExploreStack.Navigator
          initialRouteName="Home"
          headerMode="screen"
          screenOptions={{
            header: ({ scene, previous, navigation }) => (
              <Header scene={scene} previous={previous} navigation={navigation} />
            )
          }}
        >
          <ExploreStack.Screen name="Home" component={HomeScreen} />
        </ExploreStack.Navigator>
      </NavigationContainer>
    )
  }