import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

import { signIn } from '../../auth/authService'

function SignInScreen(props) {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    //const { signIn } = React.useContext(props.AuthContext)

    function handleSignIn() {
        console.log("Signing in...")
        var data = {
            username,
            password,
        }

        //Authenticate user in the server
        //Navigate to previous screen
        signIn(data).then( response => {
            if (response.error)
                console.log(response.error)
            else {
                props.navigation.goBack()
            }
        })
    }

    return (
        <View style={styles.root}>
            <ScrollView contentContainerStyle={styles.root} style={styles.scrollView} >
                <View style={{}}>
                    <Title style={{textAlign: 'center'}}>
                        Sign In 
                    </Title>

                    <TextInput
                        label="Username"
                        mode="outlined"
                        onChangeText={setUsername}
                        style={{marginBottom: 10, marginTop: 10}}
                    />

                    <TextInput
                        label="Password"
                        mode="outlined"
                        onChangeText={setPassword}
                        style={{marginBottom: 10, marginTop: 10}}
                    />

                    <Button mode="contained"
                        style={styles.signInBtn}
                        onPress={() => handleSignIn()}
                    >
                        Sign In
                    </Button>

                    <View style={{flexDirection: 'row',}}>
                        <Text style={{marginTop: 10, justifyContent: 'flex-start'}}>
                            Forgot your password?
                        </Text>
                        <Button mode="flat"
                            style={styles.registerBtn}
                        >
                            Register
                        </Button>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
        flex: 1, 
        justifyContent: 'center',
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