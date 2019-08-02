import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



class WelcomeScreen extends Component {
    static navigationOptions = {
       
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>rightIn</Text>
                <Button
                    title="Login"
                    onPress={() => navigate('Login')}
                />
                <Button
                    title="Sign up"
                    onPress={() => navigate('Signup', { name: 'Danny' })}
                />

            </View>


        );
    }



}

const styles = StyleSheet.create({
    title: {
        fontSize: 120,
        fontFamily: 'Lobster',
        color: 'tomato'
    },
})

export default WelcomeScreen;