import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import CustomHeader from '../components/CustomHeader'


class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name={'user'} size={40} style={{ color: tintColor }} />

        }
    }

    // logout = () => {
    //     //this.clearToken();
    //     this.props.navigation.navigate('Welcome')
    // }

    clearToken = async () => {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Welcome')
            
        } catch (error) {
            console.log(error.message)
        }
    };

    // _signOutAsync = async () => {
    //     await AsyncStorage.clear();
    //     this.props.navigation.navigate('Welcome');
    // };


    render() {
        //const { navigate } = this.props.navigation;
        return (
            <View style={ styles.container }>
                <CustomHeader tab={'Profile'} user={this.props.screenProps.user}/>
                <Button
                    title="Log out"
                    onPress={this.clearToken}
                />

            </View>
            
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: '#ecf0f1',
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

export default withNavigation(ProfileScreen);