import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'user'} size={40} style={{ color: tintColor }} />

        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Button
                    title="Go to Home"
                    onPress={() => navigate('Home', { name: 'Danny' })}
                />

            </View>
            
        )
    }


}

export default ProfileScreen;