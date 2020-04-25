import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph } from 'react-native-paper';
import { withTheme } from 'react-native-paper'

import CampaignCard from '../../components/CampaignCard'
import { getCampaignsByCategory } from '../../services/campaignService'

class CampaignScreen extends React.Component{
    
    state = {
        loading: true,
        data: [],
        category: this.props.route.params.category,
    }
    
    componentDidMount(){
        //Fetch campaigns of the selected category from the server
        getCampaignsByCategory(this.props.route.params.category.id)
            .then(response => {
                if (response.error)
                    this.setState({error: response.error})
                else
                    this.setState({data: response})
            })

        //this.setState({loading: false, data: x})
    }

    render(){
        return (
            <SafeAreaView >
              <FlatList
                  data={this.state.data}
                  renderItem={(item) => 
                    <CampaignCard 
                        category={this.props.route.params.category} 
                        item={item} {...this.props}
                    />
                }
                  keyExtractor={item => item.id.toString()}
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
});

export default withTheme(CampaignScreen);