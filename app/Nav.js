import React from 'react'
import { DefaultTheme, Provider as PaperProvider ,BottomNavigation } from 'react-native-paper';

import HomeStackNav from './components/HomeStackNav'
import ExploreStackNav from './components/ExploreStackNav'
import ProfileStackNav from './components/ProfileStackNav'

export default class Nav extends React.Component {
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
      explore: ExploreStackNav,
      profile: ProfileStackNav,
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
            //activeColor={this.theme.colors.primary}
            //inactiveColor={'white'}
            //barStyle={{backgroundColor: 'white'}}
          />
        </PaperProvider>
      );
    }
}