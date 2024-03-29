import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet, Text, AsyncStorage } from 'react-native';
//import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
const NGROK_URL = "http://bb19ca29.ngrok.io";
const URL = 'https://rightin-backend.herokuapp.com';


class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loaded: false
        };
    }

    onLogin = () => {
        const { username, password } = this.state;
        //this.props.navigation.navigate('Dashboard');
        if (username === "" || password === "") {
            Alert.alert('Invalid username or password!')
        } else {
            //this.props.screenProps.handleLogin({username: username, password: password});
            fetch(URL + '/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: { username, password } })
            })
            .then(res => res.json())
            .then(json => {
                console.log('login user id:', json.user.id)
                if (json && json.jwt) {
                    //this.props.screenProps(json.user);
                    this.saveToken(json.jwt)
                    this.props.screenProps.handleGetToken();
                    this.props.navigation.navigate('Dashboard', { user_id: json.user.id });
                } else {
                    Alert.alert(json.message);
                }
            })
        }
        // Alert.alert('Credentials', `${username} + ${password}`);
    }

    saveToken = async (jwt) => {
        try {
            await AsyncStorage.setItem('jwt', jwt);
        } catch (error) {
            console.log(error.message)
        }
    };

    // getToken = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('jwt');
    //         if (value !== null) {
    //             // We have data!!
    //             //console.log(value);
    //             //this.setState({ loaded: true })
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //         //console.log(error.message)
    //         //this.setState({ loaded: false })
    //     }

    // }



    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={{fontFamily: 'Lobster', fontSize:50, marginBottom: 20, color: 'tomato'}}>Login</Text>
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <Button
                    title={'Login'}
                    //buttonStyle={}
                    type='clear'
                    onPress={this.onLogin}
                />
                <View style={{flexDirection: 'row'}}>
                    <Text>Don't have an account?</Text>
                    <Button 
                        title={'Sign up!'} 
                        type="clear"
                        titleStyle={{fontSize: 20}}
                        onPress={() => navigate('Signup')}
                    />
                </View>
                
            </View>
        );
        
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});

export default LoginScreen;