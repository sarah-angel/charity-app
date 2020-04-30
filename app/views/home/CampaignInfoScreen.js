import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'

  
class CampaignInfoScreen extends React.Component{
    
    state = {
        loading: true,
        data: [],
        //category: this.props.route.params.category,
    }
    
    componentDidMount(){
        //Fetch campaign by id from the database

        this.setState({loading: false})
    }

    render(){
        return (
            <SafeAreaView style={{flex: 1}}>
              <ScrollView contentContainerStyle={{flex: 1}}>
                <Text style={styles.title}>
                    Campaign Info currently not available
                </Text>
              </ScrollView>
            </SafeAreaView>
        );
    }
    
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default withTheme(CampaignInfoScreen);