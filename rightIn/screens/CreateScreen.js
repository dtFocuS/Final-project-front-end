import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Header from '../components/Header';
import { withNavigation } from 'react-navigation';

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
            isFocused: false
        };
    }

    handleFocus = (event) => {
        this.setState({
            isFocused: true
        })

    }

    handleBlur = (event) => {
        this.setState({
            isFocused: false
        })

    }

    createActivity = () => {
        const user_id = this.props.navigation.dangerouslyGetParent().getParam('user_id');
        const { name, description } = this.state;
         if (this.state.name === "" || this.state.description === "") {
            Alert.alert('Please fill out all fields.')
         } else {
             fetch('http://localhost:3000/api/v1/activities', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ activity: { name, description, user_id: user_id } })
             })
             .then(resp => resp.json())
             .then(json => {
                 this.props.navigation.navigate('Home');
             })
            
         }

        //Alert.alert('Credentials', `${username} + ${password}`);
    }

    render() {
        const BLUE = "#428AF8";
        const LIGHT_GRAY = "#D3D3D3";
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Header tab={'Create Activity'}/>
                <TextInput
                    value={this.state.username}
                    onChangeText={(name) => this.setState({ name })}
                    selectionColor={BLUE}
                    placeholder={'Name'}
                    style={styles.input}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    borderBottomColor={this.state.isFocused? BLUE : LIGHT_GRAY}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(description) => this.setState({ description })}
                    selectionColor={BLUE}
                    placeholder={'Description'}
                    style={styles.input}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    borderBottomColor={this.state.isFocused ? BLUE : LIGHT_GRAY}
                />
                {/* <Input
                    inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}
                    placeholder='INPUT WITH CUSTOM ICON'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                /> */}
               
                {/* <Input
                    inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}
                    placeholder='INPUT WITH CUSTOM ICON'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                /> */}

                <Button
                    icon={
                        <Icon
                            name="heartbeat"
                            size={15}
                            color="white"
                        />
                    }
                    onPress={this.createActivity}
                    title="Create"
                />
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    input: {
        //width: 200,
        height: 44,
        paddingLeft: 10,
        borderBottomWidth: 1,
        // borderColor: 'black',
        //borderBottomColor: 'gray',
        marginBottom: 10,
    },
});

export default withNavigation(CreateScreen);