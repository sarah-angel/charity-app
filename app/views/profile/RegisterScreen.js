import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

class RegisterScreen extends React.Component {
    state = {
        signedIn: false,
    }

    //Check if user is signed in
    componentDidMount = () => {

    }

    render(){
        return (
            <View style={styles.root}>
                <ScrollView contentContainerStyle={styles.root} style={styles.scrollView} >
                    <View style={{display: !this.state.signedIn ? 'flex' : 'none'}}>
                        <Title style={{textAlign: 'center'}}>
                            Register
                        </Title>
                        <Button mode="contained"
                            style={styles.signInBtn}
                        >
                            Sign In
                        </Button>
                        <Button mode="outlined"
                            style={styles.registerBtn}
                        >
                            Register
                        </Button>
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

export default withTheme(RegisterScreen)