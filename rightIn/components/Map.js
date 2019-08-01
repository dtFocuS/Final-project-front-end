import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import CustomHeader from './CustomHeader';
import ActivityMarker from './ActivityMarker';
import MyActivityMarker from './MyActivityMarker';
import MyParticipationMarker from './MyParticipationMarker';

class Map extends Component {
    // constructor() {
    //     super();
        
    // }
    state = {
        location: {
            latitude: 47.655548,
            longitude: -122.303200,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        userLocation: {
            latitude: 47.655548,
            longitude: -122.303200
        },
        errorMessage: null,
        activities: []
    };

    

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    // componentDidUpdate() {
    //     console.log(this.props.screenProps.otherUsers)
    // }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        let geocode = await Location.reverseGeocodeAsync(location.coords);
        //this.setState({location});
        this.setState(prevState => ({ 
            ...prevState,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: parseFloat((0.0922 * (width / height)).toFixed(5))
            },
            userLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        }), () => {
            // this.setState({
            //     activities: this.props.screenProps.otherActivities
            // })
            
            this.props.screenProps.getLocation(this.state.userLocation)
            this.props.screenProps.getAddress(geocode)
        });
    };

    render() {
        
        return (
            // <View style={{flex: 1}}>
                <React.Fragment>
                    <MapView
                        style={ styles.map }
                        provider={'google'}
                        region={this.state.location}
                    >
                    {
                        this.props.screenProps.notJoinedActivities?
                        this.props.screenProps.notJoinedActivities.map(activity => {
                            return <ActivityMarker key={activity.id} otherUsers={this.props.screenProps.otherUsers} handleJoin={this.props.screenProps.handleJoin} activity={activity} 
                            coordinate={{ latitude: activity.latitude, longitude: activity.longitude }}/>
                            
                        }) :null
                    }
                    {
                        this.props.screenProps.myActivities?
                        this.props.screenProps.myActivities.map(activity => {
                            return <MyActivityMarker key={activity.id} user={this.props.screenProps.user} activity={activity} coordinate={{ latitude: activity.latitude, longitude: activity.longitude }} handleModal={this.props.handleModal} editActivity={this.props.editActivity} deleteActivity={this.props.screenProps.deleteActivity} handleDeletePrompt={this.props.handleDeletePrompt}/>
                        }) : null
                    }
                    {
                        this.props.screenProps.joinedActivities?
                        this.props.screenProps.joinedActivities.map(activity => {
                            return <MyParticipationMarker key={activity.id} otherUserId={activity.user_id} activity={activity} coordinate={{ latitude: activity.latitude, longitude: activity.longitude }} />
                        }) :null
                    }
                    </MapView>
                
                <Text></Text>
            </React.Fragment>
            // </View>
            
          
        );
    }
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUD_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUD_DELTA + (width / height)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        // top: 84,
        flex: 1,
        
    }
});

export default Map;