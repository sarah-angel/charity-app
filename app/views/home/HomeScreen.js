import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

import { categories } from '../../store'

const CategoryCard = (props) => {
    const {colors} = props.theme 
    const {navigate} = props.navigation
    const item = props.item

    return (
        <Card style={styles.card} 
            onPress={() => {
                navigate('Campaign', {
                    category: item
                })
            }} 
        >
            <Icon name={item.icon} size={50} style={{alignSelf: 'center', marginBottom: 10}} color={item.color}/>
            <Text style={{textAlign: 'center', marginTop: 10}} >{item.name}</Text>
        </Card>
    )
}

class HomeScreen extends React.Component {
    state = {
        amount: '',
        error: null,
    }

    //Go straight to payment screen
    donate = () => {
        if ( this.state.amount > 0 ){
            this.props.navigation.navigate('Payment', {
                total: this.state.amount,
                currency: 'USD'
            })
        } else
            this.setState({error: 'Please enter amount to donate.'})
    }

    render(){
        return (
            <View style={styles.root}>
                <ScrollView style={styles.scrollView} >
                <Card style={styles.expressCard}>
                    <Card.Title titleStyle={{fontSize: 18}} title="Express Donation"/>
                    <Card.Content style={{flexDirection: 'row'}}>
                        <TextInput label='Amount'
                            value={this.state.amount}
                            onChangeText={amount => this.setState({amount})}
                            mode="outlined"
                            keyboardType="decimal-pad"
                            style={{width: 210, backgroundColor: 'white'}}
                        />
                        <Button style={{flex: 1,  marginTop: 5, justifyContent: 'center'}} 
                            mode="contained"
                            onPress={this.donate}
                        >Donate</Button>
                    </Card.Content>
                </Card>

                <Title style={{marginLeft: 10, marginTop: 10, marginBottom: 10, textAlign: 'center'}}>
                    Donation Categories
                </Title>

                <View style={styles.categoryList}>
                    {categories.map(item => (
                        <CategoryCard key={item.id} item={item} {...this.props}/>
                    ))}
                </View>
                </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
    },
    expressCard:{
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    categoryList:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    card: {
        width: 150,
        height: 170,
        padding: 20,
        paddingTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    }
})

export default withTheme(HomeScreen)