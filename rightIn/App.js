//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Root, Toast } from "native-base";

import MainNavigator from './navigation/MainNavigator';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ActivityType } from 'expo-location';

const NGROK_URL = "http://4a31226a.ngrok.io";
const URL = 'http://localhost:3000';

class App extends Component {

  state = {
    user: null,
    otherUsers: [],
    token: null,
    userLocation: null,
    isReady: false,
    allParticipations: [],
    myParticipations: [],
    joinedActivities: [],
    notifications: [],
    allActivities: [],
    otherActivities: [],
    myActivities: [],
    newCreated: null,
    notJoinedActivities: [],
    address: null
    // selectedParticipants: []
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
    fetch(URL + '/api/v1/participations')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        allParticipations: json
      }, () => this.loadMyParticipations())
    })
  }

  loadMyParticipations = () => {
    //const participations = this.state.allParticipations.filter(participation => participation.user_id === this.state.user.id)
    this.setState(prevState => ({
      myParticipations: prevState.allParticipations.filter(participation => participation.user_id === this.state.user.id)
    }))
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
    fetch(URL + '/api/v1/profile', {
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
            // this.loadMyActivities();
            this.loadJoinedActivity();
            
          })
        }
      })
  }

  getLocation = (location) => {
    this.setState({
      userLocation: location
    })
  }

  getAddress = (address) => {
    let target = address[0].name + ", " + address[0].city + ", " + address[0].region + " " + address[0].postalCode
    console.log(target)
    this.setState({
      address: target
    })
  }

  loadOtherUsers = () => {
    fetch(URL + '/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      const otherUsers = users.filter(user => user.id != this.state.user.id)
      this.setState({
        otherUsers: otherUsers
      })
    })
  }

  loadAllActivities = () => {
    fetch(URL + '/api/v1/activities')
    .then(resp => resp.json())
    .then(activities => {
      this.setState({
        allActivities: activities
      }, () => {
        this.loadOtherActivities();
        this.loadMyActivities();
        // this.loadJoinedActivity();
      })
    })
  }

  loadOtherActivities = () => {
    if (this.state.user) {
      fetch(URL + "/api/v1/others_activities/" + this.state.user.id)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          otherActivities: json
        })
      })
    }
    
  }

  loadMyActivities = () => {
    if (this.state.user) {
      //const myActivities = this.state.allActivities.filter(activity => activity.user_id === this.state.user.id)
      this.setState({
        myActivities: this.state.user.activities
      })
    }
  }

  handleJoin = (joinedActivity) => {
    Toast.show({
      text: "You rightIn " + joinedActivity.name + "!",
      buttonText: "Okay",
      position: 'top',
      duration: 3000,
      textStyle: { color: 'tomato'}
    })
    console.log(joinedActivity)
    const temp = this.state.user.activities.filter(activity => activity.id === joinedActivity.id)
    if (temp.length === 0) {
      this.createParticipation(joinedActivity.id);
    }
  }

  createParticipation = (activityId) => {
    // const temp = this.state.notJoinedActivities.filter(target => target.id === activityId.to_i)
    // const temp2 = this.state.joinedActivities.slice();
    // temp2.push(temp[0]);
    // this.setState({
    //   notJoinedActivities: temp,
    //   joinedActivities: temp2,

    //})
    fetch(URL + '/api/v1/participations', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ participation: { user_id: this.state.user.id, activity_id: activityId} })
    })
    .then(resp => resp.json())
    .then(json => {
      // this.getToken()
      const { participation } = json
      const temp = this.state.notJoinedActivities.filter(target => target.id === parseInt(activityId, 10))
      const temp2 = this.state.joinedActivities.slice();
      // console.log('temp2', temp2)
      //console.log('temp', temp)
      // temp2.push(temp[0]);
      this.setState(prevState => ({
        notJoinedActivities: prevState.notJoinedActivities.filter(target => target.id !== parseInt(activityId, 10)),
        // joinedActivities: temp2,
        joinedActivities: [...prevState.joinedActivities, temp[0]],
        allParticipations: [...prevState.allParticipations, participation],
        myParticipations: [...prevState.myParticipations, participation]
        
      }), () => {console.log(this.state.myParticipations)})
      
    })
  
  }

  handleCreate = (newActivity) => {
    console.log(newActivity)
    const { activity } = newActivity;
    // console.log(this.state.myActivities)
    // this.setState({
    //   newCreated: newActivity
    // }, () => {
    //     this.getToken();
    // })
    const temp = this.state.myActivities.slice();
    //temp.push(activity)
    this.setState(prevState => ({
      myActivities: [...prevState.myActivities, activity]
    }))
    
  }

  handleGetToken = () => {
    this.getToken();
  }

  loadJoinedActivity = () => {
    fetch(URL + "/api/v1/my_joined_activities/" + this.state.user.id)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        joinedActivities: json
      }, () => {this.otherNotJoinedActivity()})
    })
  }

  otherNotJoinedActivity = () => {
    fetch(URL + "/api/v1/other_not_joined_activities/" + this.state.user.id)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        notJoinedActivities: json
      })
    })
  }

  editActivity = (activity) => {
    const { id, name, description, latitude, longitude } = activity;
    console.log(latitude)
    fetch(URL + "/api/v1/activities/" + id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ activity: { name: name, description: description, latitude: latitude, longitude: longitude}})
    })
    .then(resp => resp.json())
    .then(json => {
      const { activity } = json
      // console.log(activity)
      const temp = this.state.myActivities.filter(target => target.id !== activity.id)
      temp.push(activity)
      // console.log(temp)
      this.setState(prevState => ({
        myActivities: temp
      }))
    })
  
  }

  deleteActivity = (activity) => {
    console.log('delete act', activity)
    // const temp = this.state.myActivities.filter(target => target.id !== activity.id)
    // this.setState({
    //   myActivities: temp
    // })
   
    const temp = this.state.myActivities.filter(target => target.id !== activity.id)
    console.log(temp)
    // this.setState(prevState => {
    //   myActivities: prevState.myActivities.filter(target => target.id !== activity.id)
    // })
    fetch(URL + "/api/v1/activities/" + activity.id, {
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(json => {
      
      this.setState(prevState => ({
        myActivities: prevState.myActivities.filter(target => target.id !== activity.id)
      }))
    })
  
  }

  handleUnJoin = (activity) => {
    // this.loadAllParticipations();
    //const participation = activity.participations.filter(participation => participation.user_id === this.state.user.id)
    // console.log(participation[0].id)
    // this.setState(prevState => ({
    //   joinedActivities: prevState.joinedActivities.filter(target => target.id !== activity.id),
    //   // joinedActivities: temp2,
    //   notJoinedActivities: [...prevState.notJoinedActivities, activity]

    // }), () => console.log(this.state.joinedActivities))
    const temp = this.state.myParticipations.slice();
    console.log('before',this.state.notJoinedActivities)
    const participation = this.state.myParticipations.filter(participation => participation.activity_id === parseInt(activity.id))
    //const participation = participations.filter(target => target.activity_id === parseInt(activity.id, 10))
    fetch(URL + "/api/v1/participations/" + participation[0].id, {
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(json => {
      // const temp = this.state.joinedActivities.filter(target => target.id !== activity.id)
      // const temp2 = this.state.notJoinedActivities.slice();
      // temp2.push(activity)
      this.setState(prevState => ({
        notJoinedActivities: [...prevState.notJoinedActivities, activity],
        joinedActivities: prevState.joinedActivities.filter(target => target.id !== parseInt(activity.id)),
        // joinedActivities: temp2,
        
        myParticipations: prevState.myParticipations.filter(participation => participation.activity_id !== activity.id)
        //allParticipations: prevState.allParticipations.filter(target => target.id !== parseInt(participation[0].id))

      }), () => console.log('after',this.state.notJoinedActivities))

    })

  }

  // loadParticipants = (activity_id) => {
  //   fetch(NGROK_URL + '/api/v1/participants/' + activity_id)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     this.setState({
  //       selectedParticipants: json
  //     }, () => {console.log(this.state.selectedParticipants.length)})
  //   })
  // }



  
 

  

  render() {
    // console.log('render fires')
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
      notJoinedActivities: this.state.notJoinedActivities,
      editActivity: this.editActivity,
      getAddress: this.getAddress,
      address: this.state.address,
      deleteActivity: this.deleteActivity,
      handleUnJoin: this.handleUnJoin
      // loadParticipants: this.loadParticipants,
      // selectedParticipants: this.state.selectedParticipants
    }

    if (!this.state.isReady) {
      return(
        <Text>Loading</Text>
      );
    } else {
      return(
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Root>
            <MainNavigator screenProps={screenProps} />
          </Root>
          
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
