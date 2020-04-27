import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

import MessagePopup from '../components/MessagePopup'

import { signIn } from './authService'

class SignInScreen extends React.Component {

    state = {
        username: '',
        password: '',
        submitted: false,
        error: null,
    }

    handleSignIn = () => {
        if ( !this.state.username || !this.state.password){
            this.setState({error: 'Please enter your credentials to sign in.'})
            return
        }

        this.setState({submitted: true})

        var user = {
            username: this.state.username,
            password: this.state.password,
        }
        
        //Authenticate user in the server
        //Navigate to previous screen
        signIn(user).then( response => {
            if (response.error)
                this.setState({ error: response.error, submitted: false})
            else {
                this.props.navigation.goBack()
            }
        })
    }

    render() {
    return (
        <View style={styles.root}>
            <Button
                onPress={() => this.props.navigation.goBack()}
                uppercase={false}
                style={{alignSelf: 'flex-end',}}
            >
                Skip
                <Icon name="chevron-right" />
            </Button>

            <View style={{justifyContent: 'center', flex: 1, marginTop: -20}} >
            <Title style={{textAlign: 'center'}}>
                Sign In 
            </Title>

            <TextInput
                label="Username"
                mode="outlined"
                onChangeText={(username) => this.setState({username})}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <Button mode="contained"
                style={styles.signInBtn}
                disabled={this.state.submitted}
                onPress={this.handleSignIn}
            >
                Sign In
            </Button>

            <View style={{flexDirection: 'row',}}>
                <Text style={{marginTop: 10, justifyContent: 'flex-start'}}>
                    Forgot your password?
                </Text>
                <Button mode="flat"
                    style={styles.registerBtn}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    Register
                </Button>
            </View>

            <Text style={{textAlign: 'center', marginTop: 20}}>
                Sign in to track your donations and get access to other services like credit card management.
            </Text>
            </View>

            <MessagePopup error={this.state.error} dismiss={() => this.setState({error: null})}/>
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
        width: '100%',
        alignSelf: 'center',
        //borderRadius: 18,
        marginTop: 10,
        marginBottom: 10,
    },
    registerBtn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
    }
    
})

export default withTheme(SignInScreen)