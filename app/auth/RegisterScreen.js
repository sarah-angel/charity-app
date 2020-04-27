import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import MessagePopup from '../components/MessagePopup'
import { signIn, register } from './authService'

class RegisterScreen extends React.Component {
    state = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        submitted: false,
        error: null,
    }

    handleChange = (field, value) => {
        this.setState({[field]: value})
    }

    handleRegister = () => {
        if ( !this.state.username || !this.state.password){
            this.setState({error: 'Please fill in the required fields.'})
            return
        }
        
        this.setState({submitted: true})

        var user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
        }

        //Register and authenticate user in the server
        //Navigate to previous screen
        register(user).then( response => {
            if (response.error)
                this.setState({error: response.error, submitted: false})
            else {
                this.props.navigation.goBack()
            }
        })
    }

    render(){
    return (
        <View style={styles.root}>
            <ScrollView>

            <Button mode='outlined'
                style={{alignSelf: 'flex-end'}}
                onPress={() => this.props.navigation.navigate('SignIn')}
            >
                Sign In
            </Button>

            <View style={{justifyContent: 'center', flex: 1, marginTop: -20}} >
            <Title style={{textAlign: 'center'}}>
                Register 
            </Title>

            <TextInput
                label="Username"
                mode="outlined"
                onChangeText={(value) => this.handleChange('username', value)}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <TextInput
                label="First Name"
                mode="outlined"
                onChangeText={(value) => this.handleChange('firstName', value)}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <TextInput
                label="Last Name"
                mode="outlined"
                onChangeText={(value) => this.handleChange('lastName', value)}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <TextInput
                label="Email"
                mode="outlined"
                onChangeText={(value) => this.handleChange('email', value)}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="number-pad"
                onChangeText={(value) => this.handleChange('phone', value)}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                onChangeText={(value) => this.handleChange('password', value)}
                style={{marginBottom: 10, marginTop: 10}}
            />

            <Button mode="contained"
                style={styles.signInBtn}
                disabled={this.state.submitted}
                onPress={this.handleRegister}
            >
                Register
            </Button>

            <Text style={{textAlign: 'center', marginTop: 20}}>
                Register with an alias to remain anonymous
            </Text>
            </View>
            </ScrollView>

            <MessagePopup error={this.state.error} dismiss={() => this.setState({error: null})} />
        </View>
        
    )}
}

const styles = StyleSheet.create({
    root: {
        margin: 20,
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

export default withTheme(RegisterScreen)