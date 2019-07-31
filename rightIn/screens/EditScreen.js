import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

// Can be deleted later

class EditScreen extends Component {

    showParams = () => {
        console.log(this.props.navigation.state.params)
    }
    
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                    <Text>Open Drawer</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Settings</Text>
                {
                    this.showParams()
                }
            </View>
        )
    }



}

export default withNavigation(EditScreen);