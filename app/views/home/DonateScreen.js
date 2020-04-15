import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Title, Text, TextInput, Button, Avatar, Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-material-dropdown'
import { withTheme } from 'react-native-paper'

import GLOBAL from '../../global'

var DonateCard = (props) => {
    const donation = props.donation

    return(
        <Card style={styles.card}>
            <View style={styles.card}>
                <View style={{}}>
                  { donation.campaign.logo 
                    ? (
                        <Avatar.Image size={100} style={styles.cardImg} source={{uri: 'https://picsum.photos/700'}} />
                    ) : (
                        <Avatar.Icon size={100} style={styles.cardIcon} icon={donation.category.icon} color={donation.category.color} />
                    )}
                </View>

                <View style={{ flex: 1, width: 300, justifyContent: 'flex-end' }} >
                    <Card.Title style={styles.cardTitle}
                      title="UDSM Rotaract Club" 
                      titleStyle={styles.cardTitle}
                      right={() => (
                        <IconButton icon="close-circle-outline" 
                            onPress={() => props.removeDonation(donation.campaign.id)}
                        />
                        )}
                      //rightStyle={{marginTop: -20}}
                    />
                    <Card.Content style={styles.cardContent}>
                        <TextInput
                            label="Amount"
                            value={ donation.amount? donation.amount.toString() : ''}
                            mode='outlined'
                            keyboardType='decimal-pad'
                            style={{width: 200, height: 50, backgroundColor: 'white'}}
                            onChangeText={amount => props.setAmount(donation.campaign.id, amount)}
                        />
                    </Card.Content>
                </View>
          
            </View>
        </Card>
    )
}

//Input amount to donate and currency
//User can add another donation to a different campaign and 
//pay all in total at once
class DonateScreen extends React.Component{
    currencies = [
        {
            value: 'TZS',
        },
        {
            value: 'USD',
        },
        {
            value: 'KES',
        },
        {
            value: 'EUR',
        },
    ]

    state = {
        loading: true,
        donations: [],
        total: '0.00',
        currency: 'USD',
    }

    //Fetch donation state from global
    //Push the added donation to the list
    async componentDidMount() {
        var campaign = this.props.route.params.campaign

        //Check if a donation exists with same campaign.id to avoid duplicates
        var donationExists = false
        for (var donation of GLOBAL.donations) {
            if (donation.campaign.id == campaign.id){
                donationExists = true
                break
            }
        }
        
        if ( !donationExists ){
            GLOBAL.donations.push({
                category: this.props.route.params.category,
                campaign: this.props.route.params.campaign,
                amount: 0,
                currency: 'USD',
            })
        }
        this.setState({donations: GLOBAL.donations})

        this.getTotal()
    }

    //set amount for campaign in the basket
    setDonationAmount = (campaignId, amount) => {
        amount = amount ? amount : 0 //set empty string as 0

        let index = GLOBAL.donations.findIndex(donation => donation.campaign.id == campaignId)
        GLOBAL.donations[index].amount = amount
        this.setState({donations: GLOBAL.donations})

        this.getTotal()
    }

    getTotal = () => {
        var total = 0
        GLOBAL.donations.forEach(donation => {
            total += parseFloat(donation.amount)
        })
        this.setState({total: total.toString()})
    }

    //navigate to category screen
    addDonation = () => {
        this.props.navigation.push('Home')
    }

    //Remove donation with the given campaign.id from global
    removeDonation = (campaignId) => {
        GLOBAL.donations = GLOBAL.donations.filter((value) => {
            return value.campaign.id != campaignId
        })

        this.setState({donations: GLOBAL.donations})
        
        this.getTotal()
    }

    //Loop through each donation and check if amount is zero
    //Navigate to payment screen
    //send total amount and currency
    goToPay = () => {
        if ( this.state.total > 0 )
            this.props.navigation.navigate('Payment', {
                total: this.state.total,
                currency: this.state.currency,
            })
        else 
            this.setState({error: "Total donation must be greater than 0"})
    }

    render(){
        return (
                <ScrollView style={styles.root} contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}>
                <Title style={styles.title}>Donation Basket</Title>

                {/* <View style={{}}>
                    <Dropdown
                        label='Currency'
                        data={this.currencies}
                        value={this.state.currency}
                        onChangeText={(currency) => this.setState({currency})}
                        containerStyle={{width: 100}}
                    />
                </View> */}         

                { this.state.donations.map(donation => (
                    <DonateCard key={donation.campaign.id}
                        donation={donation} 
                        setAmount={this.setDonationAmount}
                        removeDonation={this.removeDonation} 
                    />
                ))}
                
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <View style={{flexDirection: "row", marginTop: 10, marginBottom: 10, }}>
                        <Title style={{flex:1, justifyContent: 'flex-start', fontSize: 18}}>Total Donation</Title>
                        <Title style={{flex: 1, textAlign: 'right', fontSize: 18}}> 
                            {this.state.total ? this.state.total : '0.00'}
                            {' '}
                            {this.state.currency}
                        </Title>
                    </View>
                                        
                    {/**Send user to the category screen */}
                    <Button style={{marginBottom: 10}}
                        onPress={this.addDonation}
                    > + Add another Donation</Button>

                    <Button mode="contained" 
                        style={{marginBottom: 10}}
                        onPress={this.goToPay}
                    >Continue to Donate</Button>
                </View>
                </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    root: {
        margin: 15,
        flex: 1,
        //justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        marginTop: 5,
        marginBottom: 5,
       // marginLeft: 5,
        //marginRight: 5,
        alignSelf: 'center',
       // paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
    },
    cardImg: {
        //marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        
    },
    cardIcon:{
       // marginRight: 10,
        marginLeft: 0,
        marginTop: 0,
        paddingTop: 20,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
    },
    cardTitle: {
        marginRight: 10,
        marginBottom: -10,
        marginTop: -10,
        fontSize: 18,
        
    },
    
});

export default withTheme(DonateScreen);