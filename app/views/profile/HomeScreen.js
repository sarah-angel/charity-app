import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

import Auth from './Auth';
import { isAuthenticated } from '../../auth/authService'

class HomeScreen extends React.Component {
    state = {
        signedIn: false,
    }

    //Check if user is signed in
    componentDidMount = () => {
        isAuthenticated().then(response => {
            if ( response != null ){
                this.setState({signedIn: true})
            }
            console.log(response)
        })
          

    }

    render(){
        return (
            <View style={styles.root}>
                <ScrollView contentContainerStyle={styles.root} style={styles.scrollView} >
                    <View style={{display: !this.state.signedIn ? 'flex' : 'none'}}>
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
                        <Title>My Profile...</Title>
                    </View>
                </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
        flex: 1, 
        justifyContent: 'center',
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
    }
    
})

export default withTheme(HomeScreen)