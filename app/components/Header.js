import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { Appbar, Avatar, Menu, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native'

import GLOBAL from '../global'
import { logOut } from '../auth/authService'

export default Header = ({ scene, previous, navigation }) => {

    //delete token from storage
    //reset navigation stacks and states
    const handleLogout = () => {
      logOut()

      GLOBAL.donations = []

      //TODO: reset all stacks not just current one
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Home'}
        ]
      }))
    }

    return (
      <>
      <Appbar.Header>
        {previous ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Avatar.Icon size={40}  icon="charity"/>
        )}
        <Appbar.Content title="Charity" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => handleLogout() } />
      </Appbar.Header>
      {/* <View style={{alignSelf: 'flex-end'}}>
      <Menu
        visible={true}
        anchor = {
          <Button>Menu</Button>
        }
        contentStyle={{marginTop: -40,}}
      
      >
        <Menu.Item title="New Campaign" />
        <Menu.Item title="Settings" />
        <Menu.Item title="Logout" />
    </Menu>
    </View> */}
    </>
    )
  }