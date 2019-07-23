import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';


class Header extends Component {

    

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View>
                <View style={styles.container}>
                    
                    <Text style={styles.paragraph}>{this.props.tab}</Text>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#ecf0f1'}}>
                    <Button style={styles.button} title={'profile'}></Button>
                </View>
                
            </View>
            


        );
    }



}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row'
    },
    paragraph: {
        //margin: 24,
        fontSize: 36,
        //textAlign: 'center',
        fontFamily: 'Lobster'
    },
    button: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'flex-start'
    }
});

export default withNavigation(Header);