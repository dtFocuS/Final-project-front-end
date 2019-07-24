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
    token: null,
    userLocation: null,
    isReady: false,
    myParticipations: [],
    othersParticipations: []
  }
  // const [isLoadingComplete, setLoadingComplete] = useState(false);

  // if (!isLoadingComplete && !props.skipLoadingScreen) {
  //   return (
  //     <AppLoading
  //       startAsync={loadResourcesAsync}
  //       onError={handleLoadingError}
  //       onFinish={() => handleFinishLoading(setLoadingComplete)}
  //     />
  //   );
  // } else {
  // handleLogin = (user) => {
  //   this.setState({
  //     user: user
  //   })
  // }

  // componentDidMount() {
  //   this.getToken();
  // }

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
          })
        }
      })
  }

  getLocation = (location) => {
    this.setState({
      userLocation: location
    })
  }

  

  render() {
    const screenProps = {
      user: this.state.user,
      getLocation: this.getLocation,
      userLocation: this.state.userLocation
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
