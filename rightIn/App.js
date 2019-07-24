//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';



import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MainNavigator from './navigation/MainNavigator';

class App extends Component {

  state = {
    user: null,
    otherUsers: [],
    token: null,
    userLocation: null,
    isReady: false,
    allParticipations: [],
    notifications: []
  }


  async componentWillMount() {
    this.getToken();
    await Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
        'Acme': require('./assets/fonts/Acme-Regular.ttf'),
        'Kaushan Script': require('./assets/fonts/KaushanScript-Regular.ttf')
      })
    ]);
    this.setState({ isReady: true })
  }

  loadNotifications = () => {
    if (this.state.user) {
      const temp = [];
      //const participations = this.state.participations.slice()
      this.state.user.activities.forEach(activity => {
        for (const participation of activity.participations) {
          temp.push(participation)
        }
      })
      this.setState({
        notifications: temp
      })
    }
  }

  loadAllParticipations = () => {
    fetch('http://localhost:3000/api/v1/participations')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        allParticipations: json
      })
    })
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('jwt');
        if (value !== null) {
          // We have data!!
          this.setState({
            token: value
          }, () => {this.getUser(value)})
        }
    } catch (error) {
      // Error retrieving data
      console.log(error.message)
    }
  }

  getUser = (token) => {
    //let token = this.getToken()
    fetch('http://localhost:3000/api/v1/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          this.setState({ user: json.user}, () => {
            //console.log(this.state.user)
            this.loadOtherUsers();
            this.loadNotifications();
          })
        }
      })
  }

  getLocation = (location) => {
    this.setState({
      userLocation: location
    })
  }

  loadOtherUsers = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      const otherUsers = users.filter(user => user.id != this.state.user.id)
      this.setState({
        otherUsers: otherUsers
      }, () => {console.log(this.state.otherUsers)})
    })
  }

  

  render() {
    const screenProps = {
      user: this.state.user,
      getLocation: this.getLocation,
      userLocation: this.state.userLocation,
      notifications: this.state.notifications,
      otherUsers: this.state.otherUsers
    }

    if (!this.state.isReady) {
      return(
        <Text>Loading</Text>
      );
    } else {
      return(
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <MainNavigator screenProps={screenProps} />
        </View>
      );
    }

  }
    
  // }
}



// async function loadResourcesAsync() {
  
// }

// function handleLoadingError(error: Error) {
//   // In this case, you might want to report the error to your error reporting
//   // service, for example Sentry
//   console.warn(error);
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: -5,
  },
});


export default App;
