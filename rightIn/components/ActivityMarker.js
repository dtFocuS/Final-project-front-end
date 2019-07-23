import React, { Component } from 'react';
import MapView, { CalloutSubview, Marker, Callout } from 'react-native-maps'
//import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableHighlight, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
//import climb from '../assets/climb';



class ActivityMarker extends Component {

    state = {
        isClicked: false,
        joined: false
    }

    handlePress = () => {
        this.setState({
            joined: true
        })
        //console.log('clicked')
    }

    render() {
        const verified_icon = 'https://www.pinclipart.com/picdir/middle/59-595548_1495368559287-copy-instagram-verified-badge-png-clipart.png';

        return(
            <Marker
                coordinate={this.props.coordinate}
                pinColor={this.state.joined? 'blue': "red"}
            >
                <Callout onPress={this.handlePress}>
                    <View style={{ flexDirection: 'row'}}>
                        <View>
                            <Image
                                source={{ uri: 'https://images.pexels.com/photos/2662123/pexels-photo-2662123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                                style={styles.image}
                            />
                            <Image
                                source={{ uri: verified_icon }}
                                style={{ width: 20, height: 20, borderRadius: 10, position: 'absolute', bottom: -5, right: -5 }}
                            />
                        </View>
                        <Text style={{ paddingLeft: 10, paddingTop: 10}}>DanyChamp</Text>
                    </View>
                    
                    <Text style={{ paddingTop: 10 }}>{this.props.activity.description}</Text>
                    <CalloutSubview>
                        <TouchableHighlight>
                            <Button title={'rightIn'} onPress={this.handlePress} ></Button>
                        </TouchableHighlight>
                    </CalloutSubview>
                </Callout>

                {/* <View style={styles.marker}>
                    <Text>{this.props.activity.name}</Text>
                </View> */}
            </Marker>

        );
    }


}

const styles = StyleSheet.create({

    marker: {
        backgroundColor: "pink",
        //padding: 5,
        borderRadius: 5
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderWidth: 2,
        borderColor: "gray"
    }
})

export default ActivityMarker;