import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import NotificationList from '../components/NotificationList'

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
            <View style={ { flex: 1 } }>
                <Header tab={'Notification'} />
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.props.screenProps.notifications ? <NotificationList otherUsers={this.props.screenProps.otherUsers} notifications={this.props.screenProps.notifications} /> : null
                    }
                </ScrollView>

            </View>
            
            
        );
    }



}

export default NotificationScreen;