import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, VirtualizedList } from 'react-native'
import { Text, Button, Title, Card, TextInput } from 'react-native-paper';
import { withTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {
    state = {
        error: null,
    }

    render(){
        return (
            <View style={styles.root}>
                <ScrollView style={styles.scrollView} >

                    <Title style={{marginLeft: 10, marginTop: 10, marginBottom: 10, textAlign: 'center', fontSize: 18}}>
                        No new campaigns to display.
                    </Title>

                </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    root: {
        margin: 10,
    },
})

export default withTheme(HomeScreen)