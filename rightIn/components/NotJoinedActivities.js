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
import ActivityMarker from './ActivityMarker';


class NotJoinedActivities extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                {
                    this.props.notJoinedActivities.map(activity => {
                        return <ActivityMarker key={activity.id} otherUsers={this.props.otherUsers} handleJoin={this.props.handleJoin} activity={activity}
                            coordinate={{ latitude: activity.latitude, longitude: activity.longitude }} />

                    })

                }
            </React.Fragment>
            
            

        );

    }


}

export default NotJoinedActivities;