import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';


class AuthLoadingScreen extends Component {

    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('jwt');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'Dashboard' : 'Welcome');
    };

    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle='default' />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default AuthLoadingScreen;