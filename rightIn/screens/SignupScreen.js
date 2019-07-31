import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';

const NGROK_URL = "http://04c049da.ngrok.io";
const URL = 'http://localhost:3000';

class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            image: '',
            email: ''
        };
    }

    onLogin = () => {
        const { firstname, lastname, username, password, email, image } = this.state;
        //this.props.navigation.navigate('Home')
        if (firstname === "" || lastname === "" || username === "" || password === "" || email === "") {
            Alert.alert('Please fill out all fields');
        } else {
            this.createUser();
        }

    }

    createUser = () => {
        const { firstname, lastname, username, password, email, image } = this.state;
        fetch(NGROK_URL +"/api/v1/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    password: password,
                    email: email
                }
            })
        })
        .then(resp => resp.json())
        .then(json => {
            this.loginNewUser();
        })
    }

    loginNewUser = () => {
        const { username, password } = this.state;
        //this.props.navigation.navigate('Dashboard');
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: { username, password } })
        })
        .then(res => res.json())
        .then(json => {
            //console.log('login:', json)
            if (json && json.jwt) {
                this.saveToken(json.jwt)
                this.props.navigation.navigate('Dashboard');
            } else {
                Alert.alert(json.message);
            }
        })

    }

    saveToken = async (jwt) => {
        try {
            await AsyncStorage.setItem('jwt', jwt);
        } catch (error) {
            console.log(error.message)
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.firstname}
                    onChangeText={(firstname) => this.setState({ firstname })}
                    placeholder={'First Name'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.lastname}
                    onChangeText={(lastname) => this.setState({ lastname })}
                    placeholder={'Last Name'}
                    style={styles.input}
                />
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
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Email'}
                    style={styles.input}
                />

                <Button
                    title={'Sign up'}
                    style={styles.input}
                    onPress={this.onLogin}
                />
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

export default SignupScreen;