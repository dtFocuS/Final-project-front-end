import MenuDrawer from 'react-native-side-drawer'
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class Drawer extends Component {


    drawerContent = () => {
        return (
            <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
                <Text>Close</Text>
            </TouchableOpacity>
        );
    };


    render() {

        return(
            <View style={styles.container}>
                <Text>Hi</Text>
            </View>
                
         

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        zIndex: 0
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F04812'
    }
})

export default Drawer;