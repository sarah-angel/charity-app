import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native'
import { Title, Text, TextInput, Button, Modal, Portal, Card, Switch, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ViewOverflow from 'react-native-view-overflow'

import { getCreditCardToken, saveCard, pay } from '../../services/paymentService'

class PaymentScreen extends React.Component {
    colors = this.props.theme.colors

    state = {
        method: 'card', //Default payment method
        stripeCustomerId: null,
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardId: null, //selected card to charge
        stripeToken: '',
        email: '',
        saveCard: false,
        total: this.props.route.params.total,
        currency: this.props.route.params.currency,
        submitted: false,
        success: false,
        error: null,
    }

    //Check if user has a stripeCustomerId in the database
    componentDidMount = () => {

    }

    handlePay = () => {
        console.log("donating..")
        
        //Disable submit button
        this.setState({submitted: true})

        var cardData = {
            cardNumber : this.state.cardNumber,
            cardExpiry : this.state.cardExpiry,
            cardCvc : this.state.cardCvc
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

                    var data = {
                        stripeToken: response,
                        amount: this.state.total,
                        currency: this.state.currency,
                        name: this.state.cardName ? this.state.cardName : null,
                        stripeCustomerId: this.state.stripeCustomerId,
                        cardId: this.state.cardId,
                    }

                    //if save card is checked, save card then pay
                    if ( this.state.saveCard ){
                        
                        saveCardAndPay(data).then(response => {
                            if (response.error)
                                this.setState({submitted: false, error: response.error})
                            else {
                                if (response.status == 'succeeded')
                                    this.setState({success: true})
                            }
                        })
                    }else {
                        pay(data).then(response => {
                            if (response.error)
                                this.setState({submitted: false, error: response.error})
                            else
                                if (response.status == 'secceeded')
                                    this.setState({success: true})
                        })
                    }
                }
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.root}>
                <ScrollView contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}>
                    <Title style={styles.title}>Payment Method</Title>

                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{}}>
                            <Card style={styles.methodCard}
                                onPress={() => this.setState({method: 'card'})}
                            >
                                <Icon name='credit-card' size={50} 
                                    style={{justifyContent: 'center', marginTop: 10}} 
                                    //color={this.colors.primary} 
                                />
                            
                            </Card>
                            <Badge style={styles.methodBadge} size={30} 
                                visible={this.state.method == 'card'} 
                            >
                                <Icon name="check" color="white" size={20} style={{fontSize: 20}} />
                            </Badge>
                        </View>
                        <View style={{}}>
                            <Card style={styles.methodCard}
                                onPress={() => this.setState({method: 'paypal'})}
                            >
                                <Image source={require('../../../assets/paypal.png')} 
                                    style={{justifyContent: 'center', marginTop: 10, width: 70, height: 50}} 
                                />
                            </Card>
                            <Badge style={styles.methodBadge} size={30} 
                                visible={this.state.method == 'paypal'} 
                            >
                                <Icon name="check" color="white" size={20} style={{fontSize: 20}} />
                            </Badge>
                        </View>
                        <View style={{}}>
                            <Card style={styles.methodCard}
                                onPress={() => this.setState({method: 'mpesa'})}
                            >
                                <Image source={require('../../../assets/mpesa.png')}
                                    style={{justifyContent: 'center', marginTop: 10, width: 60, height: 50}} 
                                />
                            </Card>
                            <Badge style={styles.methodBadge} size={30} 
                                visible={this.state.method == 'mpesa'} 
                            >
                                <Icon name="check" color="white" size={20} style={{fontSize: 20}} />
                            </Badge>
                        </View>      
                    </View>

                    <Card style={[styles.detailsCard, 
                        {display: this.state.method == 'card' ? 'flex' : 'none'}]}
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

                    <Title style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center',
                        display: this.state.method == 'paypal' ? 'flex' : 'none'}}
                    >
                        PayPal services are currently unavailable
                    </Title>

                    <Title style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center',
                        display: this.state.method == 'mpesa' ? 'flex' : 'none'}}
                    >
                        M-Pesa services are currently unavailable
                    </Title>

                    { this.state.error && (
                        <View style={styles.errorWrapper}>
                            <View style={styles.errorIconWrapper}>
                                <Icon name='alert-circle' size={20} color='#c22' />
                            </View>
                            <View style={styles.errorTextWrapper}>
                                <Text style={styles.errorText}>{this.state.error}</Text>
                            </View>
                        </View>
                    )}

                    <Button mode="contained" style={styles.donateBtn}
                        disabled={this.state.submitted}
                        onPress={this.handlePay}
                    >
                        Donate {this.state.total} {this.state.currency}  
                    </Button>
                    
                    <Portal>
                        <Modal visible={this.state.success}
                            contentContainerStyle={styles.successModal}
                            onDismiss={ this.state.success && this.props.navigation.navigate('Home')}
                        >
                            <Card style={styles.successCard}>
                                <Text style={{fontSize: 20, textAlign: 'center'}}>Thank you for your generous donation.</Text>
                                <Icon name='charity' color='red' size={100} style={{alignSelf: 'center', marginTop: 10}} />
                            </Card>
                        </Modal>
                    </Portal>


                </ScrollView>
            </SafeAreaView>
            
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
        backgroundColor: 'transparent', 
    },
    methodBadge: {
        backgroundColor: 'green', 
        marginTop: -15,
        marginRight: 20,
    },
    detailsCard: {
        //display: 'none', //only show when card method is selected
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
        flex: 1,
        justifyContent: 'center',
        //width: 200,
        //height: 400,
        
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