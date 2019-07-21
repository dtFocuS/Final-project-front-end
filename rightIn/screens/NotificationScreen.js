import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

class NotificationScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Ionicons name={'md-notifications-outline'} size={40} style={{ color: tintColor }} />

        }
    }

    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('jwt');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log(error.message)
        }
        
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Go to home"
                    onPress={() => this.getToken()}
                    // onPress={() => navigate('Home', { name: 'Danny' })}
                />

            </View>
            
        );
    }



}

export default NotificationScreen;