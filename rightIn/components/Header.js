import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';


class Header extends Component {

    

    render() {
        const { navigate } = this.props.navigation;
        return(

            <View style={styles.container}>

                <Text style={styles.paragraph}>{this.props.tab}</Text>
            </View>


        );
    }



}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center'
    },
});

export default withNavigation(Header);