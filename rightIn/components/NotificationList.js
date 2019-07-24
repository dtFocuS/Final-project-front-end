import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
//import { Input, Button, Card, Avatar } from 'react-native-elements';
import NotificationCard from './NotificationCard';


class NotificationList extends Component {


    render() {

        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.notifications.map(notification => {
                        return <NotificationCard key={notification.id} notification={notification} otherUsers={this.props.otherUsers}/>
                    })
                }

            </View>
            

        );
    }

}

export default NotificationList;