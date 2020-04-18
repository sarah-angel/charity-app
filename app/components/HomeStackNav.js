import React, { Suspense } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-paper'

import Header from './Header'
import HomeScreen from '../views/home/HomeScreen'
import HomeScreen2 from '../../HomeScreen2'
import CampaignScreen from '../views/home/CampaignScreen'
import CampaignInfoScreen from '../views/home/CampaignInfoScreen'
import DonateScreen from '../views/home/DonateScreen'
import PaymentScreen from '../views/home/PaymentScreen';
import SignInScreen from '../auth/SignInScreen'
import RegisterScreen from '../auth/RegisterScreen'
import AddCampaignScreen from '../views/home/AddCamapaignScreen'

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
          <HomeStack.Screen name="Campaign" component={CampaignScreen} />
          <HomeStack.Screen name="CampaignInfo" component={CampaignInfoScreen} />
          <HomeStack.Screen name="Donate" component={DonateScreen} />
          <HomeStack.Screen name="Payment" component={PaymentScreen} />
          <HomeStack.Screen name="AddCampaign" component={AddCampaignScreen} />
          <HomeStack.Screen name="SignIn" component={SignInScreen} />
          <HomeStack.Screen name="Register" component={RegisterScreen} />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }