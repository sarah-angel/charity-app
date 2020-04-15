import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Image, ScrollView } from 'react-native'
import { Title, Text, TextInput, Button, Modal, Portal, Card, Switch, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ViewOverflow from 'react-native-view-overflow'

export default ErrorView = ({error}) => {
    return (
        error &&
        <View style={styles.errorWrapper}>
            <View style={styles.errorIconWrapper}>
                <Icon name='alert-circle' size={20} color='#c22' />
            </View>
            <View style={styles.errorTextWrapper}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        </View>
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
})