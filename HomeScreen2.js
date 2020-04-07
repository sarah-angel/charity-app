import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Provider as PaperProvider ,BottomNavigation, Text, Button, Appbar, Avatar, Card, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'

const CampaignCard = (props) => {
    const { colors } = props.theme

    const handleDonate = () => {
        console.log("Donating")
		
            fetch("http://192.168.43.184:8080" + "/categories", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            }).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <Card style={sytles.card}>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          <Card.Title 
            title="UDSM Rotaract Club" 
            subtitle={
              <>
                <Icon name="map-marker" />
                <Text>Tanzania</Text>
              </>
            }
          />
          <Card.Content>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum tortor in eros dictum pellentesque. Class aptent taciti sociosqu ad.</Paragraph>
            <View style={{alignSelf: 'flex-end'}}>
              
            </View>
          </Card.Content>
          <Card.Actions style={{justifyContent: 'flex-end'}}>            
            <Button mode="contained" onPress={handleDonate}>
                Donate
            </Button>
            <Button>
                <Text style={{color: colors.primary}}>More Info</Text>
                <Icon name="chevron-right" />
            </Button>
          </Card.Actions>
        </Card>
    )
}

const data = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
]

const HomeScreen2 = (props) => {
    return (
      <SafeAreaView >
        <FlatList
            data={data}
            renderItem={() => <CampaignCard {...props}/>}
            keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
}

const sytles = StyleSheet.create({
    card: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    }
});

export default withTheme(HomeScreen2);