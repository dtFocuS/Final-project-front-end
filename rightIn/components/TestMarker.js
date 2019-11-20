
import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import OthersActivityDetail from './OthersActivityDetail';
import { Toast } from 'native-base';
//import climb from '../assets/climb';
import SmallProfilePic from './SmallProfilePic';

const NGROK_URL = "http://bb19ca29.ngrok.io";
const URL = 'https://rightin-backend.herokuapp.com';

function TestMarker(props) {

    return(

        <View>
            <Marker
                coordinate={props.coordinate}
                pinColor={"red"}
            >

            </Marker>
        </View>

    )

}

export default TestMarker;