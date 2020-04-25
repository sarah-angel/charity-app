import * as React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Title, Text, Button, Divider, Avatar, Card, Paragraph, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageBrowser } from 'expo-image-picker-multiple'
import { Dropdown } from 'react-native-material-dropdown'

import { categories } from '../../store'
import { uploadCampaignLogo, saveCampaign } from '../../services/campaignService'

class AddCampaignScreen extends React.Component{
    
    state = {
        loading: true,
        campaignId: null,
        campaignName: '',
        description: '',
        country: '',
        categoryId: '',
        logo: null,
        message: null,
        error: null,
    }
    
    categories = []

    componentDidMount(){
        for ( var category of categories){
            this.categories.push({
                value: category.id,
                label: category.name,
            })
        }
        
        this.setState({loading: false})
    }

    handleSave = () => {
        let campaign = {
            campaignName: this.state.campaignName,
            description: this.state.description,
            country: this.state.country,
            categoryId: this.state.categoryId,
        }

        //returns campaignId
        saveCampaign(campaign).then(response => {
            if ( response.error)
                this.setState({error: response.error})
            else {
                this.setState({
                    campaignId: response.id, 
                    message: 'Campaign saved successfully.'
                })
            }
                
        }).then( response => {
            if ( this.state.logo )
                this.uploadImage()
        })
    }

    //for ios
    getPermission = async () => {
       
    }

    handleUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (result.cancelled){
            return
        }

        this.setState({logo: result.uri})
        
        //update existing campaign
        if ( this.state.campaignId )
            this.uploadImage()    
    }

    uploadImage = () => {
        let uriParts = this.state.logo.split('.')

        var imageData = {
            isLogo: true,
            campaignId: this.state.campaignId,
            uri: this.state.logo,
            name: this.state.logo.split('/').pop(),
            fileType: uriParts[ uriParts.length - 1],
        }

        uploadCampaignLogo(imageData).then(response => {
            if ( response.error )
                this.setState({error: response.error})
            else
                this.setState({message: response.message})
        })
    }

    render(){
        return (
            <SafeAreaView style={{flex: 1, margin: 20}}>
              <ScrollView contentContainerStyle={{}}>
                <Title style={{textAlign: 'center', fontSize: 18}}>Add New Campaign</Title>
                <Card style={styles.card}>

                    { this.state.logo
                        ?<Avatar.Image size={100} style={styles.cardImg} 
                            source={{uri: this.state.logo}}
                        />

                        :<Avatar.Icon size={100} style={styles.cardIcon} 
                            icon="charity"
                        />
                    }
                    <Button onPress={this.handleUploadImage} uppercase={false}>
                        Change Logo
                    </Button>

                    <TextInput
                        label="Campaign Name"
                        mode="outlined"
                        style={{backgroundColor: 'white'}}
                        onChangeText={ campaignName => this.setState({campaignName})}
                    />

                    <Dropdown
                        label='Campaign Category'
                        data={this.categories}
                        value={this.state.currency}
                        onChangeText={(categoryId) => this.setState({categoryId})}
                        containerStyle={styles.dropdown}
                        style={{}}
                    />

                    <TextInput
                        label="Country"
                        mode="outlined"
                        style={{backgroundColor: 'white'}}
                        onChangeText={ country => this.setState({country})}
                    />

                    <TextInput
                        label="Website"
                        mode="outlined"
                        style={{backgroundColor: 'white'}}
                        onChangeText={ website => this.setState({website})}
                    />

                    <TextInput
                        label="Description"
                        mode="outlined"
                        style={{backgroundColor: 'white'}}
                        multiline={true}
                        onChangeText={ description => this.setState({description})}
                    />

                </Card>

                <Button mode='contained' 
                    style={styles.btn}
                    onPress={this.handleSave}
                >
                    Save Campaign
                </Button>

              </ScrollView>
            </SafeAreaView>
        );
    }
    
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    card: {
        flex: 1,
        margin: 20, 
        padding: 20,
    },
    cardImg: {
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
    },
    cardIcon: {
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey'
    },
    btn: {
       // width: '100%',
        alignSelf: 'center',
        borderRadius: 18,
    },
    dropdown: {
        borderWidth: 1, 
        borderColor: 'grey',
        borderRadius: 2,
        height: 60, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 0,
        marginTop: 5,
        justifyContent: 'center'
        
    },
});

export default withTheme(AddCampaignScreen);