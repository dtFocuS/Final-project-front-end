import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import CreateScreen from '../screens/CreateScreen'
import NotificationScreen from '../screens/NotificationScreen';
import { Platform, Dimensions } from 'react-native';
import { getPlatformOrientationLockAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';

// const MainNavigator = createStackNavigator({
//     Login: { screen: LoginScreen},
//     Home: { screen: HomeScreen },
//     Profile: { screen: ProfileScreen}

// });

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.83
}

const BottomTabNavigator = createBottomTabNavigator({
    Home: { screen: HomeScreen },
    Create: { screen: CreateScreen },
    Notification: { screen: NotificationScreen },
    Profile: { screen: ProfileScreen }
}, {
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: 'tomato',
        showLabel: false
    }
})

const AppSwitchNavigator = createSwitchNavigator({
    Welcome: { screen: WelcomeScreen},
    Login: { screen: LoginScreen},
    Signup: { screen: SignupScreen},
    Dashboard: { screen: BottomTabNavigator}

})


// const DrawerNavigator = createDrawerNavigator(
//     {
//         Account: { screen: BottomTabNavigator }
//     },
//     DrawerConfig
// )


const AppContainer = createAppContainer(BottomTabNavigator);

// class MainNavigator extends Component {


// }

export default AppContainer;