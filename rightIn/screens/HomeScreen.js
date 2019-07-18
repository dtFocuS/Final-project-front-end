import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';



class HomeScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Ionicons name={'md-home'} size={40} style={{ color: tintColor}} />
            
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style={{flex: 1}}>
                <Button
                    title="Go to Profile"
                    onPress={() => navigate('Profile', { name: 'Danny' })}
                />

            </View>
            
        )
    }


}

export default HomeScreen;