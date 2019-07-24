import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Header from './Header';
import ActivityMarker from './ActivityMarker';

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

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
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
            this.setState({
                activities: this.props.activities
            })
            this.props.screenProps.getLocation(this.state.userLocation)
        });
    };

    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            
            text = JSON.stringify(this.state.location);
        }

        return (
            // <View style={{flex: 1}}>
                <React.Fragment>
                    <MapView
                        style={{ flex: 1 }}
                        provider={'google'}
                        region={this.state.location}
                    >
                    {
                        this.state.activities.map(activity => {
                            return <ActivityMarker key={activity.id} activity={activity} coordinate={{ latitude: activity.latitude, longitude: activity.longitude }}/>
                            
                        })
                    }
                    {/* <Marker
                        coordinate={this.state.userLocation}
                        pinColor={"blue"}
                    /> */}
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
});

export default Map;