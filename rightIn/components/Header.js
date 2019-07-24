import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import Drawer from './Drawer'



class Header extends Component {

    state = {
        isVisible: false
    }

    handleOverlay = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View>
                <View style={styles.container}>
                    
                    <View style={{ alignSelf: 'flex-start' }}>

                    </View>
                    <View style={{ alignSelf: 'center', paddingLeft: 60 }}>
                        <Text style={styles.paragraph}>{this.props.tab}</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-end', paddingRight: 20}}>
                        <TouchableOpacity onPress={this.handleOverlay}>
                            <Image
                                source={{ uri: 'https://images.pexels.com/photos/1669072/pexels-photo-1669072.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }}
                                style={styles.image}

                            />
                        </TouchableOpacity>

                    </View>
                    
                </View>
                <Overlay
                    isVisible={this.state.isVisible}
                    //onBlur={() => {this.setState({isVisible: false})}}
                >
                    <Button title={'Close'} onPress={this.handleOverlay}></Button>
                </Overlay>
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
        textAlign: 'center',
        color: 'tomato'
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