import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper';

export default Header = ({ scene, previous, navigation }) => {

    return (
      <Appbar.Header>
        {previous ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Avatar.Icon size={40}  icon="charity"/>
        )}
        <Appbar.Content title="Charity" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
    )
  }