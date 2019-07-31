import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import CustomHeader from '../components/CustomHeader';
import { withNavigation } from 'react-navigation';
import { DatePicker } from 'native-base';


const NGROK_URL = "http://04c049da.ngrok.io";
const URL = 'http://localhost:3000';

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
            isFocused: false,
            user_id: this.props.screenProps.user.id,
            latitude: this.props.screenProps.userLocation.latitude,
            longitude: this.props.screenProps.userLocation.longitude,
            
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
        //const user_id = this.props.navigation.dangerouslyGetParent().getParam('user_id');
        console.log(this.props.screenProps.userLocation)
        const { name, description, user_id, latitude, longitude } = this.state;
         if (this.state.name === "" || this.state.description === "") {
            Alert.alert('Please fill out all fields.')
         } else {
             fetch(NGROK_URL + '/api/v1/activities', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ activity: { name, description, user_id, latitude, longitude} })
             })
             .then(resp => resp.json())
             .then(json => {
                 this.props.screenProps.handleCreate(json);
                 this.props.navigation.navigate('Home');
             })
            
         }

        //Alert.alert('Credentials', `${username} + ${password}`);
    }

    editActivity = () => {
        console.log(this.props.navigation.getParam('name'))
        console.log(this.props.navigation.getParam('description'))
        if (this.props.navigation.state.params) {
            this.setState({
                name: this.props.navigation.getParam('name'),
                description: this.props.navigation.getParam('description')
            })
        }
    }

    

    

    render() {
        const BLUE = "#428AF8";
        const LIGHT_GRAY = "#D3D3D3";
        const { navigate } = this.props.navigation;

        // const today = new Date();
        // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const { show, date, mode } = this.state;
        return(
            <View style={styles.container}>
                <CustomHeader tab={'Create Activity'} user={this.props.screenProps.user}/>
                <TextInput
                    value={this.state.username}
                    onChangeText={(name) => this.setState({ name })}
                    selectionColor={'tomato'}
                    placeholder={'Name'}
                    style={styles.input}
                    // onFocus={this.handleFocus}
                    // onBlur={this.handleBlur}
                    borderBottomColor={this.state.isFocused? BLUE : LIGHT_GRAY}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(description) => this.setState({ description })}
                    selectionColor={'tomato'}
                    placeholder={'Description'}
                    style={styles.input}
                    // onFocus={this.handleFocus}
                    // onBlur={this.handleBlur}
                    borderBottomColor={this.state.isFocused ? BLUE : LIGHT_GRAY}
                />
                
                {/* <DatePicker
                    defaultDate={new Date(today.getFullYear(), today.getMonth(), today.getDate())}
                    minimumDate={new Date(today.getFullYear(), today.getMonth(), today.getDate())}
                    maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                    disabled={false}
                /> */}
                

                <Button
                    fontFamily='Lobster'
                    onPress={this.createActivity}
                    buttonStyle={styles.button}
                    titleStyle={{fontFamily: 'Lobster'}}
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
    button: {
        borderRadius: 80,
        //backgroundColor: 'tomato',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: 180,
        alignSelf: 'center',
    }
});

export default withNavigation(CreateScreen);