import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { Appbar, Avatar, Menu, Button, Portal, Modal, Card, Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native'

import GLOBAL from '../global'
import { logOut } from '../auth/authService'

export default Header = ({ scene, previous, navigation }) => {

    const [isMenuOpen, setMenu] = React.useState(false)

    //delete token from storage
    //reset navigation stacks and states
    const handleLogout = () => {
      setMenu(false)
      
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

    const addCampaign = () => {
      setMenu(false)

      navigation.navigate('AddCampaign')
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
        <Appbar.Action icon="dots-vertical" onPress={ () => setMenu(true) } />
      </Appbar.Header>
      
      <Portal>
          <Modal visible={isMenuOpen}
              contentContainerStyle={{alignSelf: 'flex-end', marginTop: 35, top: 0, position:'absolute'}}
              dismissable={true}
              onDismiss={() => setMenu(false)}  //this.props.navigation.navigate('Home')}
          >
              <Card style={{}}>
                <Button onPress={() => addCampaign()} 
                  uppercase={false}
                  contentStyle={{alignSelf: 'flex-start'}}
                  color="black"
                  labelStyle={{fontSize: 15,}}
                > 
                  Add Campaign
                </Button>
                <Button onPress={() => console.log("Add New Campaign")} 
                  uppercase={false}
                  contentStyle={{alignSelf: 'flex-start'}}
                  color="black"
                  labelStyle={{fontSize: 15,}}
                > 
                  Settings
                </Button>
                <Button onPress={() => handleLogout()}
                  uppercase={false}
                  contentStyle={{alignSelf: 'flex-start'}}
                  color="black"
                  labelStyle={{fontSize: 15,}}
                >
                  Logout
                </Button>
              </Card>
          </Modal>
      </Portal>
    </>
    )
  }

  