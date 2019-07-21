//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';



import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
//import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MainNavigator from './navigation/MainNavigator';

export default function App(props) {

  
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
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <MainNavigator />
      </View>
    );
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



