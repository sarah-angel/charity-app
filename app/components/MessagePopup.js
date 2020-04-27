import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native'
import { Title, Text, TextInput, Button, Modal, Portal, Card, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ViewOverflow from 'react-native-view-overflow'

const MessagePopup = ({error, message, dismiss}) => {
    return (
        <>
        { error && (
            <Portal>
                <Modal visible={true}
                    contentContainerStyle={{justifyContent: 'center'}}
                    dismissable={true}
                    onDismiss={dismiss}  
                >
                    <Card style={styles.messageCard}>
                        <Text style={{fontSize: 18, color: 'red', textAlign: 'center'}}>Error!</Text>
                        <Text style={{textAlign: 'center'}}>{error}</Text>
                        <Card.Actions style={{alignSelf: 'center', marginTop: 10}}>
                            <Button style={{backgroundColor: '#ecb7b7'}} mode="contained" onPress={dismiss}>
                                Try Again
                            </Button>
                        </Card.Actions>
                    </Card>

                </Modal>
            </Portal>
        )}

        { message && (
            <Portal>
                <Modal visible={true}
                    contentContainerStyle={{justifyContent: 'center'}}
                    dismissable={true}
                    onDismiss={dismiss}  
                >
                    <Card style={styles.messageCard}>
                        <Text style={{fontSize: 18, color: 'green', textAlign: 'center'}}>Success!</Text>
                        <Text style={{textAlign: 'center'}}>{message}</Text>
                        <Card.Actions style={{alignSelf: 'center', marginTop: 10}}>
                            <Button onPress={dismiss} 
                                style={{width: 100, backgroundColor: 'green'}} 
                                mode="contained"
                            >
                                Ok
                            </Button>
                        </Card.Actions>
                    </Card>

                </Modal>
            </Portal>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    errorTextWrapper: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#c22',
        fontSize: 16,
        fontWeight: '400',
    },
    errorIconWrapper: {
        padding: 5,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorWrapper: {
        backgroundColor: '#ecb7b7',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5,
        paddingVertical: 5,
        marginTop: 10,
    },
    messageCard: {
        padding: 30,
        //height: 200,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        
    },
})

export default withTheme(MessagePopup)