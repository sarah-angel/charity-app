import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

const CategoryCard = (props) => {
    return (
        <Card style={styles.card} onPress={() => console.log("click!")}>
            <Icon name="food" size={50} style={{alignSelf: 'center'}} />
            <Text style={{textAlign: 'center'}} >ACTIVE DUTY &amp; VETERANS</Text>
        </Card>
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
    {
        id: '7',
    },
    {
        id: '8',
    },
    {
        id: '9',
    },
    {
        id: '10',
    },
    {
        id: '11',
    },
    {
        id: '12',
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
                            style={{width: 210, height: 50}}
                        />
                        <Button style={{flex: 1}} mode="contained">Donate</Button>
                    </Card.Content>
                </Card>

                <Title style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}>SELECT CATEGORY</Title>
                <View style={styles.categoryList}>
                    <FlatList
                        data={data}
                        renderItem={() => <CategoryCard {...this.props}/>}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
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
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    card: {
        width: 170,
        height: 100,
        padding: 10,
        paddingTop: 10,
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 10,
        // marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    }
})

export default withTheme(HomeScreen)