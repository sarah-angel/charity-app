import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Provider as PaperProvider ,BottomNavigation, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
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

    // return (
    //     <View style={sytles.card}>
    //       <Card.Title style={sytles.cardTitle}
    //         left={() =>
    //             //<Card.Cover style={sytles.cardImg} source={{uri: 'https://picsum.photos/700'}} />
    //            <Avatar.Image style={sytles.cardImg} source={{uri: 'https://picsum.photos/700'}} />
    //         }
    //         leftStyle={sytles.cardImg}
    //         title="UDSM Rotaract Club" 
    //         subtitle={
    //           <>
    //             <Icon name="map-marker" />
    //             <Text>Tanzania</Text>
    //           </>
    //         }
    //       />
    //       <Card.Content>
    //         <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum tortor in eros dictum pellentesque. Class aptent taciti sociosqu ad.</Paragraph>
    //       </Card.Content>
    //       <Card.Actions style={{justifyContent: 'flex-end'}}>            
    //         <Button mode="contained" onPress={handleDonate}>
    //             Donate
    //         </Button>
    //         <Button>
    //             <Text style={{color: colors.primary}}>More Info</Text>
    //             <Icon name="chevron-right" />
    //         </Button>
    //       </Card.Actions>
    //       <Divider />
    //     </View>
    // )

    return (
        <>
        <>
        <View style={sytles.card}>
            <View style={{ width: 300, justifyContent: 'flex-start' }} >
          <Card.Title style={sytles.cardTitle}
            title="UDSM Rotaract Club" 
            titleStyle={sytles.cardTitle}
            subtitle={
              <>
                <Icon name="map-marker" />
                <Text>Tanzania</Text>
              </>
            }
          />
          <Card.Content style={sytles.cardContent}>
            <Paragraph style={sytles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum tortor in eros dictum pellentesque. Class aptent taciti sociosqu ad.</Paragraph>
          </Card.Content>
          </View>
          <View style={{flex: 1, width: 100}}>
            <Avatar.Image size={100} style={sytles.cardImg} source={{uri: 'https://picsum.photos/700'}} />
          </View>
        </View>
        <Card.Actions style={sytles.cardBtns}>  
          <View style={{flex: 1}} >      
            <Button style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                <Text style={{color: colors.primary}}>More Info</Text>
                <Icon name="chevron-right" />
            </Button>
            </View>
            <Button mode="outlined" onPress={handleDonate} style={{justifyContent: 'flex-end', borderColor: colors.primary}}>
                Donate
            </Button>
          </Card.Actions>
            </>
            <Divider />
            </>

    )
}

const data = [
    {
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },
    {
        id: '4',
    },
    {
        id: '5',
    },
    {
        id: '6',
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

// const sytles = StyleSheet.create({
//     card: {
//         marginTop: 5,
//         marginBottom: 5,
//         marginLeft: 5,
//         marginRight: 5,
//         alignSelf: 'center',
//        // width: 360,
//         flex: 1,
//         paddingTop: 5,
//     },
//     cardImg: {
//         marginRight: 30,
        
//     },
//     cardTitle: {
        
        
//     }
// });


const sytles = StyleSheet.create({
    card: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'center',
        paddingTop: 5,
        flexDirection: 'row',
    },
    cardImg: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        
    },
    cardTitle: {
        marginRight: 10,
        
    },
    cardContent: {
    },
    cardText: {
       
    },
    cardBtns: {
        flexDirection: 'row',
        marginRight: 10,
    }
    
});

export default withTheme(HomeScreen2);