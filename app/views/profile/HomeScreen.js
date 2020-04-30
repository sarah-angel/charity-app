import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Text, Button, Title, Card, ActivityIndicator, Avatar } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

import MessagePopup from '../../components/MessagePopup'

import { isAuthenticated } from '../../auth/authService'
import { getTotalByUser } from '../../services/donationService'
import { getUserDetails } from '../../services/userService'

class HomeScreen extends React.Component {
    state = {
        signedIn: false,
        userId: null,
        currency: 'USD',
        total: '0.00',
        username: '',
        loading: true,
        error: null,
    }

    colors = this.props.theme.colors

    //Check if user is signed in
    componentDidMount = async() => {
        await isAuthenticated().then(token => {
            if ( token != null ){
                this.setState({signedIn: true, userId: token.userId})
            } else
                this.setState({loading: false})
        }).then( () => 
            this.getUser()
        ).then( () => 
            this.getTotal()
        )            

        this.props.navigation.addListener('focus', async () => {
            this.setState({loading: true})
            if ( !this.state.userId )
                await isAuthenticated().then(token => {
                    if ( token != null ){
                        this.setState({signedIn: true, userId: token.userId})   
                    } 
                })
            this.getUser()
            this.getTotal()
            
        })

    }

    getUser = () => {
        if (this.state.userId)
        getUserDetails(this.state.userId).then( response => {
            if (response.error)
                this.setState({error: response.error})
            else
                this.setState({username: response.username})
        })
    }

    getTotal = () => {
        if (this.state.userId)
        getTotalByUser(this.state.userId).then(response => {
            if(response.error)
                this.setState({error: response.error})
            else{
                this.setState({total: response})
            }
        }).then(() => this.setState({loading: false}))
    }

    render(){
        if ( !this.state.loading)
        return (
            <View style={styles.root}>
                <ScrollView contentContainerStyle={styles.root} style={styles.scrollView} >
                    <View style={{display: !this.state.signedIn ? 'flex' : 'none', justifyContent: 'center', flex: 1}}>
                        <Title style={{textAlign: 'center'}}>
                            Sign In to view your profile
                        </Title>
                        <Button mode="contained"
                            style={styles.signInBtn}
                            onPress={() => this.props.navigation.navigate('SignIn')}
                        >
                            Sign In
                        </Button>
                        <Button mode="outlined"
                            style={styles.registerBtn}
                            onPress={() => this.props.navigation.navigate('Register')}
                        >
                            Register
                        </Button>
                    </View>

                    <View style={{display: this.state.signedIn ? 'flex' : 'none' }}>

                        <Card style={styles.profileCard}>
                            <Card.Title 
                                title={this.state.username}
                                titleStyle={{fontSize: 18, marginLeft: 10}}
                                left={() => 
                                    <Avatar.Icon icon="account" size={100} style={{}} />
                                }
                                leftStyle={{marginRight: 60, marginTop: 10}}
                                subtitle={
                                    <Text style={[{fontSize: 15}, {color: this.colors.primary}]}>
                                        Update Profile
                                    </Text>
                                }
                                subtitleStyle={{marginLeft: 10, marginTop: 10}}
                                style={{padding: 20}}
                            />
                        </Card>

                        <Card style={styles.totalCard}>
                            <Card.Title 
                                title="My Total Donations"
                                titleStyle={{fontSize: 15, marginLeft: 10, alignSelf: 'center'}}
                                style={{padding: 20, paddingBottom: 0}}
                            />
                            <Card.Content style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold',textAlign: 'center', color: this.colors.primary}}>
                                    {this.state.currency}
                                </Text>
                                <Text style={{fontSize: 50, fontWeight: 'bold',textAlign: 'center', color: this.colors.primary}}>
                                    {this.state.total}
                                </Text>
                            </Card.Content>
                        </Card>
                    </View>
                </ScrollView>

                <MessagePopup error={this.state.error} 
                    message={this.state.message} 
                    dismiss={()=> this.setState({error: null, message: null})} 
                />
                
            </View>
        )

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

const styles = StyleSheet.create({
    root: {
        margin: 10,
        flex: 1, 
        //justifyContent: 'center',
    },
    signInBtn: {
        width: 300,
        alignSelf: 'center',
        borderRadius: 18,
        marginTop: 10,
    },
    registerBtn: {
        width: 300,
        alignSelf: 'center',
        borderRadius: 18,
        marginTop: 10,
    },
    profileCard: {
        padding: 20,
        paddingBottom: 20
    },
    totalCard: {
        padding: 20,
        marginTop: 20
    }
    
})

export default withTheme(HomeScreen)