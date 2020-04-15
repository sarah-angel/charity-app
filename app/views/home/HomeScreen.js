import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

const CategoryCard = (props) => {
    const {colors} = props.theme 
    const item = props.item
    const {navigate} = props.navigation

    return (
        <Card style={styles.card} 
            onPress={() => {
                console.log(item.id)
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
const data = [
    {
        id: '1',
        name: 'Hunger',
        icon: 'food',
        color: 'orange',
    },
    {
        id: '2',
        name: 'Health & Medical Care',
        icon: 'stethoscope',
        color: 'red',
    },
    {
        id: '3',
        name: 'Disaster Relief',
        icon: 'medical-bag',
        color: 'black',
    },
    {
        id: '4',
        name: 'Environment',
        icon: 'flower',
        color: 'green',
    },
    {
        id: '5',
        name: 'Arts & Culture',
        icon: 'music',
        color: 'purple',
    },
    {
        id: '6',
        name: 'Animals & Humane',
        icon: 'paw',
        color: 'pink',
    },
    {
        id: '7',
        name: 'Human Services',
        icon: 'toolbox',
        color: 'firebrick',
    },
    {
        id: '8',
        name: 'Education',
        icon: 'school',
        color: 'brown',
    },
    {
        id: '9',
        name: 'Active Duty & Veterans',
        icon: 'pistol',
        color: 'olive',
    },
    {
        id: '10',
        name: 'Community & Family',
        icon: 'account-group',
        color: 'teal',
    },
    {
        id: '11',
        name: 'Faith & Missions',
        icon: 'church',
        color: 'gold',
    },
    {
        id: '12',
        name: 'Global',
        icon: 'earth',
        color: 'darkolivegreen',
    },
]

class HomeScreen extends React.Component {
    state = {
        amount: '',
    }

    render(){
        return (
            <View style={styles.root}>
                <ScrollView style={styles.scrollView} >
                <Card style={styles.expressCard}>
                    <Card.Title title="Express Donation"/>
                    <Card.Content style={{flexDirection: 'row'}}>
                        <TextInput label='Amount'
                            value={this.state.amount}
                            onChangeText={amount => this.setState({amount})}
                            mode="outlined"
                            style={{width: 210, height: 50, backgroundColor: 'white'}}
                        />
                        <Button style={{flex: 1, height: 50, marginTop: 5}} mode="contained">Donate</Button>
                    </Card.Content>
                </Card>

                <Title style={{marginLeft: 10, marginTop: 10, marginBottom: 10, textAlign: 'center'}}>
                    Donation Categories
                </Title>

                <View style={styles.categoryList}>
                    {data.map(item => (
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