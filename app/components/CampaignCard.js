import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'

const CampaignCard = (props) => {
    const { colors } = props.theme
    const campaign = props.item.item
    const category = props.category
    const {navigate} = props.navigation

    const handleDonate = () => {
		
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
        <Card style={styles.root}>
        <View style={styles.card}>
            <View style={{ width: 300, justifyContent: 'flex-start' }} >
          <Card.Title style={styles.cardTitle}
            title="UDSM Rotaract Club" 
            titleStyle={styles.cardTitle}
            subtitle={
              <>
                <Icon name="map-marker" />
                <Text>Tanzania</Text>
              </>
            }
          />
          <Card.Content style={styles.cardContent}>
            <Paragraph style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum tortor in eros dictum pellentesque. Class aptent taciti sociosqu ad.</Paragraph>
          </Card.Content>
          </View>
          <View style={{flex: 1, width: 100}}>
              { campaign.logo 
                ? (
                    <Avatar.Image size={100} style={styles.cardImg} source={{uri: 'https://picsum.photos/700'}} />
                ) : (
                    <Avatar.Icon size={100} style={styles.cardIcon} icon={category.icon} color={category.color} />
                )}
          </View>
        </View>
        <Card.Actions style={styles.cardBtns}>  
          <View style={{flex: 1}} >      
            <Button style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}
                onPress={() => console.log(campaign.id)}
            >
                <Text style={{color: colors.primary}}>More Info</Text>
                <Icon name="chevron-right" />
            </Button>
            </View>
            <Button mode="outlined" onPress={handleDonate} style={{justifyContent: 'flex-end', borderColor: colors.primary}}>
                Donate
            </Button>
          </Card.Actions>
        </Card>
            

    )
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
    },
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
    cardIcon:{
        marginRight: 10,
        marginLeft: 10,
       // marginTop: 10,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        backgroundColor: 'white',
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

export default withTheme(CampaignCard)