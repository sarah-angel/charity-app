import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'

import CampaignCard from './app/components/CampaignCard'

const data = [
    {
        id: '1',
        campaignName: '',
        description: '',
        country: '',
        logo: '',
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

class HomeScreen2 extends React.Component{
    
    state = {
        loading: true,
        data: [],
        category: this.props.route.params.category,
    }
    
    componentDidMount(){
        console.log(this.props.route.params.category)
        //Fetch campaigns of the selected category from the database

        var x = [
            {
                id: '1',
                campaignName: '',
                description: '',
                country: '',
                logo: '',
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

        this.setState({loading: false, data: x})
    }

    render(){
        return (
            <SafeAreaView >
              <FlatList
                  data={this.state.data}
                  renderItem={(item) => <CampaignCard category={this.state.category} item={item} {...this.props}/>}
                  keyExtractor={item => item.id}
                  ListHeaderComponent={<Title>Campaigns</Title>}
                  ListHeaderComponentStyle={sytles.title}
              />
            </SafeAreaView>
        );
    }
    
}

const sytles = StyleSheet.create({
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
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