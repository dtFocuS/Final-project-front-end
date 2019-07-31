import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Input, Button, Card, Avatar, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';


class EditActivity extends Component {


    close = () => {
        this.props.closeEdit();
        this.props.handleClose();
        
    }

    render() {
        return(
            <View style={{ flex: 1}}>
                <Input>
                </Input>
                <Button
                    title="close"
                    onPress={this.close }
                />

            
            </View>


        );
    }



}

export default EditActivity;