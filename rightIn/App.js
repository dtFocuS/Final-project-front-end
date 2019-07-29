//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MainNavigator from './navigation/MainNavigator';
import { TouchableHighlight } from 'react-native-gesture-handler';

const NGROK_URL = "https://8f7765e6.ngrok.io";

class App extends Component {

  state = {
    user: null,
    otherUsers: [],
    token: null,
    userLocation: null,
    isReady: false,
    allParticipations: [],
    myParticipations: null,
    joinedActivities: null,
    notifications: [],
    allActivities: [],
    otherActivities: [],
    myActivities: [],
    newCreated: null,
    notJoinedActivities: null
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
    fetch(NGROK_URL + '/api/v1/participations')
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
    fetch(NGROK_URL + '/api/v1/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          console.log(token)
          this.setState({ user: json.user}, () => {
            console.log('get user: ', json.user.id)
            this.loadOtherUsers();
            this.loadNotifications();
            this.loadAllParticipations();
            this.loadAllActivities();
            
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
    fetch(NGROK_URL + '/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      const otherUsers = users.filter(user => user.id != this.state.user.id)
      this.setState({
        otherUsers: otherUsers
      })
    })
  }

  loadAllActivities = () => {
    fetch(NGROK_URL + '/api/v1/activities')
    .then(resp => resp.json())
    .then(activities => {
      this.setState({
        allActivities: activities
      }, () => {
        this.loadOtherActivities();
        this.loadMyActivities();
        this.loadJoinedActivity();
      })
    })
  }

  loadOtherActivities = () => {
    if (this.state.user) {
      fetch(NGROK_URL + "/api/v1/others_activities/" + this.state.user.id)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          otherActivities: json
        })
      })
    }
    
  }

  loadMyActivities = () => {
    if (this.state.allActivities) {
      const myActivities = this.state.allActivities.filter(activity => activity.user_id === this.state.user.id)
      this.setState({
        myActivities: myActivities
      })
    }
  }

  handleJoin = (joinedActivity) => {
    console.log(joinedActivity)
    const temp = this.state.user.activities.filter(activity => activity.id === joinedActivity.id)
    if (temp.length === 0) {
      this.createParticipation(joinedActivity.id);
    }
  }

  createParticipation = (activityId) => {
    fetch(NGROK_URL + '/api/v1/participations', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ participation: { user_id: this.state.user.id, activity_id: activityId} })
    })
    .then(resp => resp.json())
    .then(json => {
      this.getToken()
    })
  }

  handleCreate = (newActivity) => {
    this.setState({
      newCreated: newActivity
    }, () => {
        this.loadMyActivities();
    })
    
  }

  handleGetToken = () => {
    this.getToken();
  }

  loadJoinedActivity = () => {
    fetch(NGROK_URL + "/api/v1/my_joined_activities/" + this.state.user.id)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        joinedActivities: json
      }, () => {this.otherNotJoinedActivity()})
    })
  }

  otherNotJoinedActivity = () => {
    fetch(NGROK_URL + "/api/v1/other_not_joined_activities/" + this.state.user.id)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        notJoinedActivities: json
      })
    })
  }


  
 

  

  render() {
    const screenProps = {
      user: this.state.user,
      getLocation: this.getLocation,
      userLocation: this.state.userLocation,
      notifications: this.state.notifications,
      otherUsers: this.state.otherUsers,
      allActivities: this.state.allActivities,
      handleJoin: this.handleJoin,
      otherActivities: this.state.otherActivities,
      myActivities: this.state.myActivities,
      handleCreate: this.handleCreate,
      handleGetToken: this.handleGetToken,
      joinedActivities: this.state.joinedActivities,
      notJoinedActivities: this.state.notJoinedActivities
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
