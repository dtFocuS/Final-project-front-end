import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import NotificationList from '../components/NotificationList'

class NotificationScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Ionicons name={'md-notifications-outline'} size={40} style={{ color: tintColor }} />

        }
    }

    

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={ { flex: 1 } }>
                <CustomHeader tab={'Notification'} user={this.props.screenProps.user}/>
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.props.screenProps.notifications ? <NotificationList allActivities={this.props.screenProps.allActivities} otherUsers={this.props.screenProps.otherUsers} notifications={this.props.screenProps.notifications} /> : null
                    }
                </ScrollView>

            </View>
            
            
        );
    }



}

export default NotificationScreen;