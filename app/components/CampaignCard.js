import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Image } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'

import { getLogo } from '../services/campaignService'
const serverUrl = 'http://192.168.43.184:8081'

const CampaignCard = (props) => {
    const { colors } = props.theme
    const campaign = props.item.item
    const category = props.category
    const {navigate} = props.navigation
    
    const [isLogo, setLogo] = React.useState(false)

    //check if logo is given
    getLogo(campaign.id)
        .then(res => { 
            if (res.status == 200)
                setLogo(true)
        })

    return (
        <Card style={styles.root}>
        <View style={styles.card}>
            <View style={{ width: 300, justifyContent: 'flex-start' }} >
          <Card.Title style={styles.cardTitle}
            title={campaign.campaignName}
            titleStyle={styles.cardTitle}
            subtitle={
              <>
                <Icon name="map-marker" />
                <Text>{campaign.country}</Text>
              </>
            }
          />
          <Card.Content style={styles.cardContent}>
            <Paragraph style={styles.cardText}>
                {campaign.description}
            </Paragraph>
          </Card.Content>
          </View>
          <View style={{flex: 1, width: 100}}>
              { isLogo
                ? (
                    <Avatar.Image size={100} style={styles.cardImg} 
                        source={{uri: serverUrl + '/campaign/' + campaign.id + '/image/logo'}}
                    />
                ) : (
                    <Avatar.Icon size={100} style={styles.cardIcon} icon={category.icon} color={category.color} />
                )}
          </View>
        </View>
        <Card.Actions style={styles.cardBtns}>  
          <View style={{flex: 1}} >      
            <Button style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}
                onPress={() => 
                    navigate('CampaignInfo', {
                        campaign: campaign,
                        category: category,
                    }
                )}
            >
                <Text style={{color: colors.primary}}>More Info</Text>
                <Icon name="chevron-right" />
            </Button>
            </View>
            <Button mode="outlined" 
                onPress={() => 
                    navigate('Donate', {
                        campaign: campaign,
                        category: category,
                    })      
                } 
                style={{justifyContent: 'flex-end', borderColor: colors.primary}}
            >
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
        backgroundColor: 'white',
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
        fontSize: 18,
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