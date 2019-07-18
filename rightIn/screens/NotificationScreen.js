import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

class NotificationScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Ionicons name={'md-notifications-outline'} size={40} style={{ color: tintColor }} />

        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Create"
                onPress={() => navigate('Home', { name: 'Danny' })}
            />
        );
    }



}

export default NotificationScreen;