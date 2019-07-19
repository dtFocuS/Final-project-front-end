import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MapView } from 'react-native-maps';
import Map from '../components/Map'
import Header from '../components/Header';


class HomeScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Ionicons name={'md-home'} size={40} style={{ color: tintColor}} />
            
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return(
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
            //     <Button
            //         title="Go to Profile"
            //         onPress={() => navigate('Profile', { name: 'Danny' })}
            //     />

            // </View>
            <View style={{flex: 1}}>
                <Header tab={'Home'}/>
                <Map />
            </View>

            
            
            
        );
    }


}

export default HomeScreen;