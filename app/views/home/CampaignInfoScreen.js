import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import { withTheme } from 'react-native-paper'

class CampaignInfoScreen extends React.Component{
    
    state = {
        loading: true,
        data: [],
        category: this.props.route.params.category,
    }
    
    componentDidMount(){
        //Fetch campaign by id from the database

        this.setState({loading: false})
    }

    render(){
        return (
            <SafeAreaView >
              <ScrollView>
                <Text>Info page</Text>
              </ScrollView>
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
});

export default withTheme(CampaignInfoScreen);