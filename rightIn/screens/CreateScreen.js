import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

class CreateScreen extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Ionicons name={'ios-create'} size={40} style={{ color: tintColor }} />

        }
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
        };
    }

    onLogin = () => {
        const { username, password } = this.state;
        this.props.navigation.navigate('Dashboard');

        //Alert.alert('Credentials', `${username} + ${password}`);
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                {/* <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={'Name'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Description'}
                    secureTextEntry={true}
                    style={styles.input}
                /> */}
                <Input
                    inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}
                    placeholder='INPUT WITH CUSTOM ICON'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />
               
                <Input
                    inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}
                    placeholder='INPUT WITH CUSTOM ICON'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Button
                    icon={
                        <Icon
                            name="heartbeat"
                            size={15}
                            color="white"
                        />
                    }
                    title="Create"
                />
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

export default CreateScreen;