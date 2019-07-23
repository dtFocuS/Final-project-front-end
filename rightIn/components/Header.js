import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class Header extends Component {

    

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View>
                <View style={styles.container}>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Image
                            source={{ uri: 'https://images.pexels.com/photos/1669072/pexels-photo-1669072.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }}
                            style={styles.image}
                        />
                    </View>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.paragraph}>{this.props.tab}</Text>
                    </View>
                    <View style={{ flex: 1, paddingRight: 10 }}>

                    </View>
                </View>
                
            </View>
            


        );
    }



}

const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        justifyContent: 'space-between',
        //paddingTop: 35,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row'
    },
    paragraph: {
        //margin: 24,
        fontSize: 25,
        //textAlign: 'center',
        fontFamily: 'Lobster',
        textAlign: 'center'
    },
    button: {
        alignSelf: 'flex-start',
        paddingLeft: 15,
        paddingBottom: 5
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderWidth: 2,
        borderColor: "white"
    }
});

export default withNavigation(Header);