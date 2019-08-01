import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignUpScreen';
import CreateScreen from '../screens/CreateScreen'
import NotificationScreen from '../screens/NotificationScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import EditScreen from '../screens/EditScreen';
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
    Profile: { screen: ProfileScreen },
    }, {
        
        tabBarOptions: {
            activeTintColor: 'tomato',
            showLabel: false
        }
})

// const AppStackNavigator = createStackNavigator({
//     Dashboard: { screen: BottomTabNavigator}
// })
// const DrawerNavigator = createDrawerNavigator(
//     {
//         Dashboard: { screen: BottomTabNavigator,
//         navigationOptions: {
//             drawerLockMode: 'locked-closed'
//         }
//     }
//     },
//     {
//         contentComponent: EditScreen,
//         drawerPosition: 'right'
//     }
// )





const AppSwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: { screen: AuthLoadingScreen },
        Welcome: { screen: WelcomeScreen },
        Login: { screen: LoginScreen},
        Signup: { screen: SignupScreen},
        // Edit: { screen: DrawerNavigator },
        Dashboard: { screen: BottomTabNavigator},
        
    },
    {
        initialRouteName: 'AuthLoading'
    }
)




// const DrawerNavigator = createDrawerNavigator(
//     {
//         Account: { screen: BottomTabNavigator }
//     },
//     DrawerConfig
// )


const AppContainer = createAppContainer(AppSwitchNavigator);

// class MainNavigator extends Component {


// }

export default AppContainer;