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

    state = {
        activites:[]
    }

    componentDidMount() {
        this.loadActivities();
    }

    loadActivities = () => {
        fetch('http://localhost:3000/api/v1/activities')
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                activites: json
            })
        })
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
                <Map screenProps={this.props.screenProps} activities={this.state.activites}/>
            </View>

            
            
            
        );
    }


}

export default HomeScreen;