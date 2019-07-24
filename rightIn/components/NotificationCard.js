import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar } from 'react-native-elements';


class NotificationCard extends Component {


    render(){

        return(
            <View style={ {flex: 1}}>
                <Card>
                    <Avatar 
                        rounded
                        size='medium'
                        source={{ uri: 'https://images.pexels.com/photos/2662123/pexels-photo-2662123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                    ></Avatar>
                    <Text>Hi</Text>

                </Card>
            </View>

        );
    }

}

export default NotificationCard;