import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TextInput, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { SplashScreen } from 'expo';
import { BottomNavigation } from 'react-native-paper'; 
import { render } from 'react-dom';
import BottmNav from './BottmNav'

const Stack = createStackNavigator(); 
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
    React.useEffect(() => {
      if (route.params?.post) {

      }
    }, [route.params?.post]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button 
          title="Go to Details"
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 88,
              other: "bla",
            });
          }}/>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="To Root"
        onPress={() => navigation.navigate('Root', {
          screen: 'CreatePost',
          params: {
            screen: 'Details'
          },
        })}
      />
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { other } = route.params;

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>itemId: {itemId}</Text>
      <Text>other: {other}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')} 
      />
      <Button
        title="Go to Details...again"
        onPress={() => navigation.push('Details', {
          itemId: 993939,
        })} 
      />
      <Button
        title="Go back to first screen"
        onPress={() => navigation.popToTop()} 
      />
    </View>
  )
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate('Home', {post: postText})
        }}
      />
      <Button 
          title="Go to Details"
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 88,
              other: "bla",
            });
          }}/>
    </>
  )
}

function Root() {
  if (state.isLoading) {
    return <SplashScreen />
  }

  return (
    <Stack.Navigator>{
      isSignedIn ? (
        <>
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )
      }
      
    </Stack.Navigator>
  )
}



export default function App() {
  return <BottmNav />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
