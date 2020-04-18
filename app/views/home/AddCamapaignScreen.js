import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import { withTheme } from 'react-native-paper'

class AddCampaignScreen extends React.Component{
    
    state = {
        loading: true,
        campaignName: '',
        description: '',
        country: '',
        categoryId: null,
        image: null, //logo
    }
    
    componentDidMount(){

        this.setState({loading: false})
    }

    //TODO: textInput for campaignName, description, Country
    //dropdown list for category
    //image upload for logo/image?
    render(){
        return (
            <SafeAreaView >
              <ScrollView>
                <Text>Add Campaign</Text>
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

export default withTheme(AddCampaignScreen);