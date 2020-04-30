import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, ActivityIndicator } from 'react-native-paper';
import { withTheme } from 'react-native-paper'

import MessagePopup from '../../components/MessagePopup'
import CampaignCard from '../../components/CampaignCard'
import { getCampaignsByCategory } from '../../services/campaignService'

class CampaignScreen extends React.Component{
    
    state = {
        loading: true,
        data: [],
        category: this.props.route.params.category,
        isData: true,
        error: null,
    }
    
    componentDidMount(){
        //Fetch campaigns of the selected category from the server
        getCampaignsByCategory(this.props.route.params.category.id)
            .then(response => {
                if (response.error)
                    this.setState({error: response.error})
                else{
                    this.setState({
                        data: response,
                        isData: response.length != 0,
                        loading: false
                    })                        
                }
            }).then( () => this.setState({loading: false}))

    }

    render(){
        
        if ( !this.state.loading)
        return (
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => 
                      <CampaignCard 
                          category={this.props.route.params.category} 
                          item={item} {...this.props}
                      />
                    }
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={
                      <Title style={{fontSize: 18}}>Campaigns</Title>
                  }
                    ListHeaderComponentStyle={sytles.title}
                />
                { !this.state.isData && 
                    <Text style={{textAlign: 'center'}}>
                        No campaigns to show for this category.
                    </Text>
                }

                <MessagePopup error={this.state.error} 
                    message={this.state.message} 
                    dismiss={()=> this.setState({error: null, message: null})} 
                />
                
            </SafeAreaView>
        );

        return (
            <View style={{flex: 1}} >
                <ActivityIndicator size={40}
                    animating={this.state.loading} 
                    color={this.props.theme.colors.primary} 
                    style={{justifyContent: 'center', flex: 1}}
                />
            </View>
        )
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