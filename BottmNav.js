import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { DefaultTheme, Provider as PaperProvider ,BottomNavigation, Text, Button, Appbar, Avatar, Card, Paragraph, IconButton } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme } from 'react-native-paper'
import HomeScreen2 from './HomeScreen2'

const Stack = createStackNavigator(); 

const styles = {
    container: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button 
          onPress={() => {
            navigation.navigate('Music', {
              itemId: 88,
              other: "bla",
            });
          }}
      > Go to Music</Button>
    </View>
  );
}


const RootNav = () => {
  return (      <Text style={{margin: 10}}>Post: </Text>

    // <Stack.Navigator>
    //   <Stack.Screen name="Home" component={HomeScreen} />
    //   <Stack.Screen name="Music" component={MusicRoute} />
    // </Stack.Navigator>
  )
}

const MusicRoute = () => <Text style={styles.container}>Music</Text>;

const AlbumsRoute = ({navigation, route}) => // <Text style={styles.container}>Albums</Text>; 
{
  return(
  <Text>Albums</Text>
)}

const Header = ({ scene, previous, navigation }) => {

  return (
    <Appbar.Header>
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Avatar.Icon size={40}  icon="charity"/>
      )}
      <Appbar.Content title="Charity" />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  )
}

const HomeStack = createStackNavigator();

const HomeStackNav = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          )
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Music" component={MusicRoute} />
      </HomeStack.Navigator>
    </NavigationContainer>
  )
}

const AlbumsNav = () => {
  return (
    <NavigationContainer>

    <Stack.Navigator 
      initialRouteName="bla"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        )
      }}>
      <Stack.Screen name="bla" component={HomeScreen2} />
      <Stack.Screen name="Albums" component={AlbumsRoute} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}



const RecentsRoute = () => <Text style={styles.container}>Recents</Text>;

export default class BottmNav extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Donate', icon: 'charity' },
      { key: 'explore', title: 'Explore', icon: 'compass' },
      { key: 'profile', title: 'Me', icon: 'account' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeStackNav,
    explore: AlbumsNav,
    profile: RecentsRoute,
  });

  theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
    }
  }

  render() {
    return (
      <PaperProvider theme={this.theme}>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </PaperProvider>
    );
  }
}