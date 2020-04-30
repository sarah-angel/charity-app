import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native'
import { Title, Text, TextInput, Button, Modal, Portal, Card, Switch, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'

import GLOBAL from '../../global'
import { isAuthenticated } from '../../auth/authService'
import { getStripeCustomerId } from '../../services/userService'
import { getCreditCardToken, saveCard, pay, getSavedCards } from '../../services/paymentService'
import { saveDonationDetails } from '../../services/donationService'
import MyCard from '../../components/MyCard';
import MessagePopup from '../../components/MessagePopup'

class PaymentScreen extends React.Component {
    colors = this.props.theme.colors

    state = {
        signedIn: false,
        method: 'card', //Default payment method
        userId: null,
        stripeCustomerId: null,
        savedCards: null, //list of saved cards for the user
        newCard: true, //if need to manually input card details (use unsaved card)
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardId: null, //selected card to charge
        stripeToken: null,
        email: '',
        saveCard: false,
        total: this.props.route.params.total,
        currency: this.props.route.params.currency,
        submitted: false,
        success: false,
        loading: true,
        loadingCards: true,
        error: null,
    }

    //Check if user is signed in, if not, prompt user to sign in
    //Fetch stripeCustomerId in the database if available
    componentDidMount = () => {
        isAuthenticated().then(token => {
            if ( token != null ){
                this.setState({signedIn: true, userId: token.userId, loading: false})

                getStripeCustomerId(token.userId).then( response => {
                    if ( response.error )
                        this.setState({error: response.error})

                    this.setState({
                        stripeCustomerId: response.stripeCustomerId 
                            ? response.stripeCustomerId 
                            : null
                    })
                    this.handleCardMethod()
                })

            } else { //user not signed in
                this.props.navigation.navigate('SignIn')
            }
        })

        this.props.navigation.addListener('focus', async() => {
            if ( !this.state.userId )
                await isAuthenticated().then(token => {
                    if ( token != null ){
                        this.setState({signedIn: true, userId: token.userId, loading: false})
                    
                        if ( !this.state.stripeCustomerId )
                            getStripeCustomerId(token.userId).then( response => {
                                if ( response.error )
                                    this.setState({error: response.error})

                                this.setState({
                                    stripeCustomerId: response.stripeCustomerId 
                                        ? response.stripeCustomerId 
                                        : null
                                })
                                this.handleCardMethod()
                            })    
                    } 
                })
            this.setState({loading: false})
        })

    }

    //Get saved cards for customer from stripe
    handleCardMethod = () => {
        this.setState({method: 'card'})

        if ( this.state.stripeCustomerId ){
            var data = {
                stripeCustomerId: this.state.stripeCustomerId
            }

            getSavedCards(data).then( response => {
                if (response.error)
                    this.setState({error: response.error})
                else
                    this.setState({
                        savedCards: response.data, 
                        newCard: false,
                        loadingCards: false
                    })
            })
        }

    }

    //Make payment to stripe
    //Then send donation details to the server for storing
    handlePay = () => {        
        //Disable submit button
        this.setState({submitted: true})

        var data = {
            userId: this.state.userId,
            stripeToken: this.state.stripeToken,
            amount: this.state.total,
            currency: this.state.currency,
            name: this.state.cardName ? this.state.cardName : null,
            stripeCustomerId: this.state.stripeCustomerId,
            cardId: this.state.cardId,
            donation: this.props.route.params.donations,
        }

        //If cardId is given then don't fetch token
        if ( this.state.cardId ){
            this.pay(data)
            return
        }

        var cardData = {
            cardNumber : this.state.cardNumber,
            cardExpiry : this.state.cardExpiry,
            cardCvc : this.state.cardCvc,
            cardName: this.state.cardName,
        }

        //Get token from stripe
        getCreditCardToken(cardData)
            .then(response => {
                if(response.error){
                    this.setState({
                        submitted: false, //allow user to submit again
                        error: response.error.message
                    })
                }
                else{
                    this.setState({stripeToken: response})
                    data.stripeToken = response

                    //if save card is checked, save card then pay
                    if ( this.state.saveCard ){
                        
                        saveCard(data).then(response => {
                            if (response.error)
                                this.setState({submitted: false, error: response.error})
                            else 
                                this.pay(data)
                        })
                    }else {
                        this.pay(data)
                    }
                }
            })
    }

    //Charge credit card after fetching token and/or saving card
    pay = (data) => {
        pay(data).then(response => {
            if (response.error)
                this.setState({submitted: false, error: response.error})
            else
                if (response.status == 'succeeded'){
                    //send donation details to server for storing
                    const  donations = this.props.route.params.donations
                    var donationDetails = []

                    for ( var donation of donations){
                        donationDetails.push({
                            categoryId: donation.category.id,
                            campaignId: donation.campaign.id,
                            amount: donation.amount,
                            currency: donation.currency,
                            userId: this.state.userId,
                        })
                    }

                    if ( this.state.userId )
                        saveDonationDetails(donationDetails).then(response => {
                            if (response.error)
                                this.setState({error: response.error})
                        })

                    this.setState({success: true})
                }
        })
    }

    reset = () => { 
        this.setState({success: false, loading: true})
        
        GLOBAL.donations = []

        //reset donation stack
        this.props.navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Home'}
          ]
        }))
    }

    componentWillUnmount = () => {
        GLOBAL.donations = []
    }

    render() {
        if ( !this.state.loading )
        return (
            <SafeAreaView style={styles.root}>
                <ScrollView contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}>                    
                    <Title style={styles.title}>Payment Method</Title>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{}}>
                            <Card style={[styles.methodCard, 
                                this.state.method == 'card' 
                                    ? {borderColor: this.colors.primary, borderStyle: 'solid', borderWidth: 5} 
                                    : {}
                                ]}
                                onPress={this.handleCardMethod}
                            >
                                <Image source={require('../../../assets/card.png')} 
                                    style={{justifyContent: 'center', marginTop: 10, width: 50, height: 50}} 
                                />
                            </Card>
                        </View>
                        <View style={{}}>
                            <Card style={[styles.methodCard, 
                                this.state.method == 'paypal' 
                                    ? {borderColor: this.colors.primary, borderStyle: 'solid', borderWidth: 5} 
                                    : {}
                                ]}
                                onPress={() => this.setState({method: 'paypal'})}
                            >
                                <Image source={require('../../../assets/paypal.png')} 
                                    style={{justifyContent: 'center', marginTop: 10, width: 70, height: 50}} 
                                />
                            </Card>
                        </View>
                        <View style={{}}>
                            <Card style={[styles.methodCard, 
                                this.state.method == 'mpesa' 
                                    ? {borderColor: this.colors.primary, borderStyle: 'solid', borderWidth: 5} 
                                    : {}
                                ]}
                                onPress={() => this.setState({method: 'mpesa'})}
                            >
                                <Image source={require('../../../assets/mpesa.png')}
                                    style={{justifyContent: 'center', marginTop: 10, width: 60, height: 50}} 
                                />
                            </Card>
                        </View>      
                    </View>

                    { this.state.method == 'card' && 
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Button style={{flex: 1}}
                                onPress={() => this.setState({newCard: false})}
                                disabled={ !this.state.newCard }
                            >My Cards</Button>
                            <Text style={{flex: 1, fontSize: 20, textAlign: 'center'}}>|</Text>
                            <Button style={{flex: 1,}}
                                onPress={() => this.setState({newCard: true})}
                                disabled={ this.state.newCard }
                            >New Card</Button>
                        </View>
                    }

                    { !this.state.newCard 
                        && this.state.method == 'card' 
                        && ( !this.state.savedCards //no saved cards
                                ? (<Text style={{textAlignVertical: 'center', textAlign: 'center'}}>
                                        You have not saved any cards yet.
                                    </Text> 
                                ) : this.state.savedCards.map(card => 
                                    <MyCard key={card.id} savedCard={card}
                                        selectCard={() => this.setState({cardId: card.id})}
                                    /> 
                        ))
                    }
                    
                    { this.state.method == 'card' &&
                        <ActivityIndicator animating={this.state.loadingCards} style={{marginTop: 50}} />
                    }

                    <Card style={[styles.detailsCard, 
                        {display: (this.state.method == 'card' && this.state.newCard && !this.state.loadingCards) 
                            ? 'flex' : 'none'
                        }]}
                    >
                        <Title style={{fontSize: 18}}>Card Details</Title>
                        
                        <TextInput
                            label="Name on Card"
                            mode="outlined"
                            style={{backgroundColor: 'white', marginBottom: 10}}
                            value={this.state.cardName}
                            onChangeText={ cardName => this.setState({cardName})}
                            //TextInputMask
                        />
                        <TextInput
                            label="Card Number"
                            mode="outlined"
                            keyboardType="numeric"
                            style={{backgroundColor: 'white', marginBottom: 10}}
                            value={this.state.cardNumber}
                            onChangeText={ cardNumber => this.setState({cardNumber})}
                            //TextInputMask
                        />

                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <View style={{flex: 1}}>
                                <Title style={{fontSize: 18}}>Expiry Date</Title>
                                <TextInput
                                    label="MM/YY"
                                    value={this.state.cardExpiry}
                                    mode="outlined"
                                    style={{backgroundColor: 'white', marginRight: 20}}
                                    onChangeText={ cardExpiry => this.setState({cardExpiry})}       
                                />
                            </View>
                            <View style={{flex: 1}}>        
                                <Title style={{fontSize: 18}}>CVC</Title>                    
                                <TextInput
                                    label="CVC"
                                    value={this.state.cardCvc}
                                    mode="outlined"
                                    style={{flex: 1, backgroundColor: 'white'}}
                                    onChangeText={ cardCvc => this.setState({cardCvc})}     
                                />
                            </View>
                        </View>
                        

                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <Text style={{fontSize: 15}}>Remember my card details</Text>
                            <Switch value={this.state.saveCard}
                                onValueChange={() => this.setState({saveCard: !this.state.saveCard})}
                                color={this.colors.primary}
                                style={{flex: 1, alignSelf: 'flex-end'}}
                            />
                        </View>
                    </Card>

                    <Text style={{ flex: 1, textAlign: 'center', 
                        fontSize: 18, marginTop: 20,
                        display: this.state.method == 'paypal' ? 'flex' : 'none'}}
                    >
                        PayPal services are currently unavailable
                    </Text>

                    <Text style={{ flex: 1, textAlign: 'center', 
                        fontSize: 18, marginTop: 20,
                        display: this.state.method == 'mpesa' ? 'flex' : 'none'}}
                    >
                        M-Pesa services are currently unavailable
                    </Text>

                    <Button mode="contained" style={styles.donateBtn}
                        disabled={this.state.submitted}
                        onPress={this.handlePay}
                    >
                        Donate {this.state.total} {this.state.currency}  
                    </Button>
                    
                    <Portal>
                        <Modal visible={this.state.success}
                            contentContainerStyle={styles.successModal}
                            dismissable={true}
                            onDismiss={ this.reset } 
                        >
                            <Card style={styles.successCard}>
                                <Text style={{fontSize: 20, textAlign: 'center'}}>Thank you for your generous donation.</Text>
                                <Icon name='charity' color='red' size={100} style={{alignSelf: 'center', marginTop: 10}} />
                            </Card>
                        </Modal>
                    </Portal>


                </ScrollView>

                <MessagePopup error={this.state.error} 
                    message={this.state.message} 
                    dismiss={()=> this.setState({error: null, message: null})} 
                />
            </SafeAreaView>
            
        )

        return (
            <View style={{flex: 1}} >
                <ActivityIndicator size={40}
                    animating={this.state.loading} 
                    color={this.props.theme.colors.primary} 
                    style={{justifyContent: 'center', flex: 1}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 15,
    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    methodCard: {
        width: 100, 
        height: 70, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: 'white', 
        //backgroundColor: 'transparent', 
    },
    methodBadge: {
        backgroundColor: 'green', 
        marginTop: -15,
        marginRight: 20,
    },
    detailsCard: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    donateBtn: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 8,
    },
    errorTextWrapper: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#c22',
        fontSize: 16,
        fontWeight: '400',
    },
    errorIconWrapper: {
        padding: 5,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorWrapper: {
        backgroundColor: '#ecb7b7',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5,
        paddingVertical: 5,
        marginTop: 10,
    },
    successModal: {
        justifyContent: 'center',        
    },
    successCard: {
        padding: 20,
        height: 200,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

export default withTheme(PaymentScreen)