import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'

const MyCard = (props) => {
    const { colors } = props.theme
    const savedCard = props.savedCard

    const [isSelected , select] = React.useState(false)

    const selectCard = () => {
        select(true)

        props.selectCard()
    }

    return (
        <Card 
            style={[styles.card, 
                isSelected ? {backgroundColor: 'lavender'} : {}]}
            onPress={() => selectCard()}
        >
            { savedCard.brand == 'Visa'  
                ? (<Image source={require('../../assets/visa.png')}
                        style={{justifyContent: 'center', width: 50, height: 30}} 
                    />
                ) : (
                    <Image source={require('../../assets/mastercard.png')}
                        style={{justifyContent: 'center', width: 50, height: 30}} 
                    />
                )
            }
            
            <Title style={{marginTop: 20, fontFamily: 'monospace'}}>
                ****  ****  ****  {savedCard.last4}
            </Title>

            <View style={{flexDirection: 'row', marginTop: 20, }}>
                <View>
                    <Text>Card Holder</Text>
                    <Title style={{fontSize: 18, fontFamily: 'monospace'}}>
                        {savedCard.name}
                    </Title>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end',}}>
                    <Text style={{textAlign: 'right'}}>Expiry Date</Text>
                    <Title style={{ textAlign: 'right', fontFamily: 'monospace'}}>
                        {savedCard.exp_month}/{savedCard.exp_year.toString().slice(2)}
                    </Title>
                </View>
            </View>
        </Card>

    // <Image source={require('../../assets/visa.png')}
    //     style={{justifyContent: 'center', width: 50, height: 30}} 
    // />
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 8,
        marginRight: 10,
        marginLeft: 10,
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

export default withTheme(MyCard)