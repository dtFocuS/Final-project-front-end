import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class CreateScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Ionicons name={'ios-create'} size={40} style={{ color: tintColor }} />

        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={{ flex: 1 }}>
                <Button
                    title="Create"
                    onPress={() => navigate('Home', { name: 'Danny' })}
                />
            </View>
            
        );
    }



}

export default CreateScreen;